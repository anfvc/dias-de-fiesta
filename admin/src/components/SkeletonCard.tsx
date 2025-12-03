const SkeletonCard = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 h-36 animate-pulse">
      <div className="flex items-center space-x-4 h-full">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-100 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
