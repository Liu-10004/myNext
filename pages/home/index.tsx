import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import Router from 'next/router';
@observer
class Home1 extends Component {
  static getInitialProps = async function (ctx: any) {
    const { id } = ctx.query;
    const { asPath } = ctx;
    let queryStringObj = {
      type: 'ALL',
      num: id,
      pageNum: 12,
      asPath
    };

    return { queryStringObj };
  };
  componentDidMount() {
    const id = Router?.router?.query?.id;
    console.log(this.props);
  }
  render() {
    return <div>Home1</div>;
  }
}

export default Home1;
