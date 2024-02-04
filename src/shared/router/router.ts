type RouteId = 'home' | 'food';

type Route = {
  active: boolean;
  id: RouteId;
  path: string;
};

export type RouteMap = {
  [key in RouteId]: Route;
};

export class Router {
  constructor(private readonly routes: RouteMap) {}

  getCurrentRouteId() {
    return this.routes.home.id;
  }
}
