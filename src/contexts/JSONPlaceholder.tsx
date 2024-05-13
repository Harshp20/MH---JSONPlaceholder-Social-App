import axios from "axios";
import { createContext, useState } from "react";
import { generateRandomNumber } from "../utils/generateRandNum";
import { TJSONPlaceholderContext, TChildren } from '../types'

export const JSONPlaceholderContext = createContext({} as TJSONPlaceholderContext)

const JSONPlaceholderProvider = ({ children }: TChildren) => {
  const [userList, setUserList] = useState<null | any>(null)
  const [currentUser, setCurrentUser] = useState<null | any>(null)
  const [currentPost, setCurrentPost] = useState<null | any>(null)
  const [commentsStats, setCommentsStats] = useState<null | any>(null)
  const [postStats, setPostStats] = useState<null | any>(null)
  const [postList, setPostList] = useState<null | any>(null)
  const [todoList, setTodoList] = useState<null | any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [todoListIsLoading, setTodoListIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState('dashboard')
  
  const baseURL = 'https://jsonplaceholder.typicode.com';

  const getUsers = () => {
    setIsLoading(true)
    return new Promise(async (resolve, reject) => {
      try {
        let { data } = await axios.get(`${baseURL}/users`)
        if(data) {
          const photos = await axios.get(`${baseURL}/photos`)
          data = data.map((user : any) =>({ ...user, photo: photos.data[user.id - 1].url }))
        }
        setTimeout(() => {
          resolve(setUserList(data))
          setIsLoading(false)
        }, 1500)
      } catch (err) {
        reject()
        setIsError(true)
        setIsLoading(false)
      }
    })
  }

  const getUserById = (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`${baseURL}/users/${id}`)
        if(data) {
          const photo = await axios.get(`${baseURL}/photos/${id}`)
          setTimeout(() => {
            setCurrentUser({ ...data, photo: photo.data.url})
            resolve('Success')
            setIsLoading(false)
          }, 1500)
        }
      } catch (err) {
        reject()
        setIsError(true)
        setIsLoading(false)
      }
    })
  }
  
  const searchUserByFullName = (name: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`${baseURL}/users?name=${name}`)
        
        if(!data.length) {
          resolve(null)
          setIsLoading(false)
        }
        
        resolve(data[0].id)
      } catch (err) {
        reject()
        setIsError(true)
        setIsLoading(false)
      }
    })
  }

  const getComments = () => {
    setIsLoading(true)
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`${baseURL}/comments`);

        const commentsMapping = data.reduce((acc: any, curr: any) => {
          if (!acc[curr.postId]) acc[curr.postId] = [1];

          acc[curr.postId]++;

          return acc;
        }, {});

        let commentsData: any = [];
        for (const comment in commentsMapping) {
          commentsData.push({
            postId: comment,
            comments: commentsMapping[comment],
            postsLine: generateRandomNumber()
          });
        }
        setTimeout(() => {
          setCommentsStats(commentsData)
          resolve('Success')
          setIsLoading(false)
        }, 1250)
      } catch (err) {
        reject()
        setIsError(true)
        setIsLoading(false)
      }
    })
  }

  const getAllPosts = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`${baseURL}/posts`);

        const commentsMapping = data.reduce((acc: any, curr: any) => {
          if (!acc[curr.userId]) acc[curr.userId] = [1];

          acc[curr.userId]++;

          return acc;
        }, {});

        let commentsData: any = [];
        for (const post in commentsMapping) {
          commentsData.push({
            userId: post,
            posts: commentsMapping[post],
            postsLine: generateRandomNumber()
          });
        }
        setTimeout(() => {
          setPostStats(commentsData)
          resolve('Success')
          setIsLoading(false)
        }, 1250)
      } catch (err) {
        reject()
        setIsLoading(false)
        setIsError(true)
      }
    })
  }

  const getPostsByPage = (page: number, userId?: number, limit: number = 5) => {
    setIsLoading(true)
    return new Promise(async (resolve, reject) => {
      try {
        let postData: any = null;
        if (userId) {
          const { data } = await axios.get(`${baseURL}/posts?userId=${userId}&_start=${page}&_limit=${limit}`);
          
          if (!data) {
            setIsLoading(false)
            throw new Error
          }

          postData = data
          } else {
          const { data } = await axios.get(`${baseURL}/posts?_start=${page}&_limit=${limit}`);
          
          if (!data) {
            setIsLoading(false)
            throw new Error
          }
          
          postData = data
        }
        setTimeout(() => {
          setPostList(postData);
          resolve('Success')
          setIsLoading(false)
        }, 500)
      } catch (err) {
        reject()
        setIsError(true)
        setIsLoading(false)
      }
    })
  }

  const getTodosByUser = (page: number, userId: number, limit: number = 5) => {
    setTodoListIsLoading(true)
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`${baseURL}/todos?userId=${userId}&_start=${page}&_limit=${limit}`);
        
        if (!data) {
          setTodoListIsLoading(false)
          throw new Error
        }
        setTimeout(() => {
          setTodoList(data);
          resolve('Success')
          setTodoListIsLoading(false)
        }, 500)
      } catch (err) {
        reject()
        setIsError(true)
        setTodoListIsLoading(false)
      }
    })
  }
  
  const getPostById = (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(
          `${baseURL}/posts/${id}`
        );

        if (data) {
          const { data: commentsData } = await axios.get(
            `${baseURL}/posts/${id}/comments`
          );

          if (commentsData) {
            const res = await getUserById(data.userId)
            if (res)
            setTimeout(() => {
              setCurrentPost({ ...data, comments: commentsData})
              resolve('Success')
              setIsLoading(false)
            }, 500)
          }
        }
      } catch (err) {
        reject()
        setIsError(true)
        setIsLoading(false)
      }
    })
  }

  return (
    <JSONPlaceholderContext.Provider value={{ todoList, getTodosByUser, todoListIsLoading, setTodoListIsLoading, setCurrentPage, isLoading, isError, setIsError, currentPage, setIsLoading, currentPost, getPostById, postList, getPostsByPage, getAllPosts, setCurrentPost, postStats, commentsStats, setCommentsStats, getComments, searchUserByFullName, setCurrentUser, currentUser, getUsers, userList, getUserById }}>
      {children}
    </JSONPlaceholderContext.Provider>
  );
}

export default JSONPlaceholderProvider;
