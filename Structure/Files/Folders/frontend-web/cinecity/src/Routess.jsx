
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

export default function Routess() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navbar />}>
                    <Route path="home" element={<Home />}></Route>
                    <Route path="movie" element={<Movie />}></Route>
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="home" element={<Home />} />
                </Route>
                <Route element={<ProtectedRouteAdmin />}>
                    <Route path="/admin" element={<SideBar />}>
                        <Route path="movies" element={<Movies />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="cinemas" element={<Cinemas/>}/>
                        <Route path="showtimes" element={<Showtime/>}/>
                        <Route path="genres" element={<Genres/>}/>
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}