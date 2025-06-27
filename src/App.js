import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, HistoryOutlined, UserOutlined, GlobalOutlined } from '@ant-design/icons';
import HomePage from './pages/HomePage';
import ExecutionHistoryPage from './pages/ExecutionHistoryPage';
import CustomerSearchPage from './pages/CustomerSearchPage';
import AppHeader from './components/Header';

const { Content, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
          <div style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)', textAlign: 'center', lineHeight: '32px', color: 'white', borderRadius: '6px' }}>
            Córtex
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<HistoryOutlined />}>
              <Link to="/historico">Histórico de Execução</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/consulta-clientes">Consulta de Clientes</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <AppHeader />
          <Content style={{ margin: '24px 16px 0', padding: 24, background: '#fff', borderRadius: '8px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/historico" element={<ExecutionHistoryPage />} />
              <Route path="/consulta-clientes" element={<CustomerSearchPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;