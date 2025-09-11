import { Dashboard } from './pages/Dashboard'
import { useRoutes } from 'react-router-dom'

function App() {
  return useRoutes([
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/api-management',
      element: <div>Hello</div>
    },
    {
      path: "*",
      element: <div>Page Not Found</div>
    }
  ])
}

export default App
