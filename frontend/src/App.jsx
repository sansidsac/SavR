import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SenderPage from './pages/SenderPage';
import ReceiverPage from './pages/ReceiverPage';
function App() {


  return (
    <>
      
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />}/> 
          <Route path="/sender" element={<SenderPage />}/> 
          <Route path="/receiver" element={<ReceiverPage />}/>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
