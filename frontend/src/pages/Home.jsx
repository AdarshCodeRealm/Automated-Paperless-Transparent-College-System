import { Bell, CheckSquare, Eye, Users2 } from "lucide-react"

export default function CollegeConnect() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to College Connect</h1>
        <p className="text-lg text-gray-600">Your one-stop solution for a better college experience.</p>
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

