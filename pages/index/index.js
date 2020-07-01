import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { computed, observable } from 'mobx';
import { Layout, message, Button, Spin } from 'antd';
import './index.less';
import { numFormat } from '../../src/utils/numFormat';
import Login from '../../src/pages/Login';
import systemConfig from '../../config/SystemConfig';
import { GetComponent } from '../../src/index.js';
import navigation from '../../src/services/navigation';
import Router from 'next/router';
import { checkLogin, login, singout } from '../../src/services/user';

const { Header, Footer, Sider, Content } = Layout;
@observer
class HomePage extends Component {
  @observable timer;
  @observable words = '';
  @observable loading = false;
  static getStaticProps() {}
  componentDidMount() {
    console.log(window);
    this.checkIfLogin();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  checkIfLogin = () => {
    this.loading = true;
    checkLogin().then(({ login }) => {
      if (login) {
        message.success('已经登录');
      }
    });
    this.loading = false;
  };

  onClick = async () => {
    try {
      this.loading = true;
      let resData = await login(
        JSON.stringify({ name: '刘冰群', password: '111111' })
      );
      navigation.push('/home/articleList');
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  };

  @computed
  get module() {
    const { moduleId } = this.props.url.query;
    try {
      return this.systemConfig.getModule(moduleId);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  @computed
  get curPage() {
    let page;
    if (this.props.url.query.pageId) {
      page = this.systemConfig.getPage(this.props.url.query.pageId);
    }
    if (page) {
      return page;
    }
    // return (<div>not found<div>)
    // else {
    //   return this.getFirstPageByModuleId(this.module.id);
    // }
  }

  @computed
  get pageLink() {
    try {
      console.log('page link', this.curPage?.pageClass);
      // return this.curPage?.pageClass || '';
      return 'ArticleList';
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  @computed
  get content() {
    console.log('open page', this.pageLink);
    if (this.pageLink) {
      const Page = GetComponent(this.pageLink);
      return Page ? <Page /> : <div>无法找到指定的页面</div>;
    } else {
      return <div>无法找到指定的页面</div>;
    }
  }

  render() {
    return (
      <div>
        <header className="back_ground">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%'
            }}>
            <img src="../../static/1.jpg" className="img"></img>
          </div>
        </header>
        <Spin spinning={this.loading}>
          <Content
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
            <Button className="span" type="primary" onClick={this.onClick}>
              {this.words || '要报税'}
            </Button>
          </Content>
        </Spin>
        {/* {this.content} */}
        <Footer className="footer"></Footer>
      </div>
    );
  }
}

export default HomePage;
