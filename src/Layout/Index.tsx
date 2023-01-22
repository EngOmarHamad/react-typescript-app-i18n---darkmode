import NavBar from './NavBar';
import React from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';

const { Header, Content, Footer } = Layout;

const LayoutApp: React.FC = () => {
  const {
    token: { colorBgBase },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Header className="fixed  w-full z-10 bg-white dark:bg-[#001529]">
        <NavBar></NavBar>
      </Header>
      <Content className="" style={{ padding: "84px 50px " }}>
        <Outlet />
      </Content>
      <Footer
        className=" text-center bg-emerald-500 shadow-slate-500 dark:text-white text-black text-lg"
        style={{ backgroundColor: colorBgBase }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default LayoutApp;
