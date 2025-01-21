import React, { useState } from 'react';

const TalentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [talentsData, setTalentsData] = useState([
    {
      title: "Web Development",
      author: "John Smith",
      status: "Approved",
      skills: "React, Node.js, MongoDB",
      experience: "5 years",
      location: "New York, USA",
    },
    {
      title: "Graphic Design",
      author: "Sarah Johnson",
      status: "Pending",
      skills: "Photoshop, Illustrator",
      experience: "3 years",
      location: "London, UK",
      isActionable: true,
    },
    {
      title: "Music Production",
      author: "Mike Brown",
      status: "Rejected",
      skills: "Logic Pro, FL Studio",
      experience: "2 years",
      location: "Los Angeles, USA",
      reconsiderOption: true,
    },
    {
      title: "Mobile App Development",
      author: "Alice Green",
      status: "Approved",
      skills: "Flutter, Dart, Firebase",
      experience: "4 years",
      location: "Sydney, Australia",
    },
    {
      title: "UI/UX Design",
      author: "Jake White",
      status: "Pending",
      skills: "Figma, Adobe XD",
      experience: "3 years",
      location: "Berlin, Germany",
      isActionable: true,
    },
    {
      title: "Audio Engineering",
      author: "Linda Blue",
      status: "Rejected",
      skills: "Pro Tools, Ableton",
      experience: "6 years",
      location: "Paris, France",
      reconsiderOption: true,
    },
  ]);

  const talentsPerPage = 6; // Number of talents per page (changed to 6)
  const totalPages = Math.ceil(talentsData.length / talentsPerPage);

  // Filtered talents based on search and selected filters
  const filteredTalents = talentsData.filter(talent => {
    const matchesSearch = talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          talent.skills.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || talent.skills.includes(categoryFilter);
    const matchesStatus = statusFilter === 'All Status' || talent.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const currentPageTalents = filteredTalents.slice(
    (currentPage - 1) * talentsPerPage, 
    currentPage * talentsPerPage
  );

  const handleAddTalent = () => {
    const newTalent = {
      title: "New Talent",
      author: "New Author",
      status: "Pending",
      skills: "New Skills",
      experience: "0 years",
      location: "Unknown",
      isActionable: true,
    };

    setTalentsData([...talentsData, newTalent]);
  };

  const handleApprove = (index) => {
    const newTalents = [...talentsData];
    newTalents[index].status = 'Approved';
    setTalentsData(newTalents);
  };

  const handleReject = (index) => {
    const newTalents = [...talentsData];
    newTalents[index].status = 'Rejected';
    setTalentsData(newTalents);
  };

  const handleReconsider = (index) => {
    const newTalents = [...talentsData];
    newTalents[index].status = 'Pending'; // Change rejected to pending on reconsider
    setTalentsData(newTalents);
  };

  return (
    <section id="talent-management" className="p-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg border border-neutral-200/30 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="search"
                placeholder="Search talents by name, category, or skill..."
                className="w-full pl-10 pr-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-neutral-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              className="px-4 py-2 border border-neutral-200/30 rounded-lg bg-white"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All Categories</option>
              <option>Programming</option>
              <option>Design</option>
              <option>Music</option>
              <option>Art</option>
            </select>
            <select
              className="px-4 py-2 border border-neutral-200/30 rounded-lg bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleAddTalent}
            >
              Add Talent
            </button>
          </div>
        </div>
      </div>

      {/* Talents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPageTalents.map((talent, index) => (
          <TalentCard
            key={index}
            index={index}
            {...talent}
            handleApprove={handleApprove}
            handleReject={handleReject}
            handleReconsider={handleReconsider}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-neutral-50"
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'border-neutral-200/30'} rounded-lg hover:bg-neutral-50`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-neutral-50"
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

const TalentCard = ({
  index,
  title,
  author,
  status,
  skills,
  experience,
  location,
  isActionable,
  reconsiderOption,
  handleApprove,
  handleReject,
  handleReconsider,
}) => {
  const statusColors = {
    Approved: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200/30 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-neutral-200"></div>
            <div className="ml-3">
              <h3 className="text-sm font-medium">{title}</h3>
              <p className="text-xs text-neutral-500">by {author}</p>
            </div>
          </div>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Skills:</span>
            <span>{skills}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Experience:</span>
            <span>{experience}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Location:</span>
            <span>{location}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <button className="px-3 py-1 text-sm border border-neutral-200/30 rounded-lg hover:bg-neutral-50">
            View Details
          </button>
          {status === 'Approved' && (
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 text-sm text-red-500 border border-red-500 rounded-lg hover:bg-red-50"
                onClick={() => handleReject(index)}
              >
                Reject
              </button>
            </div>
          )}
          {status === 'Pending' && (
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 text-sm text-green-500 border border-green-500 rounded-lg hover:bg-green-50"
                onClick={() => handleApprove(index)}
              >
                Approve
              </button>
              <button
                className="px-3 py-1 text-sm text-red-500 border border-red-500 rounded-lg hover:bg-red-50"
                onClick={() => handleReject(index)}
              >
                Reject
              </button>
            </div>
          )}
          {status === 'Rejected' && reconsiderOption && (
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50"
                onClick={() => handleReconsider(index)}
              >
                Reconsider
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TalentManagement;
