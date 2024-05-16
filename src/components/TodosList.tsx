import { useContext, useEffect, useState } from "react";
import { JSONPlaceholderContext } from "../contexts/JSONPlaceholder";
import { toast } from 'react-toastify'
import Pagination from "./Pagination";
import Error from "./Error";
import Todo from "./Todo";
import TodoListSkeleton from "./skeletons/TodoListSkeleton";
import { TodoListProps } from "../types";

const TodoList = ({ userId }: TodoListProps) => {
  const { todoListIsLoading, isError, setIsError, currentUser, todoList, getTodosByUser } = useContext(JSONPlaceholderContext)
  const [page, setPage] = useState(0)

  useEffect(() => {
    setIsError(false)
    const controller = new AbortController()
    const signal = controller.signal
    toast.promise(getTodosByUser(page, userId, signal),
    {
      error: {
        render() {
          return 'Couldn\'t fetch the Todo list'
        }, 
        hideProgressBar: true
      }
    })

    return () => {
      controller.abort()
    }
  }, [page])

  const goToPrevPage = () => {
    if (page > 0) setPage((prevPage) => prevPage - 5);
  };

  const goToNextPage = () => {
    if (page < 195) setPage((prevPage) => prevPage + 5);
  };

  return (
    <section className="self-start flex flex-col items-center gap-4">
      {!todoListIsLoading && todoList ?
        <div className="max-w-[80vw] md:max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="mb-4">
            <span className="text-xl font-bold leading-none text-gray-900 dark:text-white">{currentUser.name}'s Todo list</span>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {todoList.map((todoData: any) => <Todo key={todoData.id} todoData={todoData} />)}
            </ul>
          </div>
        </div> : (isError ? <Error /> : <TodoListSkeleton />)}
      {!isError && <Pagination userId={userId || 0} page={page} goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} />} 
    </section>
  );
}

export default TodoList;
