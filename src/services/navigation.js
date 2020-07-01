import Router from 'next/router';
import Route from 'route-parser';
import { observable } from 'mobx';
import { URL } from 'next/router';

class WebNavigationStore {
  router;
  @observable inPathParameterRoutes = [];
  constructor(router, pathParamRoutesInPro = []) {
    this.router = router;
    this.inPathParameterRoutes = pathParamRoutesInPro.map(routes => ({
      route: new Route(routes.key),
      page: routes.page
    }));
  }

  push = (path, params, options) => {
    if (path) {
      const href = {
        pathname: path,
        query: params
      };
      this.router.push(href, href, options || {});
    } else {
      console.log('path ==', path, 'params ==', params);
    }
    //Router.push(...this.nextRouterFromPathAndParams(path, params));
  };

  reset = (path, params, options) => {
    const href = this.nextRouterFromPathAndParams(path, params);
    this.router.replace(href, href, options || {});
  };

  goBack = () => this.router.back();

  getCurrentRoute = () => ({
    path: this.router.pathname,
    params: this.router.query
  });

  nextRouterFromPathAndParams(path, params) {
    let asPath = path;
    for (const rte of this.inPathParameterRoutes) {
      let pathParams = rte.route.match(path);
      if (pathParams) {
        params = {
          ...params,
          ...pathParams
        };
        path = rte.page;
      }
    }
    return {
      pathname: path,
      query: params
    };
  }

  windowLocation = url => {
    if (process.browser) {
      if (window.top != window.self) {
        window.top.location = url;
      } else {
        window.location = url;
      }
    } else {
      console.log('process.browser is false');
    }
  };
}

let navigation = new WebNavigationStore(Router);

export default navigation;
