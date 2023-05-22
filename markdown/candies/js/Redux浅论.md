<!-- kk-show true kk-show stop -->
# redux

<!-- toc -->

![ReduxLogo][logo_1.png]

> Redux is a predictable state container for JavaScript apps[^^redux_website_title_desc].

## Redux特性

在过去的十几年里[web page][Web_page]一直都以指数递增的方式发展，无论是概念上还是编程上想要彻底读懂这门设计的艺术已经变得不可为，如今在许多大型网站中的一个页面从`DOM`与`Event`的微观角度往往聚集着一系列复杂并琐碎的行为功能[^^behavioral_functionality_desc]，它们聚合在一起构成了我们今天可以在浏览器端可操作的视图，正是如此，怎样管理这些行为功能被提上日程，诸多才华横溢的工程师们引申出状态管理的概念，制作出许多优秀的作品，如[Redux][redux]、[flux][flux]、[flummox][flummox]、[mobxjs][mobxjs]、[refluxjs][refluxjs]、[martyjs][martyjs]、[javascript-state-machine][javascript-state-machine]、[vuex][vuex]等，其中又以`redux`和`flux`最为流行。

![svg][action-store-view.png]

Redux诞生的出发点是作为一个javascript应用状态（state）容器，借鉴flux的数据单向流动、[elm][elm]的[The Elm Architecture][architecture]、[函数式编程][functional-javascript-workshop]、[柯里化（Currying）][Currying]函数、[组合模式（Composite pattern）][Composite_pattern]的等思想。将视图（view）中可操作的这些行为类比为动作（action），每个动作传递都附带状态（state）信息，状态引导动作对redux状态容器[store][Store]更新进而对视图更新，store对状态（state）进行同一管理，可以说store可预测状态容器是redux的骨架也不为过。

### Redux原则

无论什么框架都会设定一些属于它的规则，规则恒定，附者云起进而形成生态，react如是redux也是如此，在redux中所以规定了三条原则（[Three Principles][ThreePrinciples]），即“Single source of truth”、“State is read-only”和“Changes are made with pure functions”，用于描述在redux整个生命周期内怎样去管理和维护store树。

* Single source of truth：唯一数据源。State被存储在一颗唯一的`object tree`上，即store对象树。
* State is read-only：State只读。在每个组件（Component）或者reducer等内部，State树内所有`key->value`只读。
* Changes are made with pure functions：这里的纯函数（pure functions）特指reducer函数。State树内的state只能依靠纯函数reducer对store进行更新。

### 单向数据流

姑且先讲reducer函数怎样更新store放下，先讨论store变更为什么会引起state变化。这里就要引申到单向数据流（Unidirectional data flow）的理论，单向数据流动即从模型到视图的数据流动，它区别于`双向数据绑定`的方式，用react中的术语解释的话就是，当某个组件的数据`prop`需要变化并且通过相关方法操作更新store对象树内某个碎片state之后，redux会返回一个新的store会从父节点传递到子节点，依次向下遍历整棵组件树，以组件为单位寻找使用了变化的`prop`的组件进行渲染。

假定一个react渲染的页面，黄色部分代表页面`DOM`结构树，蓝色是各个组件，组件之间的包含关系为`A ⊇ {B, C} && C ⊇ D`，其中`B`和`C`子组件都引用了store树上的`props.test`属性，这是一个非常典型的从上到下单向流动的阶梯式模型。

![svg][redux-stroe-up-down.png]

现在发生变化，当在`B`组件内某个操作（UI交互、API调用等）更新了state值（即`props.test`属性值），这个操作本身并不会对`B`组件的视图和渲染进行干扰和操作，但是`B`组件和`D`组件会在store树内的相应state值变化后触发组件使view发生改变。如果是在传统页面中，这是事件和DOM结构之间的一对一，在数据双向绑定概念中是事件与DOM结构的多对多，在react开发中应该是事件与VDOM一对一，但是在redux接管数据源后就变成了事件与VDOM之间没有直接关系，VDOM的渲染间接由store对象树决定。

![svg][redux-stroe-up-down_2.png]

紫色线条是数据流向，紫色方框是触发渲染的子组件，数据从顶层store开始向下流淌，store顶层数据发生改变后会分别触发存在`props.test`属性的子组件进行重新渲染更新`DOM`，以达到视图渲染可控、状态重现可控的目的。

