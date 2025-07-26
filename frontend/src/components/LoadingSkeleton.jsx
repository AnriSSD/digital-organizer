const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-200 rounded"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="flex space-x-2 mt-3">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 rounded-full w-14"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton; 