const ContentModeration = () => {
  return (
    <div id="root">
      <section id="content-moderation" className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-8">Content Moderation</h2>

          {/* Content Review Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
              <h3 className="text-xl font-semibold mb-4">Pending Review</h3>
              <div className="space-y-4">
                {/* Content Review Card */}
                <div className="bg-gray-200/80 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">User: John Doe</span>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 bg-gray-300 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">Media Content</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-3">Description: This content needs review for community guidelines compliance.</p>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm text-white">Approve</button>
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm text-white">Reject</button>
                        <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm text-white">Flag</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flagged Content Section */}
            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
              <h3 className="text-xl font-semibold mb-4">Flagged Content</h3>
              <div className="space-y-4">
                {/* Flagged Content Item */}
                <div className="bg-red-100/80 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-red-600">Reported by: Multiple Users</span>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                  <p className="text-sm mb-3">Violation Type: Inappropriate Content</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded text-sm text-white">Review</button>
                      <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm text-white">Remove</button>
                    </div>
                    <span className="text-xs bg-red-500/20 text-red-600 px-2 py-1 rounded">High Priority</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Moderation Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
              <h4 className="text-lg font-semibold mb-2">Pending Reviews</h4>
              <p className="text-3xl font-bold text-blue-500">24</p>
              <p className="text-sm text-gray-500 mt-1">Last 24 hours</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
              <h4 className="text-lg font-semibold mb-2">Flagged Content</h4>
              <p className="text-3xl font-bold text-red-500">12</p>
              <p className="text-sm text-gray-500 mt-1">Requires attention</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
              <h4 className="text-lg font-semibold mb-2">Processed Today</h4>
              <p className="text-3xl font-bold text-green-500">45</p>
              <p className="text-sm text-gray-500 mt-1">Content items reviewed</p>
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
            <h3 className="text-xl font-semibold mb-4">Community Guidelines</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-200/70 rounded">
                <span>Hate Speech & Harassment</span>
                <button className="text-sm text-blue-500 hover:text-blue-400">View Details</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-200/70 rounded">
                <span>Explicit Content</span>
                <button className="text-sm text-blue-500 hover:text-blue-400">View Details</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-200/70 rounded">
                <span>Copyright Violations</span>
                <button className="text-sm text-blue-500 hover:text-blue-400">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentModeration;
