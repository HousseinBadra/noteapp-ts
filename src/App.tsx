import './App.css'
import {
  Route,
  Link,
  Routes
} from "react-router-dom";
import Home from './pages/Home';
import CreateNote from './Components/CreateNote';
import NoteView from './Components/NoteView';
import Edit from './Components/Edit';
function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route element={<Home/>} path='/' ></Route>
        <Route element={<CreateNote/>} path='/createNote'></Route>
        <Route element={<NoteView/>} path='/note/:noteid'></Route>
        <Route element={<Edit/>} path='/edit/:id'></Route>


      </Routes>
      
    </div>
  )
}

export default App
