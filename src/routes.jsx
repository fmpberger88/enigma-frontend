import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./components/Root/Root.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
    }
])

export default router;