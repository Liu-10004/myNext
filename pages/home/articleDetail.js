import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { computed, observable, toJS, reaction, observe } from 'mobx';
import Markdown from 'react-markdown';
import Layout from '../../src/components/Layout.js';
import Article from '../../src/pages/Article.js';
import MyHead from '../../src/components/MyHead';
import { fetchArticleById } from '../../src/services/article';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import { Anchor } from 'antd';
import hljs from 'highlight.js';
import '../../src/styles/article.less';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
@observer
class Home1 extends Component {
  render() {
    return (
      <Layout selectedKey="articleList">
        <div style={{ padding: 30, width: 800, backgroundColor: '#fff' }}>
          文章详情
        </div>
      </Layout>
    );
  }
}

export default Home1;
