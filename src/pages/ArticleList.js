import ReactMarkdown from 'react-markdown';
import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { computed, observable } from 'mobx';
import { fetchArticles } from '../services/article';
import '../styles/articleList.less';
import moment from 'moment';
import Router from 'next/router';

@observer
class Login extends Component {
  @observable articlesList = [];
  async componentDidMount() {
    this.articlesList = await fetchArticles();
    console.log(this.articlesList);
  }

  @computed
  get content() {
    return this.articlesList?.map((item, index) => {
      return (
        <div key={index} className="item">
          <Link
            as={`/home/articleDetails/${item._id}`}
            href={`/home/articleDetails?id=${item._id}`}>
            <a className="title">{item.title}</a>
          </Link>
          <p>{moment(item.createTime).format('ll')}</p>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="articleList">
        {/* <style dangerouslySetInnerHTML={{ __html: styles }} /> */}
        {this.content}
      </div>
    );
  }
}

export default Login;
