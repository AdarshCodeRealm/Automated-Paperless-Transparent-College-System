import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/Authentication.page.jsx';
import HomePage from './pages/Home.jsx';
import ElectionPage from './pages/Elections.jsx';
// import Complaint from './components/complaintShowcase.jsx';
import Dashboard from './pages/DashBoard.page.jsx';
import ComplaintList from './pages/Complaint.page.jsx';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/elections" element={<ElectionPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/dashboard/complaint" element={<Complaint/>} /> */}
        <Route path="/complaintlist" element={<ComplaintList/>} />
      </Routes>
      
    </>
  )
}

export default App
