import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  Bar,
  Line,
  ResponsiveContainer,
} from "recharts";
import { JSONPlaceholderContext } from "../contexts/JSONPlaceholder";
import GraphSkeleton from "./skeletons/GraphSkeleton";
import FilterButton from "./FilterButton";
import Error from "./Error";

const Dashboard = () => {
  const { setIsError, isError, commentsStats, getComments, postStats, getAllPosts } = useContext(JSONPlaceholderContext)
  const [filter, setFilter] = useState(true)

  useEffect(() => {
    if (!(commentsStats && postStats)) {
      setIsError(false)
      toast.promise(Promise.all([getComments(), getAllPosts()]),
        {
          pending: 'Loading Stats...',
          success: {
            render () {
              return 'Success!'
            }
          },
          error: {
            render() {
              return 'Couldn\'t fetch stats'
            },
          }
        }, { hideProgressBar: false })
      }
  }, [])

  const toggleFilter = () => {
    setFilter(prevState => !prevState)
  }

  return (
    <div className="w-full mt-6 md:mt-14 self-baseline sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%]">
      {(commentsStats && postStats) ?
      <>
        <div className="mr-5 md:mr-10">
          <FilterButton filter={filter} toggleFilter={toggleFilter} />
        </div>
        {filter ? <ResponsiveContainer className="self-start max-h-[200px] -ml-5 md:-ml-10 sm:max-h-[300px] md:max-h-[350px] lg:max-h-[400px]  ">
          <ComposedChart data={commentsStats} >
            <XAxis dataKey="postId" />
            <YAxis dataKey="comments" />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#555" />
            <Area type="monotone" dataKey="postsLine" name="PostId" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="comments" name={'Comments'} barSize={20} fill="#413ea0" />
            <Line type="monotone" dot={false} dataKey="postsLine" name="Posts line" stroke="#ff7300" />
          </ComposedChart>
          <p className="text-gray-200 ml-10 text-sm md:text-base m-auto text-center">Avergage Comments / Post</p>
          <p className="text-gray-500 ml-10 text-sm md:text-base m-auto text-center">(Showing data for all 100 Posts)</p>
        </ResponsiveContainer>
        :
        <ResponsiveContainer className="self-start max-h-[200px] -ml-5 md:-ml-10 sm:max-h-[300px] md:max-h-[350px] lg:max-h-[400px] ">
          <ComposedChart data={postStats}>
            <XAxis dataKey="userId" />
            <YAxis dataKey="posts" />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#555" />
            <Area type="monotone" dataKey="postsLine" name="UserId" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="posts" name={'Posts'} barSize={20} fill="#413ea0" />
            <Line type="monotone" dot={false} dataKey="postsLine" name="Posts line" stroke="#ff7300" />
          </ComposedChart>
          <p className="text-gray-200 ml-10 text-sm md:text-base m-auto text-center">Avergage Comments / User (by Post)</p>
          <p className="text-gray-500 ml-10 text-sm md:text-base m-auto text-center">(Showing data for all 10 Users)</p>
        </ResponsiveContainer>}
      </> : (isError ? <Error /> : <GraphSkeleton />)}
    </div>
  );
};

export default Dashboard;