import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

function AppRoutes() {
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/cadastro" element={<Cadastro />}></Route>
        <Route path="/home" element={<Home />}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes