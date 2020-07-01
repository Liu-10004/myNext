import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { computed, observable } from 'mobx';
import { message, Button, Spin, Table, Divider } from 'antd';
import navigation from '../../src/services/navigation';
import Router from 'next/router';
import { login, singout } from '../../src/services/login';
import { fetchPersons, delPerson } from '../../src/services/home';
import Layout from '../../src/components/Layout.js';
@observer
class HomePage extends Component {
  @observable text = '';
  @observable dataSource = [];
  @observable loading = false;
  async componentDidMount() {
    try {
      this.loading = true;
      let data;
      let res = await fetch('/home/3').then(res => {
        if (res) {
          data = res.json();
        }
      });
      if (data == 'login') {
        message.warning('未登录，去主页登录');
        setTimeout(() => {
          navigation.push('/');
        }, 1000);
        return;
      }
      this.getPersons();
    } catch (e) {
      console.log(e.message);
      // message.error(e.message);
    } finally {
      this.loading = false;
    }
  }

  getPersons = async () => {
    let data = await fetchPersons();
    this.dataSource = data;
  };

  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>
    },
    {
      title: '年龄',
      dataIndex: 'age'
    },
    {
      title: '操作',
      render: (text, record) => {
        return (
          <div>
            <a>查看</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleDel(record)}>删除</a>
          </div>
        );
      }
    }
  ];

  handleDel = async record => {
    this.loading = true;
    console.log(record._id);
    await delPerson(record._id);
    await this.getPersons();
    this.loading = false;
  };

  @computed
  get content() {
    if (this.text == 'login') {
      return <a href="/">{this.text}</a>;
    } else {
      return this.text;
    }
  }
  logOut = async () => {
    try {
      await singout();
      navigation.push('/');
    } catch (e) {
      message.error(e.message);
    }
  };

  render() {
    return (
      <Layout>
        <div style={{ backgroundColor: '#fff' }}>
          {this.content}
          <Button
            type="primary"
            onClick={this.logOut}
            style={{ marginBottom: 20 }}>
            退出
          </Button>
          <Spin spinning={this.loading}>
            <Table columns={this.columns} dataSource={this.dataSource}></Table>
          </Spin>
        </div>
      </Layout>
    );
  }
}

export default HomePage;
