// import MarkdownEditor from '@uiw/react-markdown-editor';
import React from 'react';
import dynamic from 'next/dynamic';
import { Input, Button, message } from 'antd';
import { saveArticle } from '../services/article';
const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor'), {
  ssr: false
});
import { observable } from 'mobx';
import navigation from '../services/navigation';
export default class ArticleEditor extends React.Component {
  @observable title = '';
  @observable content =
    '# This is a H1  \n## This is a H2  \n###### This is a H6';
  constructor() {
    super();
    this.updateMarkdown = this.updateMarkdown.bind(this);
  }

  componentDidMount() {
    console.log(this.props.id);
  }
  updateMarkdown(editor, data, value) {
    this.content = value;
  }

  changeTitle = e => {
    this.title = e.target.value;
  };

  onSave = async () => {
    if (this.title.trim() == '') {
      message.warning('标题不能为空');
      return;
    }
    let createTime = Date.now();
    let value = {
      title: this.title,
      content: this.content,
      createTime
    };

    await saveArticle(value);
    navigation.push('/home/articleList');
  };

  render() {
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <Input placeholder="请输入标题" onChange={this.changeTitle} />
          <Button type="primary" onClick={this.onSave}>
            保存
          </Button>
        </div>
        <MarkdownEditor
          className="article-editor"
          value={this.content}
          onChange={this.updateMarkdown}
        />
      </div>
    );
  }
}
