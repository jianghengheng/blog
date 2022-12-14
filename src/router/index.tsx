import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Main = lazy(() => import("../view/index"))
const Cagegory = lazy(() => import("../view/category/index"))
const Article = lazy(() => import("../view/article/index"))
const Resume = lazy(() => import("../view/resume/index"))
const routers = [
    {
        path: "/",
        element: <Navigate to={'/index'}></Navigate>
    },
    {
        path: "/index",
        element: <React.Suspense fallback={<div>Loading....</div>}>
            <Main />
        </React.Suspense>,

    },
    {
        path: "/cagegory",
        element: <React.Suspense fallback={<div>Loading....</div>}>
            <Cagegory></Cagegory>
        </React.Suspense>,

    },
    {
        path: "/article",
        element: <React.Suspense fallback={<div>Loading....</div>}>
            <Article></Article>
        </React.Suspense>,

    },
    {
        path: "/resume",
        element: <React.Suspense fallback={<div>Loading....</div>}>
            <Resume></Resume>
        </React.Suspense>,

    },
]
export default routers