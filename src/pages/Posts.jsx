import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { BsTrash, BsPlus } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import axios from "axios";

const Posts = ({ setCardData, cardData, isMenuOpen }) => {
  let { id } = useParams();

  const [formData, setFormData] = useState({ title: "", body: "" });
  const [comments, setComments] = useState([]);

  const BASE_URL = "https://jsonplaceholder.typicode.com/posts/";

  const getData = async () => {
    try {
      const response = await axios(BASE_URL + id);
      const data = response.data;

      setFormData({
        title: data.title,
        body: data.body,
        id: parseInt(id),
        userId: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getCommentsFromApi();
  }, []);

  const handleAdd = async () => {
    if (formData.title.trim() === "" || formData.body.trim() === "") {
      if (!formData.title && !formData.body) {
        alert("Post can not be blank");
      } else if (!formData.title) {
        alert("Title can not be blank");
      } else if (!formData.body) {
        alert("Detail can not blank");
      }
      return;
    }
    try {
      const newPost = await axios.post(`${BASE_URL}`, formData);
      //! I tried to show how the post count changes after successfully adding Post
      if (newPost.status == 201) {
        setCardData([...cardData, newPost]);
        console.log(cardData);
      }
      setFormData({ title: "", body: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const deletedPost = await axios.delete(`${BASE_URL}${id}`);
      //! I tried to show how the post count changes after successfully delete Post
      if (deletedPost.status == 200) {
        setCardData(cardData.filter((post) => post.id !== Number(id)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.put(`${BASE_URL}${id}`, formData);
    } catch (error) {}
  };

  const getCommentsFromApi = async () => {
    try {
      const commentsData = await axios(`${BASE_URL}${id}/comments`);
      setComments(commentsData.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container  mx-auto flex flex-wrap  justify-center items-center gap-10">
      <div
        className={`flex absolute ${
          isMenuOpen ? " top-72" : "top-20"
        }  left-24 md:top-24 gap-5`}
      >
        <Link to="/">
          {" "}
          <MdArrowBack className="w-12 h-12 p-2 rounded-full bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.07)] " />{" "}
        </Link>
        <h2 className="flex text-3xl items-center ">Posts</h2>
      </div>
      <div className="posts md:mt-4 mt-24">
        <div className="flex justify-center gap-24 items-center w-full  mt-4 ">
          <button
            onClick={handleAdd}
            className="font-medium ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            <span className="flex items-center gap-2">
              {" "}
              <BsPlus className="text-3xl " /> Add New
            </span>{" "}
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="block max-w-sm p-6 rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700">
            <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white  ">
              Title
            </h5>
            <textarea
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="font-normal rounded-lg p-2 w-full h-24 text-gray-700  "
              value={formData.title}
              required
            ></textarea>
          </div>

          <div className="block max-w-sm w-96 p-6  rounded-lg bg-gray-800 border-gray-700 hover:bg-gray-700 mt-1">
            <h5 className="mb-2 text-md font-bold tracking-tight text-white">
              Detail
            </h5>
            <textarea
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              className="font-normal w-full rounded-lg h-72 p-2  text-gray-700 "
              value={formData.body}
              required
            ></textarea>
          </div>
        </form>
        <div className="flex justify-between w-100 mt-5">
          <button
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleDelete}
          >
            <span className="flex items-center">
              <BsTrash className="mr-2 text-xl" />
              Delete
            </span>
          </button>
          <button
            className="mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
            onClick={handleSubmit}
          >
            <span className="flex items-center justify-center ">
              <CiEdit className="mr-2 text-2xl" />
              Update
            </span>
          </button>
        </div>
      </div>

      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 max-h-[560px] overflow-auto  m-4 ">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold mx-auto leading-none text-gray-900 ">
            Comments
          </h5>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 ">
            {comments?.map((c) => {
              return (
                <li className="pt-3 pb-0 sm:pt-4 " key={c.id}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm uppercase font-medium text-gray-900 truncate ">
                        {c.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {c.email}
                      </p>
                      <p className="text-sm font-medium text-gray-900 my-2  ">
                        {c.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Posts;
