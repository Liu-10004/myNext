import React, { Component } from 'react';
import Head from 'next/head';

const MyHead = props => {
  console.log(props);
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
      />
      <meta name="renderer" content="webkit" />
      <meta httpEquiv="description" content="天天向上" />
      {/* <meta name="Keywords" content={ROUTER.KEYWORDS}/>
  <meta name="Description" content={ROUTER.Description}/> */}
      <meta name="author" content="lll" />
      {/* <link rel='stylesheet' href='/static/css/iconfont/iconfont.css'/> */}
      {/* <link rel="stylesheet" type="text/css" href="/src/styles/nprogress.css" /> */}
      <title>{props.title}</title>
      <link rel="icon" href="/favicon.ico" />
      {/* <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
    <script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
  <title>{ROUTER.INDEX_TITLE} &raquo; {ROUTER.COMMON_TITLE}</title> */}
    </Head>
  );
};

export default MyHead;