<!--
### 反向数据流
### 同步数据流
### 异步数据流
-->

## Store

Store作为状态容器、唯一数据源，由一个`createStore(reducer, preloadedState, enhancer)`函数创建，在项目部署过程中使用createStore函数一般会在项目根目录下单独列一个文件。

<pre class="pre-no-border">
.
├── bin
│   └── ...
├── ...
├── src
│   ├── components
│   │   └── ...
│   ├── containers
│   │   └── ...
│   ├── routes
│   │   └── ...
│   ├── store
│   │   ├── createStore.js
│   │   └── reducers.js
│   └── utils
│       └── ...
└── ...
</pre>

```js
import {createStore} from 'redux';
import makeRootReducer from './reducers';
...
export default (initialState = {}, history) => {
  const store         = createStore(
    makeRootReducer(),
    initialState,
  );

  return store
}
```

在__createStore.js__文件中createStore函数传入了__makeRootReducer__和__initialState__两个值，其中makeRootReducer就是通常所说的root reducer，只不过本文所示例的reducer皆为异步加载，所以可能和其它文章写的root reducer方式不一样，详细的内容下文会有叙述。阅读redux源码的[createStore][redux-createStorejs]函数可以看到最后返回四个核心对象和一个[symbol][symbol]对象，也就是说在示例中`makeRootReducer()=reducer`、`initialState=preloadedState`。

```js
import $$observable from 'symbol';
export default function createStore(reducer, preloadedState, enhancer) {
  ...
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
```

[^->createStore(reducer, preloadedState, enhancer)->currentReducer = reducer->currentState = preloadedState->function ensureCanMutateNextListeners(){}->function getState(){}->function subscribe(listener){}->function dispatch(action){}->function replaceReducer(nextReducer){}->function observable(){}->return {dispatch,subscribe,getState,replaceReducer,[$$observable]: observable}->]

| 方法 | 使用方式 | 描述 |
|--------|--------|--------|
|dispatch  		 |store.dispatch(action)           |action参数将参与store更新，并分发给subscribe函数正在监听的reducer|
|subscribe		 |store.subscribe(listener)        |listener监听者，实际上就是回调函数|
|getState      |store.getState()                 |获取state|
|replaceReducer|store.replaceReducer(nextReducer)|刷新reducer并初始化store|

### Dispatch

Dispatch方法用于更新store状态树，流程是在dispatch接受一个action，由action决定调用reducer转换状态树， 且通知监听者数据已发生变化，从dispatch源码中看到函数`currentReducer(currentState, action)`传递state、action，观察者列表`listeners`直接for循环遍历执行`listeners[i]()`。

```js
function dispatch(action) {
   ...
     currentState = currentReducer(currentState, action)
   ...

   var listeners = currentListeners = nextListeners
   for (var i = 0; i < listeners.length; i++) {
     listeners[i]()
   }

   return action
 }
 ```

在主流的redux思想里有一种说法叫“redux命令行模式”，其中dispatch比作分发器，这个形容很贴切。Dispatch方法就是接收action并将action里的信息分发给store和reducer，这里画了一个简单的图示以`dispatch(action)`方式展现dispatch函数的执行过程。

```js
const action = { type: 'ADD', payload: '***'};
dispatch(action);
```

![svg][dispatch-desc.png]

除此之外dispatch函数的执行方法两种形式，其一是`bindActionCreators(action)`方式，bindActionCreators函数在本文的后面也有说到。

```js
const action = { type: 'ADD', payload: '***'};
const bindActionCreators = require('redux').bindActionCreators;
bindActionCreators(action);
```

其二是`dispatch action creator`方式，大多数项目中应用的都是这种方式。

```js
function addTodo(text) {
  return {
    type: ADD,
    payload: text,
  }
}
store.dispatch(addTodo('***'));
```

每次执行dispatch，通过subscribe注册的listener都会被执行，当listener列表较多时`listeners[i]()`都会被执行由此产生性能损耗，从工程师的角度更难定位到哪个具体的reducer内的监听者被触发，这个时候需要一些辅助工具借助`applyMiddleware`函数扩展中间件来帮助开发者。

```js
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
const store = applyMiddleware([thunk])(createStore);
const dispatch = store.dispatch;
```

> Middleware is the suggested way to extend Redux with custom functionality[^^redux_middleware_wedsite_desc].

