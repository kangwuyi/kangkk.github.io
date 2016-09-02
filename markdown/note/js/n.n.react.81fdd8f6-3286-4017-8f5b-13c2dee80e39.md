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
