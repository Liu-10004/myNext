import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { computed, observable, toJS, reaction, observe } from 'mobx';
import Router from 'next/router';
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
  @observable id = '';
  @observable data = [];
  @observable articleContent = '';
  @observable userAgent = 'pc';
  static getInitialProps = async ctx => {
    const { id } = ctx.query;
    const { asPath } = ctx;
    console.log('isServer', typeof window === 'undefined');
    console.log('去请求数据了');
    const data = await fetchArticleById(id);
    console.log('请求结束了');
    console.log('isServer', typeof window === 'undefined');
    return { data };
  };
  constructor() {
    super();
    this.nodeRef = React.createRef();
  }
  async componentDidMount() {
    try {
      console.log('didmount');
      const { data, userAgent } = this.props;
      this.data = data;
      this.userAgent = userAgent;
      await this.highlight();
    } catch (e) {
      console.log(e.message);
    }
  }

  highlight = () => {
    if (this.nodeRef) {
      const nodes = this.nodeRef.current.querySelectorAll('pre');
      nodes.forEach(node => {
        hljs.highlightBlock(node);
      });
    }
  };

  @computed
  get content() {
    return (
      <div>
        {toJS(this.data)?.map((item, index) => {
          this.articleContent = item.content;
          return (
            <div key={index}>
              <div style={{ position: 'fixed', right: 30, top: 100 }}>
                {this.userAgent == 'pc' ? (
                  <Anchor>
                    <div className="markNav-title">文章目录</div>
                    <MarkNav
                      className="article-menu"
                      source={this.articleContent}
                      headingTopOffset={80}
                    />
                  </Anchor>
                ) : (
                  ''
                )}
              </div>
              <h1>{item.title}</h1>
              <Markdown source={item.content} escapeHTML={true} />
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    const marginRight = this.userAgent == 'pc' ? 270 : 0;
    return (
      <Layout selectedKey="articleList">
        {/* <MyHead /> */}
        <div
          style={{
            padding: 30,
            maxWidth: 800,
            backgroundColor: '#fff',
            marginRight: marginRight
          }}
          ref={this.nodeRef}>
          {this.content}
        </div>
      </Layout>
    );
  }
}

export default Home1;
