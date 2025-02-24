import ElectionPage from "./pages/Elections.jsx"
import HealthAndLeaveNotify from "./pages/Health&Leave.page.jsx"
import ApplicationApprovalSystem from "./pages/ApplicationApprovalSystem.jsx"
import CheatingRecords from "./pages/CheatingRecords.jsx"
import BudgetSponsorshipTracking from "./pages/BudgetSponsorshipTracking.jsx"
import ProtectedRoute from "./utils/ProtectedRoute"
import RedirectIfAuthenticated from "./utils/RedirectIfAuthenticated.jsx"
import Complaints from "./pages/Complaint.page.jsx"
import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.page.jsx"
import AuthContext from "./context/AuthContext.jsx"
// import { AuthContext } from "./context/AuthContext.jsx" // Import context
function App() {
const { isAuthenticated } = useContext(AuthContext) 
  return (
    <Routes>
      <Route
        path="/"
        element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
      >
        <Route path="" element={<Home />} />
        <Route path="elections" element={<ElectionPage />} />
        <Route path="healthAndLeaveNotify" element={<HealthAndLeaveNotify />} />
        <Route
          path="applicationApproval"
          element={<ApplicationApprovalSystem />}
        />
        <Route path="bookingfacility" element={<CheatingRecords />} />
        <Route path="cheatingRecords" element={<CheatingRecords />} />
        <Route path="complaints" element={<Complaints />} />
        <Route
          path="budgetSponsorshipTracking"
          element={<BudgetSponsorshipTracking />}
        />
      </Route>
      <Route
        path="/login"
        element={<RedirectIfAuthenticated isAuthenticated={isAuthenticated} />}
      />
    </Routes>
  )
}

export default App
