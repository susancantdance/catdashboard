import { useOutletContext } from "react-router-dom";

function Test() {
  const { post, setDisplay } = useOutletContext();
  return (
    <>
      <Outlet />
    </>
  );
}
