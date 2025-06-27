import React from 'react';
import { Layout } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = () => (
  <Header className="app-header">
    <div className="logo">
      <GlobalOutlined className="logo-icon" />
      <span className="logo-text">CÓRTEX</span>
    </div>
  </Header>
);

export default AppHeader;