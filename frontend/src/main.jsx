import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import LoginScreen from "./screens/LoginScreen.jsx";
import AddUserScreen from "./screens/AddUserScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import UserListScreen from "./screens/UserListScreen.jsx";
import NotificationsScreen from "./screens/NotificationsScreen.jsx";
import WelcomeScreen from "./screens/WelcomeScreen.jsx";
import EditUserScreen from "./screens/EditUserScreen.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/notifications" element={<NotificationsScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/userlist" element={<UserListScreen />} />
        <Route path="/adduser" element={<AddUserScreen />} />
        <Route path="/edituser/:id" element={<EditUserScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
