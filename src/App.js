import { Routes, Route, useParams } from "react-router-dom";
import Header from "./components/Header";
import Posts from "./pages/Posts";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useState } from "react";

function App() {
  const [cardData, setCardData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header
        cardData={cardData}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <Routes>
        <Route
          path="/"
          element={<Home cardData={cardData} setCardData={setCardData} />}
        />
        <Route
          path="/:id"
          element={
            <Posts
              cardData={cardData}
              isMenuOpen={isMenuOpen}
              setCardData={setCardData}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
