import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { JSONPlaceholderContext } from '../contexts/JSONPlaceholder'
import { toast } from 'react-toastify'
import BackButton from './BackButton'
import PostDetailSkeleton from './skeletons/PostDetailSkeleton'
import Error from './Error'

const UserDetails = () => {
  const { id } = useParams()
  const { isError, setIsError, currentUser, currentPost, getPostById } = useContext(JSONPlaceholderContext)

  useEffect(() => {
    setIsError(false)
    toast.promise(getPostById(parseInt(id as string)),
      {
        error: {
          render() {
            return 'Couldn\'t fetch the post'
          },
        }
      })
  }, [id]);

  return (
    <section className='w-full self-start md:w-3/5 flex flex-col items-center'>
      <div className="mb-6 self-start">
        <BackButton />
      </div>
      {currentPost ?
      <div className="max-w-max bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
        <div className="flex gap-4 items-center mb-6 flex-wrap">
          
          {/* Post Illustration */}
          <div className="w-full h-36 rounded-t shadow-lg bg-slate-800 dark:bg-slate-900" />

          {/* Post author's username, post title and text  */}
          <div>
            <p className='text-sm font-semibold dark:font-normal text-blue-700 dark:text-blue-500 lowercase'>@{currentUser.username || 'martha'}</p>
            <p className="text-sm text-gray-800 dark:text-gray-500">{currentPost.title}</p>
            <p className="text-sm dark:text-white text-gray-800">{currentPost.body}</p>
          </div>

          {/* Comments on Post */}
          <div className="mt-2">
            <p className='dark:text-white text-slate-900 font-semibold text-lg md:text-xl'>Comments</p>
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentPost.comments.map((comment: any) =>
              <li key={currentPost.id} className='py-3 sm:py-4"'>
                <p className='text-sm font-semibold dark:font-normal text-blue-700 dark:text-blue-500 lowercase'>{comment.email}</p>
                <p className="text-sm dark:text-white text-gray-800">{comment.body}</p>
              </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      : (isError ? <Error /> : <PostDetailSkeleton />)
      // Render loading skeleton
      }
    </section>
  );
}

export default UserDetails;
