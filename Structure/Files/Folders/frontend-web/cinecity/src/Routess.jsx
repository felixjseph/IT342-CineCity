
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
                    <Route path="home" element={<Home />} />
                </Route>
                <Route element={<ProtectedRouteAdmin />}>
                    <Route path="/admin" element={<SideBar />}>
                        <Route path="movies" element={<Movies />} />
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}