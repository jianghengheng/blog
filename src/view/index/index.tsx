import { useRoutes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from '../../store/reducer/countReducer'
import store from '../../store'
import { Button } from 'antd'
import { useState, useEffect } from 'react'
type RootState = ReturnType<typeof store.getState>
function Index() {

  let [count, setCount] = useState<Array<any>>([1, 2, 3])
  useEffect(() => {
    console.log(1212);

  }, [])
  useEffect(() => {
    console.log(789789);

  }, [count])
  const dispatch = useDispatch()
  const count1 = useSelector((state: RootState) => state.countReducer)

  const ChangeStateNum = () => {
    /**异步 */
    dispatch(increment())
  }

  const useEffectDemo = () => {
    
    let newcout = [...count]
    newcout.splice(0, 1)
    setCount(newcout)
  }
  return (
    <div>
      {count1.value}
      <Button type="primary" onClick={ChangeStateNum}>redux-thunk</Button>
      <Button type="primary" onClick={useEffectDemo}>测试 useEffect</Button>
      {count.map((res) => (
        <li key={res}>{res}</li>
      ))}
    </div>
  )
}

export default Index
