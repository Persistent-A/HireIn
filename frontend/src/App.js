import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Importing components
import Header from "./components/Header"
// import Main from "./components/Main"
import Footer from "./components/Footer";
// import AllFeaturedEmployee from "./components/AllFeaturedEmployee";
import EmployerRegister from "./components/EmployerRegister";
import EmployeeRegister from "./components/EmployeeRegister";
import EmployerDashboard from './components/EmployerDashboard';
import PasswordResetForm from './components/PasswordResetForm';

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
          <Route path='/employer-dashboard' element={<EmployerDashboard />} />
        </Routes>
        <Footer/>
      </Router>
      
      
      
    </div>
  );
}

export default App;
