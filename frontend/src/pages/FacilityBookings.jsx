import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckSquare, Building2, MessageSquare, MapPin, Globe, Zap, Shield } from 'lucide-react';
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';

// Menu Items Configuration
const menuItems = [
  { icon: Clock, label: 'Book Facility', id: 'book-facility' },
  { icon: Calendar, label: 'Calendar', id: 'calendar' },
  { icon: CheckSquare, label: 'My Bookings', id: 'my-bookings' },
  { icon: Users, label: 'Booking Status', id: 'booking-status' },
  { icon: Building2, label: 'Facilities', id: 'facilities' },
  { icon: MessageSquare, label: 'Feedback', id: 'feedback' },
];

// Mock Data
const facilities = [
  {
    id: '1',
    name: 'Badminton Court',
    description: 'Professional standard badminton court with wooden flooring and proper lighting.',
    location: 'Sports Complex, Ground Floor',
    capacity: 4,
    imageUrl: 'https://images.unsplash.com/photo-1544979590-37e9b47eb705',
    bookings: [9, 10, 11],
    unavailable: [13, 14],
  },
  {
    id: '2',
    name: 'Conference Room',
    description: 'Modern conference room equipped with projector and video conferencing facilities.',
    location: 'Academic Block, 2nd Floor',
    capacity: 20,
    imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407',
    bookings: [15, 16],
    unavailable: [9],
  },
];

