const Layout = ({ children }) => {
  return (
    <div className="p-4">
      <div className="grid gap-4 md:flex">{children}</div>
    </div>
  );
};

export default Layout;
