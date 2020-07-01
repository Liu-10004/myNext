import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { computed, observable } from 'mobx';
import Router from 'next/router';
import Layout from '../../src/components/Layout.js';
import ArticleList from '../../src/pages/ArticleList.js';
import moment from 'moment';
import MyHead from '../../src/components/MyHead';
moment.locale('zh-cn');
@observer
class Home1 extends Component {
  componentDidMount() {
    const id = Router?.router?.query?.id;
    console.log(this.props);
  }
  render() {
    return (
      <Layout selectedKey="articleList">
        <MyHead title="列表页面" />
        <ArticleList />
      </Layout>
    );
  }
}

export default Home1;