更全面具体一些的扩展就要说到redux中间件的概念，如果熟悉expressjs[^^redux_expressjs_middleware_list_desc]或者koajs[^^redux_koa_middleware_list_desc]，应该会对[Middleware][Middleware]很熟悉，在redux中的中间件是一个高阶函数，通俗讲更多的是对现有dispatch函数进行扩展，其逻辑倾向于AOP[^^aspect_oriented_programming_desc]，意在将散布在各处的横切代码（cross-cutting code）以及一些被重复使用的功能性组件被重复使用。

![svg][redux-middleware.png]

```js
import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import {persistState} from 'redux-devtools';
import makeRootReducer from './reducers';
import DevTools from '../containers/DevTools';

export default (initialState = {}, history) => {
  ...
  const middleware = [thunkMiddleware, routerMiddleware(history), ...debugware];
  const enhancers = [];
  ...
      enhancers.push(devToolsExtension())
  ...
  const store         = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  ...
      store.replaceReducer(reducers(store.asyncReducers))
  ...
  return store
}

```



### Subscribe

Subscribe从设计的角度来说是一个订阅者，监听事件变化。

```js
function subscribe(listener) {
  ...
  ensureCanMutateNextListeners()
  nextListeners.push(listener)

  return function unsubscribe() {
    ...
    ensureCanMutateNextListeners()
    var index = nextListeners.indexOf(listener)
    nextListeners.splice(index, 1)
  }
}
```
### GetState
getState是获取当前store的state(currentState)；
```js
function getState() {
    return currentState
  }
  ```
### ReplaceReducer
动态替换reducer函数

```js
function replaceReducer(nextReducer) {
   ...
   currentReducer = nextReducer
   dispatch({ type: ActionTypes.INIT })
 }
```
### State

State对象存储在store状态树中，state只能通过`dispatch(action)`来触发更新，更新逻辑由reducer来执行，需要注意的是当state变化时会返回全新的对象，而不是修改传入的参数。

![svg][store-state-view.png]

这里示例的逻辑由四步分组成，第一部分是定义子路由，在子路由中引入用于收集reducer的回调函数，我命名为injectReducer，当然也可以命名其它的名字，如collectReducer、pushReducer等等都可以

```js
import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const LoginPage = require('./components/Login').default;
      const reducer = require('./extend/reducer').default;
      injectReducer(store, { key: 'login_reducer', reducer });
      cb(null, LoginPage);
    }, 'login')
  }
})
```

在第一部分中store和reducer已经被传入injectReducer中，第二部分就是injectReducer函数的内部逻辑。

```js
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    router,
    ...asyncReducers
  })
};

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
};

export default makeRootReducer
```

InjectReducer函数内用replaceReducer方法将store重新计算，这里这样做的缘由是第一部分的子路由是异步加载的，并不是在服务器开始时直接加载完毕，而是随着用户在客户端不断操作页面异步更新reducer以及加载组件等信息。

```js
import {applyMiddleware, compose, createStore} from 'redux';
...
import makeRootReducer from './reducers';

export default (initialState = {}, history) => {
  ...
  const store         = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  ...
    store.replaceReducer(reducers(store.asyncReducers))
  ...
  return store
}
```

第三部分是初始化store。

```js
import CoreLayout from '../layouts/CoreLayout/components/CoreLayout';
import {Dashboard} from './module'

export const createRoutes = (store) => ({
  path      : '/',
  component : CoreLayout,
  indexRoute: Home,
  getChildRoutes(location, cb) {
    cb(null, [
      Dashboard(store)
    ])
  }
});

export default createRoutes
```

第四部分是初始化路由，按道理顺序应该是第四部分=>第三部分=>第一部分=>第二部分，但是如果考虑异步等信息的话，我个人认为按逻辑优先级应该是这样排比较好。

#### State扁平化

```bash
npm install --save normalizr
```

Store树对象或者组件自身state树对象实质上是[JSON][JSON]对象，所以在redux开发过程中，为避免不同数据之间相互引用或返回相互嵌套的值，可以使用[normalizr][normalizr]对state扁平化、范式化处理。

##### 可变对象
可变对象可以用`Object.assign`或者lodash的`cloneDeep`函数。

```js
const assign = Object.assign || require('object.assign');
assign({}, state, {
    ADD: action.newState
  })
```
##### 不可变对象

