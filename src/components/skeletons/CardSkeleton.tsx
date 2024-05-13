const CardSkeleton = () => {
  return (
    <div role="status" className="flex flex-col gap-4 justify-center animate-skeleton w-[80vw] md:w-[40vw]">
      <div className="h-24 bg-gray-200 rounded-full dark:bg-gray-700 w-[100px] mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[70%] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
    </div>
  );
};

export default CardSkeleton;
