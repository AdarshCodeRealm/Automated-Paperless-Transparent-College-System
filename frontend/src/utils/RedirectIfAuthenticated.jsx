import { Navigate } from "react-router-dom"
import PropTypes from "prop-types"
import Auth from "../pages/Authentication.page.jsx"
const RedirectIfAuthenticated = ({ isAuthenticated, redirectPath = "/" }) => {
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  return <Auth />
}

export default RedirectIfAuthenticated

RedirectIfAuthenticated.propTypes = {
  isAuthenticated: PropTypes.bool,
  redirectPath: PropTypes.string,
}
