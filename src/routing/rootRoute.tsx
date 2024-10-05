import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import { Predicator } from "../tasks/2-1-3/Predicator.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "predicator",
    element: <Predicator />,
  },
]);
