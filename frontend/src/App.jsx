import HomePage from "./pages/Home.jsx"
import ElectionPage from "./pages/Elections.jsx"
import ComplaintList from "./pages/Complaint.page.jsx"
import HealthAndLeaveNotify from "./pages/Health&Leave.page.jsx"
import ApplicationApprovalSystem from "./pages/ApplicationApprovalSystem.jsx"
import CheatingRecords from "./pages/CheatingRecords.jsx"
import BudgetSponsorshipTracking from "./pages/BudgetSponsorshipTracking.jsx"
import ProtectedRoute from "./utils/ProtectedRoute"
import RedirectIfAuthenticated from "./utils/RedirectIfAuthenticated.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useContext } from "react"
import {  AuthContext } from './context/AuthContext.jsx'; // Import context
function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "elections", element: <ElectionPage /> },
        { path: "complaints", element: <ComplaintList /> },
        { path: "healthAndLeaveNotify", element: <HealthAndLeaveNotify /> },
        { path: "applicationApproval", element: <ApplicationApprovalSystem /> },
        { path: "bookingfacility", element: <CheatingRecords /> },
        { path: "cheatingRecords", element: <CheatingRecords /> },
        {
          path: "budgetSponsorshipTracking",
          element: <BudgetSponsorshipTracking />,
        },
      ],
    },
    {
      path: "/auth",
      element: <RedirectIfAuthenticated isAuthenticated={isAuthenticated} />,
    },
  ])

  return <RouterProvider router={router} />
}

export default App
