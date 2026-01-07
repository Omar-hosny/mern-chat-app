import useGetContacts from "../hooks/useGetContacts";
import ChatItem from "./ChatItem";
import ChatItemLoading from "./ChatItemLoading";

const Contacts = () => {
  const { contacts, isLoading } = useGetContacts();

  return (
    <div className="flex flex-col gap-2 overflow-auto">
      {isLoading &&
        Array.from({ length: 5 }).map((_, index) => (
          <ChatItemLoading key={index} />
        ))}

      {!isLoading &&
        contacts?.map((contact) => (
          <ChatItem key={contact._id} contact={contact} />
        ))}
    </div>
  );
};

export default Contacts;