const bookings = [
  {
    id: '1',
    facility: 'Badminton Court',
    imageUrl: 'https://images.unsplash.com/photo-1544979590-37e9b47eb705',
    date: '2024-03-15',
    startTime: '09:00',
    endTime: '11:00',
    status: 'approved',
  },
  {
    id: '2',
    facility: 'Conference Room',
    imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407',
    date: '2024-03-16',
    startTime: '14:00',
    endTime: '16:00',
    status: 'pending',
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('');
  const [mainUser, setMainUser] = useState({
    fullName: '',
    contactNumber: '',
    course: '',
    year: '',
    registrationNumber: '',
    email: '',
  });
  const [participants, setParticipants] = useState([]);
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: '',
    suggestions: '',
    issues: '',
  });

  // Booking Facility Component
  const BookFacility = () => {
    const handleAddParticipant = () => {
      setParticipants([
        ...participants,
        {
          fullName: '',
          contactNumber: '',
          course: '',
          year: '',
          registrationNumber: '',
          email: '',
        },
      ]);
    };

    const handleParticipantChange = (index, field, value) => {
      const updatedParticipants = [...participants];
      updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
      setParticipants(updatedParticipants);
    };

    return (
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Book Facility</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Main User Details</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-white text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  value={mainUser.fullName}
                  onChange={(e) => setMainUser({ ...mainUser, fullName: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    value={mainUser.contactNumber}
                    onChange={(e) => setMainUser({ ...mainUser, contactNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    value={mainUser.email}
                    onChange={(e) => setMainUser({ ...mainUser, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Course
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    value={mainUser.course}
                    onChange={(e) => setMainUser({ ...mainUser, course: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    value={mainUser.year}
                    onChange={(e) => setMainUser({ ...mainUser, year: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-white text-sm font-bold mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  value={mainUser.registrationNumber}
                  onChange={(e) => setMainUser({ ...mainUser, registrationNumber: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Additional Participants</h2>
              <button
                type="button"
                onClick={handleAddParticipant}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Add Participant
              </button>
            </div>

            {participants.map((participant, index) => (
              <div key={index} className="mb-6 p-4 border border-white/20 rounded-lg bg-white/5">
                <h3 className="font-semibold mb-4 text-white">Participant {index + 1}</h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-bold mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        value={participant.fullName}
                        onChange={(e) => handleParticipantChange(index, 'fullName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-bold mb-2">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        value={participant.contactNumber}
                        onChange={(e) => handleParticipantChange(index, 'contactNumber', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-bold mb-2">
                        Course
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        value={participant.course}
                        onChange={(e) => handleParticipantChange(index, 'course', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-bold mb-2">
                        Year
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        value={participant.year}
                        onChange={(e) => handleParticipantChange(index, 'year', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-bold mb-2">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      value={participant.registrationNumber}
                      onChange={(e) => handleParticipantChange(index, 'registrationNumber', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      value={participant.email}
                      onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-semibold"
          >
            Submit Booking Request
          </button>
        </form>
      </div>
    );
  };

  // Facility Calendar Component
  const FacilityCalendar = () => {
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const getTimeSlotColor = (facilityId, hour) => {
      const facility = facilities.find(f => f.id === facilityId);
      if (facility?.bookings.includes(hour)) return 'bg-green-500';
      if (facility?.unavailable.includes(hour)) return 'bg-red-500';
      return 'bg-transparent';
    };

    return (
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Facility Calendar</h1>
          <div className="text-lg font-semibold text-white">
            {format(today, 'MMMM yyyy')}
          </div>
        </div>

        {facilities.map((facility) => (
          <div key={facility.id} className="mb-8">
            <div className="flex items-center mb-4">
              <img
                src={facility.imageUrl}
                alt={facility.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-white">{facility.name}</h3>
                <p className="text-gray-300">{facility.location} • {facility.capacity} people</p>
              </div>
            </div>

            <div className="grid grid-cols-9 gap-1 text-sm">
              <div className="col-span-1"></div>
              {Array.from({ length: 8 }, (_, i) => i + 9).map((hour) => (
                <div key={hour} className="text-center font-medium text-white">
                  {hour}:00
                </div>
              ))}
            </div>

            {days.map((day) => (
              <div key={day.toString()} className="grid grid-cols-9 gap-1 mt-2">
                <div className="text-sm font-medium text-white">
                  {format(day, 'EEE dd')}
                </div>
                {Array.from({ length: 8 }, (_, i) => i + 9).map((hour) => (
                  <div
                    key={hour}
                    className={`h-8 rounded ${getTimeSlotColor(facility.id, hour)} border border-white/20`}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}

        <div className="mt-6 flex gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-white">Booked</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-white">Not Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-transparent border border-white/20 rounded mr-2"></div>
            <span className="text-white">Available</span>
          </div>
        </div>
      </div>
    );
  };

  // My Bookings Component
  const MyBookings = () => {
    const handleCancelBooking = (bookingId) => {
      console.log('Cancelling booking:', bookingId);
    };

    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">My Bookings</h1>
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={booking.imageUrl}
                    alt={booking.facility}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">{booking.facility}</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="w-4 h-4 mr-2" />
                        {booking.date}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Clock className="w-4 h-4 mr-2" />
                        {booking.startTime} - {booking.endTime}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Booking Status Component
  const BookingStatus = () => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'approved': return 'bg-green-500';
        case 'rejected': return 'bg-red-500';
        case 'pending': return 'bg-blue-500';
        default: return 'bg-gray-500';
      }
    };

    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Booking Status</h1>
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden cursor-pointer hover:bg-white/15 transition-all duration-200"
            >
              <div className="flex items-center p-4">
                <img
                  src={booking.imageUrl}
                  alt={booking.facility}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-xl font-semibold text-white">{booking.facility}</h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-white text-sm mt-2 ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Facilities Component
  const Facilities = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Available Facilities</h1>
        <div className="grid gap-6">
          {facilities.map((facility) => (
            <div key={facility.id} className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={facility.imageUrl}
                    alt={facility.name}
                    className="h-48 w-full object-cover md:h-full"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2 text-white">{facility.name}</h3>
                  <p className="text-gray-300 mb-4">{facility.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      {facility.location}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="w-4 h-4 mr-2" />
                      Capacity: {facility.capacity} people
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Feedback Component
  const Feedback = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Feedback submitted:', feedback);
    };

    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Facility Feedback</h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedback({ ...feedback, rating: star })}
                    className={`text-2xl ${
                      star <= feedback.rating ? 'text-yellow-400' : 'text-gray-500'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Comments
              </label>
              <textarea
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                rows={4}
                value={feedback.comment}
                onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                placeholder="Share your experience with the facility..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Suggestions for Improvement
              </label>
              <textarea
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                rows={3}
                value={feedback.suggestions}
                onChange={(e) => setFeedback({ ...feedback, suggestions: e.target.value })}
                placeholder="Any suggestions to improve the facility?"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Report Issues
              </label>
              <textarea
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                rows={3}
                value={feedback.issues}
                onChange={(e) => setFeedback({ ...feedback, issues: e.target.value })}
                placeholder="Any issues or problems to report?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Main Content Renderer
  const renderContent = () => {
    switch (activeSection) {
      case 'book-facility':
        return <BookFacility />;
      case 'calendar':
        return <FacilityCalendar />;
      case 'my-bookings':
        return <MyBookings />;
      case 'booking-status':
        return <BookingStatus />;
      case 'facilities':
        return <Facilities />;
      case 'feedback':
        return <Feedback />;
      default:
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <span className="text-lg font-medium text-white">{item.label}</span>
                </div>
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-white">
      {/* Background with overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1514214089800-6f1f3ae37854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)'
        }}
      ></div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 bg-black/20 backdrop-blur-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
          <span className="ml-3 text-xl font-semibold">Facility Booking 2025</span>
        </div>
        <button 
          onClick={() => setActiveSection('')}
          className="text-white/80 hover:text-white transition-colors"
        >
          Dashboard
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-gray-400 text-sm py-8 mt-20">
        Designed and developed by Neo Fixers
      </footer>
    </div>
  );
}

export default App;