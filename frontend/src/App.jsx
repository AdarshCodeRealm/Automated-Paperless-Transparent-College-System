import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/Authentication.page.jsx';
import HomePage from './pages/Home.jsx';
import ElectionPage from './pages/Elections.jsx';
import Dashboard from './pages/DashBoard.page.jsx';
import HealthandLeave from './pages/Health&Leave.page.jsx';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/elections" element={<ElectionPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/HealthandLeave" element={<HealthandLeave />} />
      </Routes>
      
    </>
  )
}

export default App
