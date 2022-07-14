import { Given, setWorldConstructor, Then, When } from '@cucumber/cucumber';
import { Router } from '../../src/Router';
import { expect } from 'expect';
import type { RouteMatch } from '../../src/entities/RouteMatch';
import type { Route } from '../../src/entities/Route';
import type { HttpMethod } from '@axuate/http';

class World {
  public routes: Route<unknown>[] = [];
  public routeMatch: RouteMatch<unknown> | undefined;
}

setWorldConstructor(World);

Given(/^route (.*?) (.*?)$/, function (this: World, method: HttpMethod, path: string) {
  this.routes.push({
    path,
    method,
    value: path
  });
});

Given(/^no routes$/, function (this: World) {
  this.routes = [];
});

When(/routing (.*?) (.*?)$/, function (this: World, method: HttpMethod, path: string) {
  const router = new Router(this.routes);
  this.routeMatch = router.route(method, path);
});

Then(/the router throws "(.*)"/, function (this: World, errorMessage: string) {
  expect(() => {
    new Router(this.routes);
  }).toThrowError(errorMessage);
});

Then(/return (.*)/, function (this: World, returnValue: string) {
  if (returnValue === 'undefined') {
    expect(this.routeMatch).toBe(undefined);
  } else {
    expect(this.routeMatch.route.path).toBe(returnValue);
  }
});

Then(/(.*?) should be (.*)/, function (this: World, variableName: string, variableValue: string) {
  expect(this.routeMatch.params[variableName]).toBe(variableValue);
});
