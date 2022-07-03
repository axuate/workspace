# Axuate Router

The `Router` class provides a simple way to choose a given value based on a resource path. It supports basic path variables and uses a graph to easily handle hugh sets of routes.

## Installation

```shell
npm install @axuate/router --save-dev
```

```shell
yarn add @axuate/router
```

## Getting started

The setup is super easy. Just define an array of all available routes and call the `route` method to get either a `RouteMatch` or undefined if no matching route has been registered.

```typescript
import { Router } from '@axuate/router';

const router = new Router([
  { path: '/users', value: 'a' },
  { path: '/users/{id}', value: 'b' },
  { path: '/users/{id}/roles', value: 'c' }
]);

const match = router.route('/users/5642/roles'); // => c
```
