import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SenderPage from './pages/SenderPage';
import ReceiverPage from './pages/ReceiverPage';
import PredictFoodWastage from './pages/PredictFoodWastage';
import Dashboard from './pages/Dashboard';
function App() {


  return (
    <>
      
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />}/> 
          <Route path="/sender" element={<SenderPage />}/> 
          <Route path="/receiver" element={<ReceiverPage />}/> 
          <Route path="/predict" element={<PredictFoodWastage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App
