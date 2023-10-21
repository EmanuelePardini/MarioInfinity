import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../../App.css";
import { useSelector } from "react-redux";
import  Login  from "../../pages/Login/Login";
import  Logout  from "../../pages/Logout/Logout";
import Register from "../../pages/Register/Register"; 
import  Ranked  from "../../pages/Ranked/Ranked";
import { Bowser, Terrain, Island, Mario, Obstacles, Sun, KeyMessage, LoadingScreen, Score, MobileControls, Footer } from "../../components";

function Home() {
    const isPlay = useSelector((state) => state.engine.play);
    return (
        <>
            <div className="App">
                <Bowser />
                <Island />
                <Sun />
                {!isPlay && <KeyMessage /> }
                {isPlay && <Obstacles /> }
                <Terrain />         
                <Mario />
                
                <Score />    
            </div>
            <Footer />
            <MobileControls />
            
        </>
    );
}

function AppRoutes() {
    const isLoading = useSelector((state) => state.engine.loadingScreen);
    return (
        <BrowserRouter>
            {isLoading && <LoadingScreen />}
            <Routes>
                <Route path="/MarioInfinity" element={<Home />} />
                <Route path="/MarioInfinity/login" element={<Login />} />
                <Route path="/MarioInfinity/register" element={<Register />} />
                <Route path="/MarioInfinity/ranks" element={<Ranked />} />
                <Route path="/MarioInfinity/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
