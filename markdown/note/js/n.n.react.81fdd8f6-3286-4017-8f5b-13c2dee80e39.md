# React

## router


### createRoutes

```js
/**
 * Creates and returns an array of routes from the given object which
 * may be a JSX route, a plain object route, or an array of either.
 */
function createRoutes(routes) {
  if (isReactChildren(routes)) {
    routes = createRoutesFromReactChildren(routes);
  } else if (routes && !Array.isArray(routes)) {
    routes = [routes];
  }

  return routes;
}
```

### React-createClass和Component区别

在`React.createClass`中。
```js
let app = React.createClass({
  getInitialState: function(){
      // some thing
  }
})
```
在`React.Component`中。
```js
class TodoApp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }  
}
// or
Class App extends React.Component {
  constructor(props) {
      super(props);
  }
  state = {}    
    //todo
}
```

## error

```
Uncaught Error: Invariant Violation: Element type is invalid: expected a string (for built-in components) or a class/function but got: object
```

遇到这种问题可能原因一：没有使用默认`default`。
```js
var About = require('./components/Home').default
```
可能原因二。
```js
import {MyComponent} from '../components/xyz.js';
// 替换为
import MyComponent from '../components/xyz.js';
```

> Googler from the future here, thanks this was my issue! It makes sense in retrospect as the first is destructuring the export, but if you used default, then it's just trying to destructure a function/class.


React组建内部还具有自己的状态，这些状态只能在组件内修改。React组件本身很简单，你可以把他们堪称是一个函数，它接受props和state作为参数，返回一个虚拟的Dom表现。
## 路由


代码分割,惰性加载
只有一小部分 webpack 用户知 App 代码可以分割成多个 JavaScript 块.

require.ensure([], () => {  
  const Profile = require('./Profile.js')
  this.setState({
    currentComponent: Profile
  })
})
这对于大型应用十分有用,每次部署之后用户浏览器不用下载那些很少会使用到的代码,比如Profile页面. 更多代码块将导致更多 HTTP 请求 - 但是使用 HTTP/2 多路复用就没有问题.
结合 chunk hashing,可以在代码更新之后优化缓存命中率.
https://christianalfoni.github.io/react-webpack-cookbook/Optimizing-caching.html
下个版本的 react-router 将会对代码分隔做更多支持.
对于 react-router 的未来规划,可以去查看博客 Ryan Florence: Welcome to Future of Web Application Delivery.
https://medium.com/@ryanflorence/welcome-to-future-of-web-application-delivery-9750b7564d9f#.vuf3e1nqi

## 组件
https://medium.com/javascript-scene/jsx-looks-like-an-abomination-1c1ec351a918#.ca28nvee6
https://facebook.github.io/react/docs/jsx-in-depth.html

## 高阶函数
http://jamesknelson.com/structuring-react-applications-higher-order-components/

## 属性类型
https://www.npmjs.com/package/react-immutable-proptypes
如果你仍然没有检查 熟悉类型,那么你应该从2016年开始做起,这将为你节省大量的时间,相信我.

MyComponent.propTypes = {  
  isLoading: PropTypes.bool.isRequired,
  items: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      name: PropTypes.string.isRequired,
    })
  ).isRequired
}
当然,也可以使用 react-immutable-proptypes 验证 Immutable.js 所编写的属性.
## 高阶组件
什么是高阶组件？
PassData({ foo: 'bar' })(MyComponent)
简单来讲,从由原始组件创造一个新的组件并且扩展它的行为.你可以在多种场景来使用它,比如鉴权：requireAuth({ role: 'admin' })(MyComponent)(检查用户权限,如果未登录就跳转),或者将组件与 Flux/Redux 的 store 连通.
在 RisingStack,我们也喜欢将数据拉取和控制类的逻辑分离到高阶组件中,以尽可能地保持 view 层的简单.

测试
保证测试的高代码覆盖率是开发周期中的重要一环.幸运的是,React.js 社区有很多这样的库来帮助我们.
https://github.com/producthunt/chai-enzyme
https://github.com/airbnb/enzyme
AirBnb 的 enzyme 是我们最喜爱的组件测试库之一.使用它的浅渲染特性可以对组件的逻辑和渲染结果进行测试,非常神奇.它现在还不能替代selenium测试,但是将前端测试提升到了一个新高度.是

这本身不是一个 React 相关的问题,但是大多数人都在打包他们的 React 应用,所以我有必要在这里提一下.
当你打包源代码的时候,要时刻警惕打包后文件的大小.想要将其控制在最小体积,你需要思考如何如何 require/import 依赖.
查看下面的代码片段,这两种方式可以对输出大小会产生重大影响：

