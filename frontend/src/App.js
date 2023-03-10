//Importing components
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer";
import AllFeaturedEmployee from "./components/AllFeaturedEmployee";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
      <AllFeaturedEmployee/>
      <Login />
      <Footer/>
    </div>
  );
}

export default App;
