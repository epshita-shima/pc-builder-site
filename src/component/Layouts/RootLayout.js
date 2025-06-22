import { Button, Dropdown, Layout, Menu } from 'antd';
import React from 'react'

const { Header, Content, Footer } = Layout;
const categoryMenu = (
  <Menu
    items={[
      { key: 'cpu', label: 'Processor' },
      { type: 'divider' },
      { key: 'ram', label: 'RAM' },
      { type: 'divider' },
      { key: 'gpu', label: 'Graphics Card' },
      { type: 'divider' },
    ]}
  />
);

const RootLayout = ({ children }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ color: 'white', fontSize: 20 }}>MyCompanyLogo</div>
      <Dropdown overlay={categoryMenu} trigger={['click']}>
        <Button>
          Category 
        </Button>
      </Dropdown>
      <Button type="primary">PC Builder</Button>
    </Header>
    <Content style={{ padding: '24px' }}>{children}</Content>
    <Footer style={{ textAlign: 'center' }}>Demo Footer</Footer>
  </Layout>
);
export default RootLayout
