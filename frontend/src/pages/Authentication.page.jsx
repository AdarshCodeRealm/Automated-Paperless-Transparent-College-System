import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  EyeIcon,
  EyeOffIcon,
  UserCircle,
  Globe,
  Users,
  Zap,
  Shield,
} from "lucide-react"
import bgImage from "../assets/loginscreen-bg.jpg"
import { useNavigate } from "react-router-dom"
import { redirect } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import AuthContext from "../context/AuthContext.jsx"
import { backend_URL } from "@/utils/constant"
// import { AuthContext } from "@/context/AuthContext"
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showOTPVerification, setShowOTPVerification] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  // const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
  const handleForgotPassword = (e) => {
    e.preventDefault()
    // Handle sending OTP
    setShowForgotPassword(false)
    setShowOTPVerification(true)
  }

  const handleOTPVerification = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "https://hackfusion-2025.onrender.com/user/verifyOtp",
        {
          email,
          otp,
        }
      )
      console.log(response.data)
      toast.success("OTP verified successfully")
      setEmail("")
      setPassword("")
      setName("")
      setLastName("")
      setOtp("")
      setOtpSent(false)
      setIsLogin(!isLogin)

      // console.log("User Register successfully:", response.data)
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message)
      toast.error(error.response?.data.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLogin) {
      try {
        await login({
          email,
          password,
        })
        toast.success("Login successful")
        navigate("/")
      } catch (error) {
        console.error("Error logging in:", error.response?.data)
        toast.error("Invalid Login credentials..", error.message)
      }
    } else {
      console.log(password)
      try {
        const response = await axios.post(
          `${backend_URL}/user/register`,
          {
            name: name + " " + lastName,
            email,
            password,
            avatar,
          }
        )
        setOtpSent(true)
        setName("")
        setLastName("")
        setPassword("")
        setAvatar(null)
        toast.success(`User Registered successfully, Email: ${email}`)
        console.log("User Registered successfully:", response.data)
      } catch (error) {
        console.error("Error registering:", error.response?.data)
        toast.error(error.response?.data.status || error.message)
      }
    }
  }
  const glassyButtonClass =
    "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 text-white font-semibold rounded-md"

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      {/* Gradient overlay from left-bottom to right-top */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center p-4 md:p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500" />
          <span className="text-xl font-semibold text-white">
            HackFusion 2025
          </span>
        </div>
        <div className="space-x-4">
          <Button variant="link" className="text-white hover:text-blue-300">
            Home
          </Button>
          <Button variant="link" className="text-white hover:text-blue-300">
            Join
          </Button>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex-grow flex items-center justify-between">
        <div className="w-full max-w-md p-8 ml-[10%]">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold text-white">
              {isLogin ? "Welcome back" : "Create new account"}
            </h1>
            <p className="text-gray-400">
              {isLogin ? "Enter your credentials to login" : "START FOR FREE"}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your first name"
                    className="bg-black/20 border-white/10 focus:border-blue-500 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="bg-black/20 border-white/10 focus:border-blue-500 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  className="flex-grow bg-black/20 border-white/10 focus:border-blue-500 text-white placeholder:text-gray-500"
                />
                {!isLogin && (
                  <Button
                    type="button"
                    className={`${glassyButtonClass} px-3 py-2`}
                  >
                    <UserCircle className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-black/20 border-white/10 focus:border-blue-500 text-white pr-10 placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOffIcon size={16} />
                  ) : (
                    <EyeIcon size={16} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <Button
                type="submit"
                className={`w-full ${glassyButtonClass} py-2`}
              >
                {isLogin ? "Login" : "Create account"}
              </Button>
            </div>

            {isLogin && (
              <Button
                type="button"
                variant="link"
                className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot password?
              </Button>
            )}
          </form>
          {/* ---------- otp verification dialog ------------ */}
          <Dialog open={otpSent} onOpenChange={setOtpSent}>
            <DialogContent className="bg-gray-900/80 backdrop-blur-md text-white border-gray-800">
              <DialogHeader>
                <DialogTitle>Verify OTP</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleOTPVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)} // Update otp state
                    placeholder="Enter OTP"
                    className="bg-black/20 border-white/10 focus:border-blue-500 text-white"
                  />
                </div>
                <Button
                  type="submit"
                  className={`w-full ${glassyButtonClass} py-2`}
                >
                  Verify OTP
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-400">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
            </span>
            <Button
              variant="link"
              className="text-blue-400 hover:text-blue-300 p-0 h-auto"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </Button>
          </div>
        </div>

        {/* New right-side content for desktop */}
        <div className="hidden lg:flex flex-col items-center justify-center w-1/3 h-full mr-[10%] space-y-12">
          <div className="flex flex-row space-x-7">
            <div className="text-center space-y-2">
              <Globe className="w-16 h-16 text-blue-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Global Access</h2>
              <p className="text-gray-300">
                Connect from anywhere in the world
              </p>
            </div>
            <div className="text-center space-y-2">
              <Users className="w-16 h-16 text-green-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Community</h2>
              <p className="text-gray-300">Join a thriving user community</p>
            </div>
          </div>{" "}
          <div className="flex flex-row space-x-7">
            <div className="text-center space-y-2">
              <Zap className="w-16 h-16 text-yellow-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Lightning Fast</h2>
              <p className="text-gray-300">Experience unparalleled speed</p>
            </div>
            <div className="text-center space-y-2">
              <Shield className="w-16 h-16 text-red-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Secure</h2>
              <p className="text-gray-300">Your data is always protected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 p-4 text-right">
        <p className="text-sm text-gray-400">
          Designed and developed by Neo Fixers
        </p>
      </footer>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="bg-gray-900/80 backdrop-blur-md text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resetEmail">Email</Label>
              <Input
                id="resetEmail"
                type="email"
                placeholder="Enter your email"
                className="bg-black/20 border-white/10 focus:border-blue-500 text-white"
              />
            </div>
            <Button
              type="submit"
              className={`w-full ${glassyButtonClass} py-2`}
            >
              Send OTP
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* OTP Verification Dialog */}
      <Dialog open={showOTPVerification} onOpenChange={setShowOTPVerification}>
        <DialogContent className="bg-gray-900/80 backdrop-blur-md text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleOTPVerification} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                className="bg-black/20 border-white/10 focus:border-blue-500 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                className="bg-black/20 border-white/10 focus:border-blue-500 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="bg-black/20 border-white/10 focus:border-blue-500 text-white"
              />
            </div>
            <Button
              type="submit"
              className={`w-full ${glassyButtonClass} py-2`}
            >
              Reset Password
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
