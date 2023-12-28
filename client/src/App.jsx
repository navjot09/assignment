import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Default from "./layout/Default";
import Home from "./routes/Home";
import NewMeet from "./routes/NewMeet";
import EditMeet from "./routes/EditMeet";
import Meeting from "./routes/Meeting";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Default />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/new",
          element: <NewMeet />,
        },
        {
          path: "/meeting/:id",
          element: <Meeting />,
        },
        {
          path: "/edit/:id",
          element: <EditMeet />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
