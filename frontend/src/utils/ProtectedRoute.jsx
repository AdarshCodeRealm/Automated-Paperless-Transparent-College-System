import { Navigate } from "react-router-dom"
import PropTypes from "prop-types"
import DashBoard from "../pages/DashBoard.page.jsx"
const ProtectedRoute = ({ isAuthenticated, redirectPath = "/auth" }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }
  return <DashBoard />
}

export default ProtectedRoute

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string,
}
