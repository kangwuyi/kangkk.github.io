
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

md-->html--> 特定规则的html

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


[DocumentFragment.querySelectorAll()](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment/querySelectorAll)

content.appendChild(highlight);
var oFragmengChildren = oFragmeng.children;
console.log(oFragmengChildren)
console.log(typeof oFragmengChildren)
console.log(i)
console.log(oFragmengChildren['section-'+i].children)
console.log(oFragmengChildren['section-'+i].firstElementChild.children )
console.log(oFragmengChildren['section-'+i].querySelectorAll('div.pilwrap') )
