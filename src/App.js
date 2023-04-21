
import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import CityList from "./pages/CityList";
import News from './pages/News';
import HouseList from './pages/HouseList'
import Index from './pages/Index';
import Profile from './pages/Profile';
import Map from './pages/Map';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="/home" />} />
        <Route path="/home/*" element={<Home />} >
          <Route path='' element={<Index />} />
          <Route path='list' element={<HouseList />} />
          <Route path='news' element={<News />} />
          <Route path='profile' element={< Profile />} />
        </Route>

        <Route path="/citylist" element={<CityList />} />
        <Route path="/map" element={<Map />} />

      </Routes>
    </BrowserRouter>
  );
}