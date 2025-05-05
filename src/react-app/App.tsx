// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Video_page from './pages/video_page';
import Home_page from './pages/home_page';
import About_page from './pages/about_page';
import Contact_page from './pages/contact_page';
import Player_page from './pages/player_page';
import "./style/tailwind.css";
import "./style/text.css"
import "./App.css";
import Header from "./components/header";
function App() {


  return (
    <>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Video_page />} />
        <Route path="/home" element={<Home_page />} />
        <Route path="/video/:id" element={<Player_page />} />
        <Route path="/video" element={<Video_page />} />
        <Route path="/about" element={<About_page />} />
        <Route path="/contact" element={<Contact_page />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
