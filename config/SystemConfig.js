export default class SystemConfig {
  config = {};
  modules = {};
  pages = {};

  constructor(config) {
    this.config = config;
    this.parse();
  }
  parse() {
    const { config } = this;
    config.moduleList.forEach(mod => {
      this.modules[mod.id] = mod;
    });
    config.pageList.forEach(page => {
      this.pages[page.id] = page;
    });
  }
  getModule(id) {
    const m = this.modules[id];
    if (!m) {
      throw 'cannot find specified module id';
    }
    return m;
  }
  getPage(id) {
    const page = this.pages[id];
    if (!page) {
      throw 'cannot find specified page id';
    }
    return page;
  }
  getPagesByModuleId(moduleId) {
    return this.config.pageList.filter(page => page.moduleId === moduleId);
  }
  getFirstPageByModuleId(moduleId) {
    const pages = this.getPagesByModuleId(moduleId)
      .filter(page => page.isMenuItem)
      .sort((a, b) => a.order - b.order);
    if (pages.length > 0) {
      return pages[0];
    } else {
      return null;
    }
  }
}
