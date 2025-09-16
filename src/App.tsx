import { ApiManagement } from './pages/ApiManagement'
import { Dashboard } from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import Layout from './components/layouts/AppLayout'
import { SignIn } from './pages/SignIn'
import ProtectedRoute from './components/custom/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute>
        <Layout />
      </ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path='api-management' element={<ApiManagement />} />
      </Route>
      <Route path='*' element={<NotFound />} />
      <Route path='sign-in' element={<SignIn />} />
    </Routes>
  )
}