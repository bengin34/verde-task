import { Routes, Route } from "react-router-dom"
import Header from "./components/Header";
import Posts from "./pages/Posts";
import Home from "./pages/Home";


function App() {
  return (

    <>
    <Header />
    <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="posts" element={ <Posts/> } />
       
      </Routes>
    
      </>
   
  );
}

export default App;
