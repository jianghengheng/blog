import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useRoutes } from 'react-router-dom'



import routers from './router'
import { fetchHomeMultidataAction } from './store/reducer/countReducer'


function App() {
  const router = useRoutes(routers)
  const dispath = useDispatch()
  const addmodle=useRef()
  useEffect(() => {
    // 获取分类数据
    dispath((fetchHomeMultidataAction() as any))
  }, [])
  return (
    <div>
      {router}
    </div>
  )
}

export default App
