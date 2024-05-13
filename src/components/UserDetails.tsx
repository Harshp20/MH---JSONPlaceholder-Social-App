import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { JSONPlaceholderContext } from '../contexts/JSONPlaceholder'
import { toast } from 'react-toastify'
import CardSkeleton from './skeletons/CardSkeleton'
import BackButton from './BackButton'
import PostList from './PostList'
import TodoList from './TodosList'

const UserDetails = () => {
  const { id } = useParams()
  const { setIsError, setIsLoading, currentUser, getUserById } = useContext(JSONPlaceholderContext)

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    toast.promise(getUserById(parseInt(id as string)),
      {
        error: {
          render() {
            return 'Couldn\'t fetch the user'
          },
        }
      })
  }, [id]);

  return (
    <section className='w-full self-start flex flex-col gap-4 p-4'>
      <div className='self-center'>
        <div className="mb-6">
          <BackButton />
        </div>
        {currentUser ?
        <div className="max-w-max mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6">
          <div className="flex gap-8 items-center mb-6 flex-wrap">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={currentUser.photo} alt="Bonnie image"/>
            <div>
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">{currentUser.name}</h5>
              <span className="text-sm font-semibold dark:font-normal text-blue-700 dark:text-blue-500 lowercase">@{currentUser.username}</span>
            </div>
            <div className="flex items-center gap-4 md:mt-6">
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                <a href="#" className="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Company:</span>
              <span className="text-sm text-black dark:text-white">{currentUser.company.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
              <a className="text-sm text-orange-400 lowercase" href={`mailto:${currentUser.email}`}>{currentUser.email}</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
              <a className="text-sm text-black dark:text-white" href={`tel:+${currentUser.phone.split(' ')[0]}`}>+{currentUser.phone.split(' ')[0]}</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">From:</span>
              <span className="text-sm text-black dark:text-white">{currentUser.address.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Website:</span>
              <a className="text-sm text-blue-700 visited:text-purple-500" target='_blank' href={`https://${currentUser.website}`}>{currentUser.website}</a>
            </div>
          </div>
        </div>
       :
      /* Render loading skeleton */
       <CardSkeleton />}
       </div>
      <div className="flex flex-col w-full justify-center items-stretch md:flex-row items gap-8">
        {currentUser && <PostList userId={parseInt(id as string)} />}
        {currentUser && <TodoList userId={parseInt(id as string)} />}
      </div>
    </section>
  );
}

export default UserDetails;
