import { Route } from './route/route.js';
export * from './sw/register-sw.js';

const route = new Route();
route.initRoute();
