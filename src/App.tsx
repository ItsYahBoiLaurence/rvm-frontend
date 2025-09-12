import { ApiManagement } from './pages/ApiManagement'
import { Dashboard } from './pages/Dashboard'
import { useRoutes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'

function App() {
  return useRoutes([
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/api-management',
      element: <ApiManagement />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ])
}

export default App
