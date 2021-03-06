import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dahsboard from './pages/Dashboard';
import Register from './pages/Register';
import Header from './components/Header';




function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element= {<Dahsboard/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Routes>
        </div>
      </Router>
    </>    
  );
}

export default App;
