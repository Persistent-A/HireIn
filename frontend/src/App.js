import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Importing components
import Header from "./components/Header"
// import Main from "./components/Main"
import Footer from "./components/Footer";
// import AllFeaturedEmployee from "./components/AllFeaturedEmployee";
import EmployerRegister from "./components/EmployerRegister";
import EmployeeRegister from "./components/EmployeeRegister";
import EmployerDashboard from './components/EmployerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import PasswordResetForm from './components/PasswordResetForm';
import AdminLoginForm from './components/AdminLoginForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          {/* <Route path='/home' element={<PasswordResetForm/>} /> */}
          <Route path='/reset-password/:token' element={<PasswordResetForm/>} />
          <Route path='/employer-register' element={<EmployerRegister />} />
          <Route path='/employee-register' element={<EmployeeRegister />} />
          <Route path='/employer-dashboard/*' element={<EmployerDashboard />} />
          <Route path='/employee-dashboard' element={<EmployeeDashboard />} />
          <Route path='/admin' element={<AdminLoginForm/>} />
          <Route path='/admin-dashboard' element={<AdminDashboard/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
