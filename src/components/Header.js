import React from 'react';
import { Layout, Avatar, Typography } from 'antd';
import { GlobalOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = () => (
  <Header className="app-header">
    <div className="logo">
      <GlobalOutlined className="logo-icon" />
      <span className="logo-text">CÓRTEX</span>
    </div>
    <div className="header-user-info">
      <Avatar size="large" icon={<UserOutlined />} />
      <div className="user-details">
        <Text className="user-name">Antonio Ismael Rodrigues de Melo</Text><br/>
        <Text className="user-email">antonio.ismael@cea.com.br</Text>
      </div>
    </div>
  </Header>
);

export default AppHeader;