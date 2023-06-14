import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./components/Home"
import Menu from "./components/Menu"
import Admin from "./components/Admin"




function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
