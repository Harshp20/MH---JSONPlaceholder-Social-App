const GraphSkeleton = () => {
  return (
    <div role="status" className="w-[90%] md:w-[90%] ml-5 flex flex-col items-center gap-4 justify-start animate-skeleton">
      <div className="w-full">
        <div className="h-[18vh] md:h-[40vh] bg-gray-500 rounded-md dark:bg-gray-700 mb-2.5"></div>
      </div>
    </div>
  );
}

export default GraphSkeleton;
