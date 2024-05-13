const TodoListSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 justify-evenly animate-skeleton md:p-[.5rem] w-[80vw] md:w-screen md:max-w-md">
      <div className="h-6 md:h-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[80%] mb-2"></div>
      <div className="h-4 md:h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-4 md:h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-4 md:h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-3 md:h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-3 md:h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    </div>
  );
}

export default TodoListSkeleton;
