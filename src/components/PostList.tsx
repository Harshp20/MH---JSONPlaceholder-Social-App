import { useContext, useEffect, useState } from "react";
import { JSONPlaceholderContext } from "../contexts/JSONPlaceholder";
import { toast } from 'react-toastify'
import Pagination from "./Pagination";
import Post from "./Post";
import PostListSkeleton from "./skeletons/PostListSkeleton";
import Error from "./Error";
import { PostListProps } from "../types";

const UserList = ({ userId }: PostListProps) => {
  const { isError, setIsError, currentUser, postList, getPostsByPage, setCurrentPost, isLoading } = useContext(JSONPlaceholderContext)
  const [page, setPage] = useState(0)

  useEffect(() => {
    setCurrentPost(null)
    setIsError(false)
    if (userId) {
      toast.promise(getPostsByPage(page, userId),
      {
        error: {
          render() {
            return 'Couldn\'t fetch posts'
          }, 
          hideProgressBar: true
        }
      })
    } else {
      toast.promise(getPostsByPage(page),
      {
        error: {
          render() {
            return 'Couldn\'t fetch posts'
          }, 
          hideProgressBar: true
        }
      })
    }
  }, [page])

  const goToPrevPage = () => {
    if (page > 0) setPage((prevPage) => prevPage - 5);
  };

  const goToNextPage = () => {
    if (page < 95) setPage((prevPage) => prevPage + 5);
  };

  return (
    <section className="self-start flex flex-col items-center gap-4">
      {!isLoading && postList ?
        <div className="max-w-[80vw] md:max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="mb-4">
            <span className="text-xl font-bold leading-none text-gray-900 dark:text-white">{userId ? `${currentUser.name}'s` : 'All'} </span>
            <span className="text-xl font-bold leading-none text-gray-900 dark:text-white">Posts</span>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {postList.map((postData: any) => <Post key={postData.id} postData={postData} />)}
            </ul>
          </div>
        </div> : (isError ? <Error /> : <PostListSkeleton />)}
      {!isError && <Pagination userId={userId || 0} page={page} goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} />} 
    </section>
  );
}

export default UserList;
