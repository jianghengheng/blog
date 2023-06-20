import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Main = lazy(() => import("../view/index"))
const User = lazy(() => import("../view/userinfo/index"))
const Cagegory = lazy(() => import("../view/category/index"))
const Article = lazy(() => import("../view/article/index"))
const Resume = lazy(() => import("../view/resume/index"))
const Message = lazy(() => import("../view/message/index"))
const routers = [
    {
        path: "/",
        element: <Navigate to={'/user'}></Navigate>
    },
    {
        path: "/user",
        element: <React.Suspense fallback={<div>Loading....</div>}>
            <User />
        </React.Suspense>,

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
    {
        path: "/message",
        element: <React.Suspense fallback={<div>Loading....</div>}>
            <Message></Message>
        </React.Suspense>,

    },
]
export default routers