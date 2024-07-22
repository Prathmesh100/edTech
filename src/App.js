import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Navbar from './components/common/Navbar'
import ForgotPassword from './Pages/ForgotPassword'
import UpdatePassword from './Pages/UpdatePassword'
import VerifyEmail from './Pages/VerifyEmail'
import AboutUs from './Pages/AboutUs'
import Dashboard from './Pages/Dashboard'
import MyProfile from './components/core/Dashboard/MyProfile'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Error from './Pages/Error'
import Settings from './components/core/Dashboard/Settings'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import Cart from './components/core/Dashboard/Cart'
import { ACCOUNT_TYPE } from './utils/constants'
import { useSelector } from 'react-redux'
import AddCourse from './components/core/Dashboard/AddCourse'
import Contact from './Pages/Contact'
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import ViewCourse from './Pages/ViewCourse'
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import CourseDetails from './Pages/CourseDetails'
import Catalog from './Pages/Catalog'
function App() {
  const {user}=useSelector((state)=>state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/login/forgot-password" element={<ForgotPassword/>} />
        <Route path="/login/update-password/:id" element={<UpdatePassword/>} />
        <Route path="/verify-email" element={<VerifyEmail/>} />
        <Route path="/about" element={<AboutUs/>} /> 
        <Route path="/contact" element={<Contact/>} />
        <Route path="courses/:courseId" element={<CourseDetails/>} />
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
          >
        <Route path="/dashboard/my-profile" element={<MyProfile/>} />
        <Route path="/dashboard/settings" element={<Settings/>} />
        

         {
          user?.accountType=== ACCOUNT_TYPE.STUDENT && (
            <>
            <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>} />
            <Route path='/dashboard/cart' element={<Cart/>} />
            </>
          )
         } 
        {
          user?.accountType=== ACCOUNT_TYPE.INSTRUCTOR && (
            <>
            <Route path='/dashboard/add-course' element={<AddCourse/>} />
            <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element={<MyCourses/>} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
            </>
          )
         } 
          </Route>
          <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>
        <Route path='*' element={<Error/>}/>


      </Routes>
    </div>
  )
}

export default App