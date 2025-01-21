import React, { useState, useEffect } from 'react';

const EventManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventType, setEventType] = useState('All Types');
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Tech Talent Showcase 2024',
      date: 'Feb 15, 2024',
      time: '2:00 PM - 5:00 PM EST',
      type: 'Online',
      participants: 125,
      status: 'Upcoming',
    },
    {
      id: 2,
      name: 'Design Workshop',
      date: 'Mar 10, 2024',
      time: '10:00 AM - 1:00 PM EST',
      type: 'Offline',
      participants: 50,
      status: 'Upcoming',
    },
  ]);
  const [calendarView, setCalendarView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const filtered = events.filter((event) =>
      (event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.date.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (eventType === 'All Types' || event.type === eventType)
    );
    setFilteredEvents(filtered);
  }, [searchTerm, eventType, events]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const handleCreateEvent = () => {
    const newEvent = {
      id: events.length + 1,
      name: 'New Event',
      date: 'Apr 20, 2024',
      time: '4:00 PM - 6:00 PM EST',
      type: 'Hybrid',
      participants: 30,
      status: 'Upcoming',
    };
    setEvents([...events, newEvent]);
  };

  const handleViewChange = (view) => {
    setCalendarView(view);
  };

  const renderCalendar = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));

    let calendarDays = [];
    if (calendarView === 'month') {
      const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
      }
    } else if (calendarView === 'week') {
      for (let i = 0; i < 7; i++) {
        calendarDays.push(new Date(startOfWeek.setDate(startOfWeek.getDate() + i)));
      }
    } else if (calendarView === 'today') {
      calendarDays.push(new Date());
    }

    return calendarDays.map((date, idx) => (
      <div key={idx} className="text-center p-2 border">
        {date.getDate()}
      </div>
    ));
  };

  return (
    <section id="event-management" className="p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex gap-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={eventType}
            onChange={handleEventTypeChange}
          >
            <option>All Types</option>
            <option>Online</option>
            <option>Offline</option>
            <option>Hybrid</option>
          </select>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={handleCreateEvent}
          >
            Create Event
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Event Calendar</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded" onClick={() => handleViewChange('today')}>Today</button>
            <button className="px-3 py-1 border border-gray-300 rounded" onClick={() => handleViewChange('month')}>Month</button>
            <button className="px-3 py-1 border border-gray-300 rounded" onClick={() => handleViewChange('week')}>Week</button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {renderCalendar()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg border border-neutral-200/30 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{event.name}</h3>
                    <p className="text-sm text-neutral-500">{event.date}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {event.status}
                  </span>
                </div>
                <div className="space-y-3 mb-4">
                  <p className="text-sm text-neutral-600">
                    A description of the event goes here.
                  </p>
                  <div className="flex items-center text-sm text-neutral-500">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-neutral-500">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {event.participants} Participants
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white"></div>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 border-2 border-white text-sm">
                      +5
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm border border-neutral-200/30 rounded-lg hover:bg-neutral-50">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm border border-neutral-200/30 rounded-lg hover:bg-neutral-50">
                      Manage
                    </button>
                    <button className="px-3 py-1 text-sm text-red-500 border border-red-500 rounded-lg hover:bg-red-50">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 text-left text-sm border border-neutral-200/30 rounded-lg hover:bg-neutral-50 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Schedule New Event
              </button>
            </div>
          </div>

          {/* Event Stats */}
          <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
            <h3 className="text-lg font-medium mb-4">Event Statistics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Total Events</span>
                  <span className="font-medium">{filteredEvents.length}</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventManagement;
