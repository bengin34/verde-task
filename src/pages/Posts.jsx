import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import axios from "axios";

const Posts = () => {
  let { id } = useParams();
//   const [card, setCard] = useState({});
  const [formData, setFormData] = useState({ title: "", body: "" });

  const BASE_URL = "https://jsonplaceholder.typicode.com/posts/";

  const getData = async () => {
    try {
      const response = await axios(BASE_URL + id);
      const data = response.data;

      setFormData({ title: data.title, body: data.body, id:parseInt(id) , userId:1 });

    //   setCard(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        await axios.patch(`https://jsonplaceholder.typicode.com/posts/1`, formData)
        console.log(formData)
    } catch (error) {
        
    } 
  };

  return (
    <div className="items-center">
      <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Add New{" "}
      </button>

      <Link to="/">
        {" "}
        <MdArrowBack className="w-12 h-12" />{" "}
      </Link>
      <form action="" onSubmit={handleSubmit}>
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white ">
            Title
          </h5>
          <textarea
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="font-normal rounded-lg p-2 w-full h-24 text-gray-700 dark:text-g/2ray-400 "
            value={formData.title}
            required
          ></textarea>
        </div>

        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
            Description
          </h5>
          <textarea
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            className="font-normal w-full rounded-lg h-72 p-2 text-gray-700 dark:text-gray-400"
            value={formData.body}
            required
          ></textarea>
        </div>
      <button
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        type="submit"
      >
        Edit
      </button>
      </form>

      <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-red-900 focus:outline-none bg-white rounded-lg border border-red-200 hover:bg-red-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-700 dark:bg-red-800 dark:text-red-400 dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700">
        Delete
      </button>
    </div>
  );
};

export default Posts;
