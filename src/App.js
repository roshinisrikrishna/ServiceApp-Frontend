import './App.css';
import {BrowserRouter, Routes, Route,HashRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import View from './pages/View';
import TravelLog from './pages/TravelLog';
import Login from './pages/Login';

function App() {
  return (
    <HashRouter basename='/ServiceApp-Frontend'>
    <div className="App">
    <ToastContainer position="top-center"/>
    <Routes>
    <Route exact path='/' element={<Login/>}/>
    <Route path='/users' element={<Home/>} />
    <Route path='/users/create' element={<AddUser/>}/>
    <Route path='/user/update/:id' element={<EditUser/>}/>
    <Route path='/user/get/:id' element={<View/>}/>
    <Route path='/travel/:id' element={<TravelLog/>}/>
    </Routes>
    </div>
    </HashRouter>
  );
}

export default App;
