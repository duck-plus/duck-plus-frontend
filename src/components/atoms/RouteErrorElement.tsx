import { useLocation, useRouteError } from "react-router-dom";

// 라우팅 / navigate 등 client-side routing 중 render 오류 발생 시 노출할 fallback UI
const RouteErrorElement = () => {
  const routerError = useRouteError();
  const location = useLocation();
  console.error(routerError);
  return (
    <div>
      Error occured while routing: {window.location.host}
      {location.pathname}
    </div>
  );
};

export default RouteErrorElement;
