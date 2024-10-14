import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import { Predicator } from "../tasks/2-1-3/Predicator.tsx";
import { MultiLinRegress } from "../tasks/2-3/MultiLinRegress.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "predicator",
    element: <Predicator />,
  },
  {
    path: "multiple-linear-regression",
    element: <MultiLinRegress />,
  },
]);