[不可变对象（immutable state）][Immutable_object]是指在创建后不可再被修改的对象，它可以通过引用级的比对检查来提升渲染性能，在redux开发中一般会使用[immutablejs][immutable-js]实现不可变对象，需要注意的是immutablejs每次操作之后总是返回一个新的数据，原有的数据不会改变。

immutablejs通过结构共享来解决的数据拷贝时的性能问题，即当数据对象`key->value`键值对被改变时，immutablejs会只`clone`数据对象被改变对象节点的父节点以上的部分，其他保持不变，由此达到旧对象与immutablejs返回的新对象共享部分数据并提高性能。

![svg][immutablejs-node-expample.png]
测试：
* [deep-freeze-node][deep-freeze-node]

#### Reselect

Selector扩展组件，由于[reselect][reselect]带有缓存功能，所以使用它可以避免不必要的selector计算

## Action

Action同样是一个javascript对象，通常包含`type`等一些字段。

### Action Creator
“Action Creator”是action的创造者，本质上就是一个函数，返回值是一个action，“Action Creator”可以是同步也可以是异步。
#### 同步Action Creator

```js
function add() {
    return { tyle: 'ADD' }
}
dispatch(add());
```

#### 异步Action Creator
redux-thunks 和 redux-promise 分别是使用异步回调和 Promise 来解决异步 action 问题的。

如果直接用[Fetch API][Fetch_API]，可能一些浏览器并不支持，所以还是需要添加垫片[isomorphic-fetch][isomorphic-fetch]


```js
function fetchDataAsync() {
    return function (dispatch) {
      fetch('/posttest', {
        method : 'POST',
        headers: {
          'Content-Type': "application/json",
          'Accept'      : "application/json"
        },
        body   : JSON.stringify({item: 'text'})
      }).then(res => {
        if (res.ok) {
          dispatch({type: LOGIN_REQUEST, loginRequest: true});
          ...
        }
      }, e => {
        ...
      });
    }
}
```

### bindActionCreators

`bindActionCreators()`可以自动把多个action创建函数绑定到`dispatch()`方法上。

借鉴store对reducer的封装（减少传入 state 参数）。可以对dispatch进行再一层封装，将多参数转化为单参数的形式，经 bindActionCreators包装过后的“Action Creator”形成了具有改变全局state数据的多个函数，将这些函数分发到各个地方，即能通过调用这些函数来改变全局的state。

```js
var actionCreators = bindActionCreators ( actionCreators , store.dispatch ) ;
```

## Reducer

Reducer是一个javaScript函数，命名上也与[Array.prototype.reduce()][Array_prototype_reduce]相像，函数签名为`(previousState, action) => newState`，接受previousState和action两个参数，根据`action.type`中携带的信息对previousState做出相应的处理，并返回一个新的state。另外在redux中一个action可以触发多个reducer，一个reducer中也可以包含多种“action.type”的处理，所以二者关系为多对多。。

```js
import {SET_AUTH} from './actionType';
const assign = Object.assign || require('object.assign');

const initialState = {
  loggedIn    : require('./action').default()(),
};

const ACTION_HANDLERS = {
  [SET_AUTH]     : (state, action) => assign({}, state, {
    loggedIn: action.newState
  })
};

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
```

### combineReducers

`combineReducers()`将调用一系列 reducer，并根据对应的 key 来筛选出 state 中的一部分数据给相应的 reducer，这样也意味着每一个小的 reducer 将只能处理 state 的一部分数据，如：filterReducer 将只能处理及返回 state.filter 的数据，如果需要使用到其他 state 数据，那还是需要为这类 reducer 传入整个 state。

```js
import { combineReducers } from 'redux'
...
  combineReducers({
    router,
    ...asyncReducers
  })
...
```

## React-redux

React通过Context属性，可以将属性props直接给子component，无须通过props层层传递, Provider获得store然后将其传递给子元素。

```js
export default class Provider extends Component {
  getChildContext() {
    return { store: this.store }
  }
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  componentWillReceiveProps(nextProps) {
    const { store } = this
    const { store: nextStore } = nextProps

    if (store !== nextStore) {
      warnAboutReceivingStore()
    }
  }
  render() {
    let { children } = this.props
    return Children.only(children)
  }
}
Provider.childContextTypes = {
   store: storeShape.isRequired
}
```

Provider中的store可以在子组件中用contextTypes获取。

