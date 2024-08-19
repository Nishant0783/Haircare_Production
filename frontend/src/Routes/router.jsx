import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout";
import Home from "../Pages/Home";
import OnlineTest from "../Pages/OnlineTest";
import Result from "../Pages/Result";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '', // This will be the default child route
                element: <Home />
            },
            {
                path: 'take-test',
                element: <OnlineTest />
            },
            {   
                path: 'result',
                element: <Result />
            }
        ]
    }
]);

export default router;
