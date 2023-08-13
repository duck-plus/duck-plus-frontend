import {
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from "react-router-dom";
import { styled } from "styled-components";

const RouteErrorFrame = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: white;
  font-size: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: red;
`;

// 라우팅 / navigate 등 client-side routing 중 render 오류 발생 시 노출할 fallback UI
const RouteErrorElement = () => {
  const routerError = useRouteError() as any;
  const location = useLocation();
  console.error(routerError);
  return (
    <RouteErrorFrame>
      {isRouteErrorResponse(routerError)
        ? routerError.data
        : `Error occured while routing: ${window.location.host} ${location.pathname}`}
    </RouteErrorFrame>
  );
};

export default RouteErrorElement;
