import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import Navbar from "./components/NavBar/NavBar";
import Dashboard from "./components/Dashboard";
import UserDetails from "./components/UserDetails";
import PostDetails from "./components/PostDetails";
import Error from "./components/Error";

function App() {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  }

  return (
    <>
      <Navbar dark={dark} darkModeHandler={darkModeHandler} />
      <main className="grid place-items-center p-6 min-h-screen">
        <Routes>
          <Route element={<Dashboard></Dashboard>} path={'/'} />
          <Route element={<UserList></UserList>} path={'/users'} />
          <Route element={<UserDetails></UserDetails>} path={'/user/:id'} />
          <Route element={<PostDetails></PostDetails>} path={'/post/:id'} />
          <Route element={<PostList></PostList>} path={'/posts'} />
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
