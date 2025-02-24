import ElectionPage from "./pages/Elections.jsx"
import HealthAndLeaveNotify from "./pages/Health&Leave.page.jsx"
import ApplicationApprovalSystem from "./pages/ApplicationApprovalSystem.jsx"
import CheatingRecords from "./pages/CheatingRecords.jsx"
import BudgetSponsorshipTracking from "./pages/BudgetSponsorshipTracking.jsx"
import ProtectedRoute from "./utils/ProtectedRoute"
import RedirectIfAuthenticated from "./utils/RedirectIfAuthenticated.jsx"
import Complaints from "./pages/Complaint.page.jsx"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.page.jsx"
import DashBoard from "./pages/DashBoard.page.jsx"
import AuthPage from "./pages/Authentication.page.jsx"
function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route element={<DashBoard/>} >

        <Route index element={<Home />} />
        <Route path="elections" element={<ElectionPage />} />
        <Route path="healthAndLeaveNotify" element={<HealthAndLeaveNotify />} />
        <Route path="applicationApproval" element={<ApplicationApprovalSystem />} />
        <Route path="bookingfacility" element={<CheatingRecords />} />
        <Route path="cheatingRecords" element={<CheatingRecords />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="budgetSponsorshipTracking" element={<BudgetSponsorshipTracking />} />
        </Route>
      </Route>
      <Route
        path="/login"
        element={<RedirectIfAuthenticated>
          <AuthPage />
        </RedirectIfAuthenticated>}
      />
    </Routes>
  );
}

export default App