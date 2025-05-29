import { useState } from "react";
import { Layout, Tabs } from "antd";
import { EmailEditor } from "./components/EmailEditor";
import { SignatureCreator } from "./components/SignatureCreator";
import { TemplateGallery } from "./components/TemplateGallery";
import "./styles.css";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

export function App() {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <h1>Email Template Designer</h1>
      </Header>
      <Content className="app-content">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="app-tabs"
        >
          <TabPane tab="Design Email" key="1">
            <EmailEditor />
          </TabPane>
          <TabPane tab="Create Signature" key="2">
            <SignatureCreator />
          </TabPane>
          <TabPane tab="Template Gallery" key="3">
            <TemplateGallery />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}
