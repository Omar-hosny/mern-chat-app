import { LogOut } from "lucide-react";
import SidebarHeader from "./SidebarHeader";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
const Sidebar = () => {
  const tabTriggerClass =
    "w-full bg-blue-50 transition-colors hover:bg-gray-200 data-[state=active]:bg-gray-600 data-[state=active]:text-white";

  return (
    <aside className="w-full rounded-tl-2xl rounded-bl-2xl max-w-[300px] h-full flex flex-col overflow-auto bg-gray-50  border-r border-gray-200">
      <SidebarHeader />
      <Tabs defaultValue="chats" className="w-full p-2 flex-1 ">
        <TabsList className="w-full flex items-center justify-center gap-1 ">
          <TabsTrigger className={tabTriggerClass} value="chats">
            Chats
          </TabsTrigger>
          <TabsTrigger className={tabTriggerClass} value="contacts">
            Contacts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chats">
          <div className="text-2xl  overflow-auto">Chats</div>
        </TabsContent>
        <TabsContent value="contacts">
          <div className="text-2xl  overflow-auto">Contacts</div>
        </TabsContent>
      </Tabs>
      <div className="p-2">
        <Button
          variant="ghost"
          className="w-full rounded-2xl bg-gray-600 hover:bg-gray-700 text-white"
        >
          Logout <LogOut />
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
