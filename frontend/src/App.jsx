import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/Authentication.page.jsx';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
      
    </>
  )
}

export default App
