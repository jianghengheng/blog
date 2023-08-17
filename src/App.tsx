import { useEffect, useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useRoutes } from 'react-router-dom'



import routers from './router'
import { fetchHomeMultidataAction,setisphone } from './store/reducer/countReducer'
import { RootState } from './store'

const baseSize = 16
let remScale;
// 设置 rem 函数
function setRem () {
  // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
  // 设计师给我的是 1920 * 1080 设计图，这里根据需要更改
  const scaleX = document.documentElement.clientWidth / 1920
  const scaleY = document.documentElement.clientHeight / 1080
  // 需要取缩放倍数较小的，因为需要宽高都兼容
  if(scaleX > scaleY) {
    // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
    document.documentElement.style.fontSize = baseSize * Math.min(scaleY, 2) + 'px'
    remScale = baseSize * Math.min(scaleY, 2)
  } else {
    document.documentElement.style.fontSize = baseSize * Math.min(scaleX, 2) + 'px'
    remScale = baseSize * Math.min(scaleX, 2)
  }
  
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
console.log(window.screen.width);


function App() {
  // http://localhost:3000/
  console.log(document.documentElement.clientWidth );
  if(document.documentElement.clientWidth<=400){
  window.open('http://192.168.2.124:3000/',"_self")
  }
  const router = useRoutes(routers)
  const dispath = useDispatch()
  const addmodle=useRef()
  useEffect(() => {
    dispath(setisphone(window.screen.width))
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
