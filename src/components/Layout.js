import * as React from 'react';
import { Component } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import '../styles/layout.less';
import navigation from '../services/navigation';
export default class Layout extends Component {
  render() {
    return (
      <div className="main">
        <Menu
          mode="horizontal"
          className="menu-container"
          selectedKeys={this.props.selectedKey}>
          <Menu.Item key="mail">
            <a href="/">主页</a>
          </Menu.Item>
          <Menu.Item key="articleList">
            <a href="/home/articleList">
              <Icon type="appstore" />
              我的博客
            </a>
          </Menu.Item>
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Icon type="setting" />
                Navigation Three - Submenu
              </span>
            }></SubMenu>
          <Menu.Item key="addArticle">
            <a href="/home/article">写博客</a>
          </Menu.Item>
        </Menu>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
