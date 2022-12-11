import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Main = lazy(() => import("../view/main"))
const Index = lazy(() => import("../view/index"))
const routers = [
    {
        path: "/",
        element: <Navigate to={'/index'}></Navigate>
    },
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/index",
                element: <Index />,
            }
        ]
    }
]
export default routers