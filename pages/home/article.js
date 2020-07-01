import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import Layout from '../../src/components/Layout.js';
import Article from '../../src/pages/Article.js';
@observer
class Home1 extends Component {
  static getInitialProps = async ctx => {
    const { id } = ctx.query;
    const { asPath } = ctx;
    let queryStringObj = {
      id,
      asPath
    };

    return { queryStringObj };
  };

  render() {
    return (
      <Layout selectedKey="addArticle">
        <div style={{ padding: 30, width: 800, backgroundColor: '#fff' }}>
          <Article />
        </div>
      </Layout>
    );
  }
}

export default Home1;
