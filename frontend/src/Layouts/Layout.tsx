const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full bg-gray-200 flex items-center mx-auto max-w-6xl flex-col h-screen">
      {children}
    </div>
  );
};

export default Layout;
