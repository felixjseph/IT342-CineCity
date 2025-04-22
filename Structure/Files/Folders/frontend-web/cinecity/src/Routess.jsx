
import { Router, Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Login and Register/Login'
import Signup from "./pages/Login and Register/Signup"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Movies from "./pages/Admin/Movies/Movies"
import Movie from "./pages/Movie/Movie"
import ProtectedRoute from "./components/Protected/ProtectedRoute"
import PublicRoute from "./components/Protected/PublicRoute";
import SideBar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import ProtectedRouteAdmin from "./components/Protected/ProtectedRouteAdmin"
import Cinemas from "./pages/Admin/Cinemas/Cinemas"
import Showtime from "./pages/Admin/Showtime/Showtime"
import Genres from "./pages/Admin/Genres/Genre"
import MovieDetails from "./pages/Movie/MovieDetails";
import Profile from "./pages/Admin/Profile/Profile"
import SeatSelection from "./pages/Seat/SeatSelection"
import UserProfile from "./pages/Profile/userProfile"
import NewLogin from "./pages/Login and Register/NewLogin"
import Register from "./pages/Login and Register/Register"
import NavBarNew from "./components/Navbar/NavBarNew"

export default function Routess() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/newlogin" element={<NewLogin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<NavBarNew/>}>
                    <Route path="home" element={<Home />}></Route>
                    <Route path="movies" element={<Movie />}></Route>
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="home" element={<Home />} />
                    <Route path="seat" element={<SeatSelection />}/>
                    <Route path="account" element={<UserProfile />}/>
                </Route>
                <Route element={<ProtectedRouteAdmin />}>
                    <Route path="/admin" element={<SideBar />}>
                        <Route path="movies" element={<Movies />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="cinemas" element={<Cinemas/>}/>
                        <Route path="showtimes" element={<Showtime/>}/>
                        <Route path="genres" element={<Genres/>}/>
                        <Route path="profile" element={<Profile/>}/>
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}