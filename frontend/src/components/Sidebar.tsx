import SidebarHeader from "./SidebarHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import LogoutButton from "./LogoutButton";
import Chats from "./Chats";
import Contacts from "./Contacts";
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
          <Chats />
        </TabsContent>
        <TabsContent value="contacts">
          <Contacts />
        </TabsContent>
      </Tabs>
      <div className="p-2">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
