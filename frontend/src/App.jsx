import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/Authentication.page.jsx';
import HomePage from './pages/Home.jsx';
import ElectionPage from './pages/Elections.jsx';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/elections" element={<ElectionPage />} />
      </Routes>
    </>
  )
}

export default App
