# DocumentFragment

今天遇到一个需求，我的online笔记本里关于源码解析的文章文本格式是这样的：

![](../../../static/img/documentFragment/4.png)

而我现在需要改成左边描述，右边源码的格式，如下图：

![](../../../static/img/documentFragment/5.png)

作为合格的前端我肯定不会去苦哈哈的重新写一篇，或者每一行每一个标签的去更改`calss`类名以求得更改样式，我的文本存储格式是md-->html--> 特定规则的html，所以最轻松的做法是在前端浏览器层做文章，所以我写了一段jquery代码：

```js
var ul = document.createElement("ul").addClass('sections');
var liList=[];
$('#container-hiddle').children().each(function(i,n){
  var obj = $(n);
  if(obj.is('pre')){
    var content = document.createElement("div").addClass('content'),
      highlight = document.createElement("div").addClass('highlight');
    content.append(highlight);
    $(liList[i-1]).find('.annotation').append(content);
  }else {
    var li = document.createElement("li").attr('id','section-'+(i+1)),
      annotation = document.createElement("div").addClass('annotation');
    if(obj.is('h1')){
      var li = document.createElement("li").attr('id','section-'+(i+1)),
        annotation = document.createElement("div").addClass('annotation');
      annotation.append(obj);
    }else{
      var pilwrap = document.createElement("div").addClass('pilwrap'),
      pilcrow = document.createElement("a").addClass('annotation').attr('href','#section-'+(i+1)).attr('text','¶');
      pilwrap.append(pilcrow);
      annotation.append(pilwrap);
      annotation.append(obj);
    }
    li.append(annotation);
    liList.push(li);
  }
  ul.append(liList.join(''))
  $('#container-show').append(ul)
});
```

这是第二版，第一版纯jquery已经被pass，第二版jquery+原生js，一次遍历几百个dom元素并插入，效果依然die，浏览器依然直接崩溃：

![](../../../static/img/documentFragment/1.png)

工具栏里甚至直接显示空白，所以只能再改第三本，纯原生js：

```js
if(container_children[i].nodeName==='PRE'){
  var content = document.createElement("div"),
    highlight = document.createElement("div");
  highlight.appendChild(childClone);
  content.appendChild(highlight);
  var oFragmengChildren = oFragmeng.children;
  console.log(oFragmengChildren)
  console.log(typeof oFragmengChildren)
  console.log(oFragmengChildren[i])
  var oFragmengChildrenClone = oFragmeng.children[i-prenum].item(0);
  oFragmengChildrenClone.appendChild(content);
  oFragmeng.children[i-prenum]=oFragmengChildrenClone;
  prenum=prenum+1;
}
```

![](../../../static/img/documentFragment/2.png)

```js
content.appendChild(highlight);
var oFragmengChildren = oFragmeng.children;
console.log(oFragmengChildren)
console.log(typeof oFragmengChildren)
console.log(i)
console.log(oFragmengChildren['section-'+i].children)
console.log(oFragmengChildren['section-'+i].firstElementChild.children )
console.log(oFragmengChildren['section-'+i].querySelectorAll('div.pilwrap') )
```


借助一些如[DocumentFragment.querySelectorAll()](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment/querySelectorAll)的方法，测试还是可以行的通的，所以直接按逻辑开始码代码：

```js
var presign = false;
var itmp = 0;
var oFragmeng = document.createDocumentFragment();
var container_children = document.getElementById('container-hiddle').childNodes;
for (var i = 0, length = container_children.length; i < length; i += 1) {
    var childClone = container_children[i].cloneNode(true);
    if (container_children[i].nodeName === 'H1' && container_children[i].nodeName !== '#text') {
        itmp = itmp + 1
        var li = document.createElement("li");
        li.setAttribute('id', 'section-' + itmp);
        var annotation = document.createElement("div");
        annotation.setAttribute('class', 'annotation');
        annotation.appendChild(childClone);
        li.appendChild(annotation);
        oFragmeng.appendChild(li);
    } else if (container_children[i].nodeName !== '#text') {
        itmp = itmp + 1
        var li = document.createElement("li");
        var annotation = document.createElement("div");
        var pilwrap = document.createElement("div");
        var pilcrow = document.createElement("a");
        li.setAttribute('id', 'section-' + itmp);
        annotation.setAttribute('class', 'annotation');
        pilwrap.setAttribute('class', 'pilwrap');
        pilcrow.setAttribute('class', 'pilcrow');
        pilcrow.href = '#section-' + itmp;
        pilcrow.text = '¶'
        pilwrap.appendChild(pilcrow);
        annotation.appendChild(pilwrap);
        if (container_children[i].nodeName === 'PRE') {
            var content = document.createElement("div");
            var highlight = document.createElement("div");
            content.setAttribute('class', 'content');
            highlight.setAttribute('class', 'highlight');
            content.appendChild(highlight);
            highlight.appendChild(childClone);
            li.appendChild(annotation);
            li.appendChild(content);
            oFragmeng.appendChild(li);
            presign = true;
        } else {
            if (presign) {
                itmp = itmp - 1;
                oFragmeng.children['section-' + itmp].firstElementChild.appendChild(childClone);
                presign = false;
            } else {
                annotation.appendChild(childClone);
                li.appendChild(annotation);
                oFragmeng.appendChild(li);
            }
        }
    }
}
document.getElementById('ul-show').appendChild(oFragmeng);
oFragmeng = null;
```

至此，一次成功渲染，再添加`console.time()`、`console.timeEnd()`方法测试一下时间：

```js
console.time('test documentFragment');
  // todo
console.timeEnd('test documentFragment');
```

得出结果`20.035ms`：

![](../../../static/img/documentFragment/3.png)

原生js与jquery相比，某些场景优势依然很大。