```js
childrenComponent.contextTypes = {
    store: storeShape
}
```

需要注意的是由于react-redux，我们一般对绑定的组件称为`Smart and Dumb Components`。

||Location	|Use React-Redux|	To read data, they|	To change data, they|
|:----|:----|:----|:----|:----|
|“Smart” Components|	Top level, route handlers	|Yes	|Subscribe to Redux state	|Dispatch Redux actions|
|“Dumb” Components|	Middle and leaf components|	No|	Read data from props|Invoke callbacks from props|

### Provider

Provider将store放到context中，connect就可以获取store，使用store的方法，比如dispatch。其实没有被connect的组件通过声明contextTypes属性也是可以获取store，使用store的方法的，但是这个时候，如果使用dispatch修改了store的state，React-Redux并不能把修改后的state作为props给React组件，可能会导致UI和数据不同步，所以这个时候一定要清楚自己在做什么。

```js
import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
class AppContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };
  render () {
    const { history, routes, store } = this.props;
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} />
        </div>
      </Provider>
    )
  }
}
export default AppContainer
```

### Connect

```bash
npm i --save react-redux
```

Connect是由[react-redux][react-redux]提供的一个高阶函数。源码中connect函数接收`mapStateToProps、mapDispatchToProps、mergeProps、options`四个参数返回一个用于生产Component的函数wrapWithConnect，然后再将组件Component作为参数注入`wrapWithConnect(WrappedComponent)`函数。

| 参数    | 描述 |
| :------------- | :------------- |
|mapStateToProps    |将state作为返回结果绑定到组件的props对象上|
|mapDispatchToProps | |
|mergeProps         | |
|options            |&nbsp;|

```js
export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
  ...
  return function wrapWithConnect(WrappedComponent) {
    ...
  }
}
```
[^->connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {})->wrapWithConnect(WrappedComponent)->class Connect extends Component{}->Connect.contextTypes = {store: storeShape};Connect.propTypes = {store: storeShape}->return hoistStatics(Connect, WrappedComponent)->]

值得一说的是hoistStatics函数源于`hoist-non-react-statics`第三方，作用是将原来组件中的元素拷贝到目标组件。在使用connect函数的时候直接在已声明的component后面引用connect。

```js
import React, {Component} from 'react';
...
import {connect} from 'react-redux';

class Login extends Component {
  ...
  render() {
    ...
  }
}
...
export default connect(mapStateToProps, mapDispatchToProps)(Login)
```

Connect不只为react组件提供store中的state数据及扩展dispatch方法，它还为定义的组件添加了一系列事件操作，这些事件的核心点就是store，然后可以在自己定义的组件内获得store。

```js
constructor(){
  //获取store
  this.store = props.store || context.store
  const storeState = this.store.getState()
  //把store的state作为组件的state，后面通过更新state更新组件
  this.state = { storeState }
  //清除组件的状态，内部是一系列的标示还原
  this.clearCache()
}
```

## 附录

| Github源码 | 描述 |
| :------------- | :------------- |
| [ducks-modular-redux][ducks-modular-redux] |{ctionTypes, actions, reducer}规则解决方案|
|[react-slingshot][react-slingshot]||
|[saga-login-flow][saga-login-flow]||
|[login-flow][login-flow]||
|[redux-saga][redux-saga]||
|[redux-auth-wrapper][redux-auth-wrapper]||
|[dva][dva]||
|[react-redux-tutorial][react-redux-tutorial]||
|[reduxjs doc][cn-reduxjs-org]|reduxjs中文档案|
|[alloyteam:react-redux][alloyteam-react-redux]|React 数据流管理架构之 Redux 介绍|



