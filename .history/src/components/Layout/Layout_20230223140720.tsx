import Navigation from "src/components/Navigation";

function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
