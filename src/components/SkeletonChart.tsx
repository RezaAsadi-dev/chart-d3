function SkeletonChart() {
  return (
    <div className="animate-pulse p-4 bg-white rounded-lg shadow-md max-w-3xl mx-auto mb-8">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="h-48 bg-gray-200 rounded"></div>
    </div>
  );
}
export default SkeletonChart;
