import React, { useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";

const Home = ({ cardData, setCardData }) => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/posts/";
  const userId = 1;
  const getData = async () => {
    try {
      const response = await axios(BASE_URL);
      const data = response.data;
      const filteredDataById = data.filter((post) => post.userId == userId);
      setCardData(filteredDataById);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 p-5">
      {cardData.map((post) => {
        return <Card key={post.id} {...post} />;
      })}
    </div>
  );
};

export default Home;
