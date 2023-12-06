import { memo } from "react";
import useSelector from "../../store/use-selector";
import Basket from "../basket";
import { Outlet } from "react-router";

function Layout() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Outlet/>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default memo(Layout);