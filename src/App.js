import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import {Routes,Route} from 'react-router-dom'
import SignUpPage from './pages/SignUpPage/SignUpPage';
import UserDashboard from './pages/userDashboard/UserDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDasboard from './pages/AdminDashboard/AdminDasboard';


function App() {
  return (
    <div>
    <Routes>
      <Route path='/*' element={<Home/>}/>
      <Route path='/LoginPage' element={<LoginPage/>}/>
      <Route path='/SignUpPage' element={<SignUpPage/>}/>
      <Route path='/UserDashboard/*' element={<UserDashboard />} />


      <Route path='/AdminLogin' element={<AdminLogin/>}/>
      <Route path='/AdminDashboard/*' element={<AdminDasboard/>}/>
    </Routes>
    </div>
  );
}

export default App;
