import Navigation from "src/components/Navigation";

function Layout({ <children:any></children:any> }) {
  return (
    <div>
      <Navigation />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
