# 	BEG

CSS的注释要写WHY,而不是写WHAT

Block
!误区:这个block并非inline-block里的block,
而是将所有东西都划分为一个独立的模块,一个header是block,header里嵌套的搜索框是block,甚至一个icon一个logo也是block
block可以相互嵌套

Element
!误区:如果一个Element-son是另一个Element-father的子元素,
那么写法是 Block__Element-father__Element-son_Modifer,嵌套多了会很长么?
不是的!!!
一个Block下的所有Element无论相互层级如何,都要摊开扁平的属于Block
所以 BEM 最多只有 B+E+M 三级,不可能出现 B+E+E+..+E+M 超长class名,也要求E不能同名

Modifier
之前我们经常写的 .current .active 等表达状态

- [A New Front-End Methodology: BEM](https://www.smashingmagazine.com/2012/04/a-new-front-end-methodology-bem/)
- [Block, Element, Modifier](https://en.bem.info/methodology/key-concepts/)
- [BEM官网](https://en.bem.info/)
- [xjst](https://github.com/veged/xjst)
- [A BEM syntax with UX in mind](http://montagestudio.com/blog/2013/10/24/BEM-syntax-with-ux-in-mind/)
- [Yandex BEM/OOCSS](http://docs.emmet.io/filters/bem/)

约定
__双下划线代表B和E连接例如 menu__item
_单下划线代表B和M或E和M的连接 例如 menu_active 或 menu__item_active
-中划线同英语里做连字符例如 mod-menu 或 mod-menu__item 这里 B或E或M需要多个单词来描述,就

