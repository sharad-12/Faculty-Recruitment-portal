
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Profile from './pages/profile'
import Application from './pages/application';
import Qualification from './pages/qualification';
import Experience from './pages/experience'
import Reference from './pages/reference'
import ChangePassword from './pages/forgetpass'
import Main from './pages/main';
import Final from './pages/final'
import Otp from './pages/confirmotp'
import GetEmail from './pages/getemail'
function App() {
  useEffect(() => {
    window.addEventListener('beforeunload', async () => {
      localStorage.clear();
    });
  }, []);
  
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/register" element ={<Registration/>}/>
        <Route path="/profile" element ={<Profile/>}/>
        <Route path="/application" element ={<Application/>}/>
        <Route path="/qualification" element ={<Qualification/>}/>
        <Route path="/experience" element ={<Experience/>}/>
        <Route path="/reference" element ={<Reference/>}/>
        <Route path="/changepassword" element ={<ChangePassword/>}/>
        <Route path='/confirmotp' element={<Otp/>}/>
        <Route path='/getemail' element={<GetEmail/>}/>
        <Route path='/final' element={<Final/>}></Route>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