[^^redux_website_title_desc]:[redux.js文档](http://redux.js.org/)，源自`redux.js`文档中首页的一段话，对`redux`特性的官方描述。
[^^behavioral_functionality_desc]:行为功能是对目的功能和有用行为的一种抽象。这里特指在"web&nbsp;page"中对视图的按钮等`DOM`元素点击、页面路由切换等功能的操作行为，在redux中被称为[action](http://redux.js.org/docs/basics/Actions.html)。
[^^redux_middleware_wedsite_desc]:[applyMiddleware(...middlewares)](http://redux.js.org/docs/api/applyMiddleware.html):Middleware is the suggested way to extend Redux with custom functionality. Middleware lets you wrap the store's dispatch method for fun and profit. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.
[^^redux_expressjs_middleware_list_desc]:[expressjs][expressjs]，中间件的介绍为[expressjs-middleware][expressjs-middleware]，概括来说中间件`middleware`函数能够访问请求对象 `req`、响应对象 `res` 以及应用程序的请求/响应循环中的下一个中间件`middleware`函数。下一个中间件函数通常由名为`next`的变量来表示。
[^^redux_koa_middleware_list_desc]:[koajs][koajs]，中间件的介绍为[koajs-middleware][koajs-middleware]。
[^^aspect_oriented_programming_desc]:[AOP（Aspect-Oriented Programming）][AOP]，面向切面编程，通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术，被认为是[OOP][OOP]的一种延续（补充和完善`OOP`）。

[Web_page]:https://en.wikipedia.org/wiki/Web_page
[redux]:https://github.com/reactjs/redux
[flux]:https://github.com/facebook/flux
[flummox]:https://github.com/acdlite/flummox
[mobxjs]:https://github.com/mobxjs/mobx
[refluxjs]:https://github.com/reflux/refluxjs
[martyjs]:https://github.com/martyjs/marty
[javascript-state-machine]:https://github.com/jakesgordon/javascript-state-machine
[vuex]:https://github.com/vuejs/vuex
[elm]:http://elm-lang.org/
[architecture]:http://guide.elm-lang.org/architecture/
[functional-javascript-workshop]:https://github.com/timoxley/functional-javascript-workshop
[Currying]:https://en.wikipedia.org/wiki/Currying
[Composite_pattern]:https://en.wikipedia.org/wiki/Composite_pattern
[Store]:http://redux.js.org/docs/basics/Store.html
[ThreePrinciples]:http://redux.js.org/docs/introduction/ThreePrinciples.html
[symbol]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
[normalizr]:https://github.com/paularmstrong/normalizr
[JSON]:https://en.wikipedia.org/wiki/JSON
[Immutable_object]:https://en.wikipedia.org/wiki/Immutable_object
[immutable-js]:https://facebook.github.io/immutable-js/
[deep-freeze-node]:https://www.npmjs.com/package/deep-freeze-node
[reselect]:https://github.com/reactjs/reselect
[Array_prototype_reduce]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
[expressjs]:http://expressjs.com/
[koajs]:http://koajs.com/
[Middleware]:https://github.com/alsotang/node-lessons/tree/master/lesson18
[AOP]:https://en.wikipedia.org/wiki/Aspect-oriented_programming
[OOP]:https://en.wikipedia.org/wiki/Object-oriented_programming
[expressjs-middleware]:http://expressjs.com/en/4x/api.html#express.methods
[koajs-middleware]:https://github.com/koajs/koa/wiki
[react-redux]:https://github.com/reactjs/react-redux
[ducks-modular-redux]:https://github.com/erikras/ducks-modular-redux
[isomorphic-fetch]:https://www.npmjs.com/package/isomorphic-fetch
[Fetch_API]:https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[react-slingshot]:https://github.com/coryhouse/react-slingshot
[saga-login-flow]:https://github.com/sotojuan/saga-login-flow
[login-flow]:https://github.com/mxstbr/login-flow
[redux-saga]:https://github.com/yelouafi/redux-saga
[redux-auth-wrapper]:https://github.com/mjrussell/redux-auth-wrapper
[dva]:https://github.com/dvajs/dva
[react-redux-tutorial]:https://github.com/lewis617/react-redux-tutorial
[cn-reduxjs-org]:http://cn.redux.js.org/
[alloyteam-react-redux]:http://www.alloyteam.com/2015/09/react-redux/
[redux-createStorejs]:https://github.com/reactjs/redux/blob/master/src/createStore.js

[logo_1.png]:../../../static/img/redux/logo_1.png
[redux-middleware.png]:../../../static/img/redux/redux-middleware.png
[action-store-view.png]:../../../static/img/redux/action-store-view.png
[redux-stroe-up-down.png]:../../../static/img/redux/redux-stroe-up-down.png
[redux-stroe-up-down_2.png]:../../../static/img/redux/redux-stroe-up-down_2.png
[dispatch-desc.png]:../../../static/img/redux/dispatch-desc.png
[store-state-view.png]:../../../static/img/redux/store-state-view.png
[immutablejs-node-expample.png]:../../../static/img/redux/immutablejs-node-expample.png
