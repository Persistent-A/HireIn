import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Importing components
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer";
import AllFeaturedEmployee from "./components/AllFeaturedEmployee";
// import Login from "./components/Login";
import EmployerRegister from "./components/EmployerRegister";
import EmployeeRegister from "./components/EmployeeRegister";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path='/employer-register' element={<EmployerRegister />} />
          <Route path='/employee-register' element={<EmployeeRegister />} />
        </Routes>
        <Footer/>
      </Router>
      {/* <Main/>
      <AllFeaturedEmployee/>
      <Login /> */}
    </div>
  );
}

export default App;
