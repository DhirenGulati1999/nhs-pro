import Header from "./Header";

function Layout({ children }: any) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
