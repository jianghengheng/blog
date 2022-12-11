import { useRoutes } from 'react-router-dom'
import routers from './router'
function App() {
  const router = useRoutes(routers)

  return (
    <div>
      {router}
    </div>
  )
}

export default App
