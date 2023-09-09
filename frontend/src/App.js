import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Create from "./components/Create";
import Update from "./components/Update";
import Navbar from "./components/Navbar";
import DisplayAll from "./components/DisplayAll"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
        <Routes>
            <Route exact path = '/read' element = {<DisplayAll/>}></Route>
            <Route exact path = '/:id' element = {<Update/>}></Route>
            <Route exact path = '/register' element = {<Create/>}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
