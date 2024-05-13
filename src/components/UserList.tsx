import { useContext, useEffect, useState } from "react";
import { JSONPlaceholderContext } from "../contexts/JSONPlaceholder";
import { toast } from 'react-toastify'
import UserListPagination from "./UserListPagination";
import PostListSkeleton from "./skeletons/PostListSkeleton";
import Error from "./Error";
import User from "./User";

const UserList = () => {
  const { isError, setIsError, userList, getUsers, setCurrentUser } = useContext(JSONPlaceholderContext)
  const [page, setPage] = useState('prev')
  const [users, setUsers] = useState<null | any>()

  useEffect(() => {
    if (userList) {
      if(page === 'next') setUsers(userList.slice(5))
      else if(page === 'all') setUsers(userList)
      else setUsers(userList.slice(0, 5))
    }
  }, [page, userList])

  useEffect(() => {
    setCurrentUser(null)
    setIsError(false)
    if(!userList) {
      toast.promise(getUsers,
      {
        pending: 'Loading users...',
        success: {
          render () {
            return 'Success!'
          }
        },
        error: {
          render() {
            return 'Couldn\'t fetch users'
          },
        }
      })
    }
  }, [])

  return (
    <section className="self-start w-full flex flex-col items-center gap-4">
      {users ? 
        <>
          <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Users</h5>
              {page !== 'all' && <a href="#" onClick={() => setPage('all')} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                  View all
              </a>}
              {page === 'all' && <a href="#" onClick={() => setPage('less')} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                  View less
              </a>}
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((userData: any) => <User key={userData.name} userData={userData} />)}
              </ul>
            </div>
          </div>
          <UserListPagination setPage={setPage} page={page} />
        </> : (isError ? <Error />: <PostListSkeleton />)
      }
    </section>
  );
}

export default UserList;
