export type TChildren = {
  children: React.ReactNode
}

export type TJSONPlaceholderContext = {
  getUsers: () => Promise<any>
  getUserById: (id: number) => Promise<any>
  getComments: () => Promise<any>
  getAllPosts: () => Promise<any>
  getPostById: (id: number) => Promise<any>
  searchUserByFullName: (name: string) => Promise<any>
  setCurrentUser: React.Dispatch<any>
  commentsStats: null | any
  postStats: null | any
  setCommentsStats: React.Dispatch<any>
  userList: null | any
  currentUser: any
  postList: null | any
  getPostsByPage: (page: number, signal: AbortSignal, limit?: number) => Promise<any>
  todoList: null | any
  getTodosByUser: (page: number, userId: number, signal: AbortSignal, limit?: number) => Promise<any>
  setCurrentPost: React.Dispatch<any>
  isLoading: boolean
  setIsLoading: React.Dispatch<boolean>
  todoListIsLoading: boolean
  setTodoListIsLoading: React.Dispatch<boolean>
  isError: boolean
  setIsError: React.Dispatch<boolean>
  currentPost: any
  currentPage: string
  setCurrentPage: React.Dispatch<string>
}

export type PaginationProps = {
  goToPrevPage: () => void
  goToNextPage: () => void
  page: number
  userId: number
}

export type TNavbar = { dark: boolean, darkModeHandler: () => void }

export type FilterButtonIconProps = { title: string, toggleFilter: () => void }

export type TPost = {
  postData: any
};

export type PostListProps = { userId?: number }

export type TodoProps = {
  todoData: any
};

export type TodoListProps = { userId: number }

export type TUser = {
  userData: any
};

export type UserListPaginationProps = {
  setPage: React.Dispatch<React.SetStateAction<string>>
  page: string
}