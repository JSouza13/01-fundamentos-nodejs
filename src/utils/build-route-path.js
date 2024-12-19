export function buildRoutePath(route) {
  const routeParameterRegex = /\:(\w+)/g;
  const pathWithParams = route.replaceAll(routeParameterRegex, '(?<$1>[a-zA-Z0-9\-]+)');

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}