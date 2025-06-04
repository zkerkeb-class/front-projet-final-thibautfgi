import {
  createBrowserRouter,
  RouteObject,
} from "react-router";

import AppContainer from "../components/communs/appContainer/appContainer";
import HomePage from "../components/page/home/homePage";

let router = createBrowserRouter([
  {
    path: "/",
    Component: AppContainer,
    children: [
      {
        path: "/",
        Component: HomePage,
      }
    ],
  },
]);

export default router;