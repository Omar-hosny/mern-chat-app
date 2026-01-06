import Sidebar from "../components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="w-full max-w-6xl mx-auto h-screen flex items-center justify-center">
        <div
          className="w-full flex items-start h-full max-h-[85vh] bg-white rounded-2xl
        border-2 border-blue-500
        "
        >
          <Sidebar />
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