import { concat, sortBy, map, sample } from 'lodash'

// vs.
import concat from 'lodash/concat';  
import sortBy from 'lodash/sortBy';  
import map from 'lodash/map';  
import sample from 'lodash/sample';  
查看Reduce Your bundle.js File Size By Doing This One Thing,以获取更多信息.
我们也喜欢将代码分离到至少 vendors.js 和 app.js 两个文件,因为 vendors 相对于我们的代码库来说更新频率低很多.
对输出文件进行 hash 命名(WebPack中的chunk hash),并使用长缓存,我们可以显著地减少访问用户需要下载的代码.结合代码懒加载,优化效果非常显著.
如果你还不太熟悉 Webpack,可以查看这本优秀的 React webpack cookbook.
https://lacke.mn/reduce-your-bundle-js-file-size/
http://survivejs.com/webpack/introduction/


组件级别的 hot reload

如果你曾使用过hot reload编写单页面应用,当你在处理某些与状态相关的事情时,可能你就会明白当你在编辑器中点击保存,整个页面就重新加载了是多么令人讨厌.你需要逐步点击操作到刚才的环节,然后在这样的重复中奔溃.
通过 React,在重载组件的同时保持组件状态已经成为可能,从此不再痛苦!
关于如何搭建hot reload,可参考 react-transform-boilerplate.https://github.com/gaearon/react-transform-boilerplate


代码检查
https://www.npmjs.com/package/eslint-plugin-react
或许你已经给你的 JavaScript 代码制定了代码规范,但是你知道也有用于 React 的代码规范了吗？我们建议你选择一个代码规范,然后照着它说的来做.
在 RisingStack,我们也将 linters 强制运行在 CI 系统上,git push 亦然.可以试试 pre-push 或者 pre-commit.
我们使用标准的 JavaScript 代码风格,并使用 eslint-plugin-react 来检查React.js代码.
(是的,我们已经不再使用分号了)

## GraphQL 和 Relay

相对而言 GraphQL 和 Relay 还属于新技术,在 RisingStack,我们还没有在产品环境中使用它们,但保持关注.
我们写过一个 Relay 的 MongoDB ORM 库,叫做 graffiti,可以使用你已有的 mongoose models 来创建 GraphQL server.
如果你想要学习这些新技术,我们建议你可以找来玩一玩.


#### 渲染



你的智能组件应该是配置在 Route 中的组件，你的智能组件的 render 方法控制子组件的渲染数据：
```js
render () {
  if (this.hasData()) {
    return this.renderComponents();
  } else {
    return this.renderLoadingScreen();
  }
}
```
智能组件尽可能的做数据预处理，以使你的木偶组件尽可能减少参与运算，当你传递一个处理句柄给木偶组件时，带上它需要的 id，这样木偶组件就不需要自己获取 id 了：
```js
renderComponents () {
  return <DumbComponent
    onSelect={this.itemSelected.bind(this, this.props.item.id)}
  >;
}
```

<!--
通过使用 onEnter 和 onLeave 方法，你的路由文件同样可以作为数据的关卡。在这里你可以触发 fetch action 来获取组件需要的数据。这在你使用深层路由嵌套的时候很有用，比如，给定路由 /app/project/10/permission，你可以：

在 /app 中获取当前用户的登录信息
在 /project 中获取该用户可见的项目
在 /10 中获取项目 10 的详细信息
在 /permission 中获取该用户的权限列表
当切换到另外一个路由 /app/project/11，你仅仅需要获取更改的数据（/11 对应的数据），这时你就只需要一次对项目 11 的请求了：

```js
import Projects from "./containers/projects";
import ProjectDetailRoute from "routes/project_detail";
export default class ProjectList {
  constructor () {
    this.path = "project";
    this.projectDetailRoute = new ProjectDetailRoute();
  }
  getChildRoutes (state, cb) {
    cb(null, [this.projectDetailRoute]);
  }
  getComponents (cb) {
    cb(null, ProjectTasks);
  }
  onEnter () {
    this.fetchProjects();
  }
  fetchProjects () {
    ...
  }
}
```
-->

### 第三方异步数据

第三方异步数据通常来自于WebSocket。不管怎样当从UI层触发一个事件后，木偶组件会把事件传播到智能组件，然后触发action。获取WebSocket数据的“Smart Component”尽可能的独立于其他“Smart Component”之外，所以在路由层进行扩展。

```js
import Login from "./containers/Login";
import LoginWebSocket from "./containers/LoginWebSocket";
export default class Login {
  ...
  getComponents (cb) {
    cb(null, {view: LoginPage, webSocketData: LoginPageWebSocket});
  }
  ...
}
```
