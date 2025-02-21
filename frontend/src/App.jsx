import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/Authentication.page.jsx';
import HomePage from './pages/Home.jsx';
import FacilityPage from './pages/FacilityBookings.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/facilities" element={<FacilityPage />} />
      </Routes>
    </>
  )
}

export default App
