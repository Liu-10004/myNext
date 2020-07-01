import App, { Container } from 'next/app';
import React from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer'
import 'babel-polyfill';

import Router from 'next/router';
import NProgress from 'nprogress';
import 'antd/dist/antd.less';
import '../src/styles/markdown.less';
import '../src/styles/base.less';
import '../src/styles/nprogress.less';

export default class MyApp extends App {
  constructor() {
    super();
    this.state = {
      userAgent: {
        userAgent: 'pc'
      }
    };
  }

  componentDidMount() {
    const ua = navigator.userAgent;
    let userAgent;
    if (
      ua.indexOf('Android') > 0 ||
      ua.indexOf('iPhone') > 0 ||
      ua.indexOf('iPad') > 0
    ) {
      //绉诲姩绔�
      userAgent = 'mobile';
    } else {
      userAgent = 'pc';
    }

    this.setState({
      userAgent: {
        userAgent
      }
    });
  }

  render() {
    Router.onRouteChangeStart = url => {
      NProgress.start();
    };
    Router.onRouteChangeComplete = () => NProgress.done();
    Router.onRouteChangeError = () => NProgress.done();
    const {
      Component,
      pageProps,
      router: { pathname }
    } = this.props;
    const { userAgent } = this.state;
    let myPageProps = { ...pageProps, ...userAgent };
    return (
      <Container>
        <div className="container">
          <Component {...myPageProps} />
        </div>

        <style jsx global>{`
          .fl {
            float: left;
          }
          .fr {
            float: right;
          }
          .clearfix:after {
            content: '';
            clear: both;
            display: block;
          }
          ul {
            margin: 0;
            padding: 0;
          }
          li {
            list-style: none;
          }
          #__next,
          .container {
            height: 100%;
          }
          .container {
            display: flex;
            flex-direction: column;
            background-color: #f0f2f5;
          }
          .container > div:nth-child(2) {
            flex-grow: 1;
          }
        `}</style>
      </Container>
    );
  }
}
