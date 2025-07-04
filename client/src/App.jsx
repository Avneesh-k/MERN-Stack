import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from "./Components/Header"
import PrivateRoute from "./Components/PrivateRoute"
import CreateListing from "./pages/CreateListing"




export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-listing" element={<CreateListing/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}
