import { Routes, Route } from "react-router-dom"
import AuthPage from "./pages/Authentication.page.jsx"
import HomePage from "./pages/Home.jsx"
import ElectionPage from "./pages/Elections.jsx"
// import Complaint from './components/complaintShowcase.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from "./pages/DashBoard.page.jsx"
import ComplaintList from "./pages/Complaint.page.jsx"
import HealthAndLeaveNotify from "./pages/Health&Leave.page.jsx";
import ApplicationApprovalSystem from "./pages/ApplicationApprovalSystem.jsx";
import CheatingRecords from "./pages/CheatingRecords.jsx";
import BudgetAndSponsorshipTracking from "./pages/BudgetSponsorshipTracking.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />, // Use the Layout component here
    children: [
      // { index: true, element: <AuthPage /> }, // Index route for /
      { path: "home", element: <HomePage /> },
      { path: "elections", element: <ElectionPage /> },
      { path: "complaints", element: <ComplaintList /> },
      { path: "healthAndLeaveNotify", element: <HealthAndLeaveNotify /> },
      {
        path: "/auth", // If you still want a separate auth route
        element: <AuthPage />,
      },
      { path: "applicationApproval", element: <ApplicationApprovalSystem /> },
      { path: "cheatingRecords", element: <CheatingRecords /> },
      { path: "budgetSponsorshipTracking", element: <BudgetAndSponsorshipTracking /> },
    ],
  },
  // {
  //   path: "/auth", // If you still want a separate auth route
  //   element: <AuthPage />,
  // },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
