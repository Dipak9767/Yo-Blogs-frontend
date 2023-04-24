import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Pages/Register';
import LogIn from './Pages/LogIn';
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import CreateBlog from './Pages/CreateBlog';
import AllBlogs from './Pages/AllBlogs';
import MyBlogs from './Pages/MyBlogs';
import { useSelector } from 'react-redux'
import SingleBlog from './Pages/SingleBlog';
import EditBlog from './Pages/EditBlog';

const AllRoutes = () => {
  const user = useSelector((state) => state.user);
  console.log(user)

  const NavBarHOC = () => {
    return (
      <>
        <NavBar />
        <Outlet />
      </>
    )
  }


  const IsAuth = () => {
    if (user.isAuth) {
      return (
        <Outlet />
      )
    } else {
      return <Navigate to="login" />;
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route element={<NavBarHOC />}>
          <Route path='/' element={<Home />} />
          <Route element={<IsAuth />}>
            <Route path='/all-blogs' element={<AllBlogs />} />
            <Route path='/my-blogs' element={<MyBlogs />} />
            <Route path='/create-blog' element={<CreateBlog />} />
            <Route path='/single-blog/:id' element={<SingleBlog />} />
            <Route path='/edit-blog/:id' element={<EditBlog />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default AllRoutes