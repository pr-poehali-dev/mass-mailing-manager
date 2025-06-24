import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateCampaign from "./CreateCampaign";
import UserGroups from "./UserGroups";
import CampaignHistory from "./CampaignHistory";
import Dashboard from "./Dashboard";

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("campaigns");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Панель управления рассылками
        </h1>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Главная</TabsTrigger>
            <TabsTrigger value="campaigns">Создать кампанию</TabsTrigger>
            <TabsTrigger value="groups">Группы пользователей</TabsTrigger>
            <TabsTrigger value="history">История кампаний</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="campaigns">
            <CreateCampaign />
          </TabsContent>

          <TabsContent value="groups">
            <UserGroups />
          </TabsContent>

          <TabsContent value="history">
            <CampaignHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminLayout;
