import { Navigate, createBrowserRouter } from "react-router-dom";
import User from "./views/User";
import Login from "./views/login";
import Singup from "./views/Singup";
import NotFound from "./views/NotFound";
import DefaulLayout from "./components/DefaulLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaulLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/users",
                element: <User />,
            },
            {
                path: "/users/new",
                element: <UserForm key="userCreate" />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate" />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },

            {
                path: "/singup",
                element: <Singup />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
