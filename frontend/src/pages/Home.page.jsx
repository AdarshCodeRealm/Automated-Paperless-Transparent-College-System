import { Bell, CheckSquare, Eye, Users2, Calendar, BarChart, FileText, Award } from "lucide-react"
import { useState, useEffect } from "react"

export default function CollegeConnect() {
  const [stats, setStats] = useState({
    activeElections: 0,
    pendingApplications: 0,
    todayEvents: 0,
    budgetUtilization: 0
  });
  
  // Simulate loading data
  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setStats({
        activeElections: 2,
        pendingApplications: 17,
        todayEvents: 3,
        budgetUtilization: 68
      });
    }, 1000);
  }, []);

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to College Connect</h1>
        <p className="text-lg text-gray-600">Your one-stop solution for a better college experience.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <Award className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Active Elections</h3>
          <p className="text-2xl font-bold">{stats.activeElections}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Pending Applications</h3>
          <p className="text-2xl font-bold">{stats.pendingApplications}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <div className="bg-purple-100 p-3 rounded-full mb-4">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Today's Events</h3>
          <p className="text-2xl font-bold">{stats.todayEvents}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <div className="bg-amber-100 p-3 rounded-full mb-4">
            <BarChart className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Budget Utilization</h3>
          <p className="text-2xl font-bold">{stats.budgetUtilization}%</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-40 bg-blue-600 relative">
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium">May 25, 2025</div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">Annual Tech Symposium</h3>
              <p className="text-gray-600 mb-4">Join us for a day of innovation and technology showcases from leading industry experts.</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span>9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-40 bg-green-600 relative">
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium">May 27, 2025</div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">Sustainability Workshop</h3>
              <p className="text-gray-600 mb-4">Learn about sustainable practices and how to implement them in your daily college life.</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span>2:00 PM - 4:00 PM</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-40 bg-purple-600 relative">
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium">June 1, 2025</div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">Cultural Festival</h3>
              <p className="text-gray-600 mb-4">Celebrate diversity with performances, food, and activities from cultures around the world.</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span>11:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Fair Elections */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckSquare className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Fair Elections</h2>
          <h3 className="text-gray-600 mb-3">Secure & Transparent Voting Platform</h3>
          <p className="text-gray-500">
            Experience impartial student elections with our secure online voting system, ensuring every voice is heard.
          </p>
        </div>

        {/* Automated Notifications */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Bell className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Automated Notifications</h2>
          <h3 className="text-gray-600 mb-3">Instant Health & Leave Updates</h3>
          <p className="text-gray-500">
            Stay informed with automated health and leave notifications, ensuring student safety and efficient
            communication.
          </p>
        </div>

        {/* Transparent Approvals */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Users2 className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Transparent Approvals</h2>
          <h3 className="text-gray-600 mb-3">Streamlined Application Process</h3>
          <p className="text-gray-500">
            Track applications seamlessly with our transparent approval system, fostering accountability and efficiency
            in administrative tasks.
          </p>
        </div>

        {/* Open Finances */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Eye className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Open Finances</h2>
          <h3 className="text-gray-600 mb-3">Budget & Sponsorship Transparency</h3>
          <p className="text-gray-500">
            Gain insights into college finances with our open budget and sponsorship tracking, promoting responsible
            resource allocation.
          </p>
        </div>
      </div>

      <div className="text-center mt-16">
        <p className="text-gray-600 max-w-3xl mx-auto">
          Empowering colleges with transparency, efficiency, and accountability through a unified digital platform for
          elections, approvals, finances, and communication.
        </p>
      </div>
    </main>
  )
}

