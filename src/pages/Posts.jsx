import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import axios from "axios";

const Posts = ({ setCardData, cardData }) => {
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
      const comments = await axios(`${BASE_URL}${id}/comments`);
      setComments(comments);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container  mx-auto flex  justify-center items-center gap-10">
      <div className="posts">
        <div className="flex justify-center gap-24 items-center w-full  mt-4 ">
          <Link to="/">
            {" "}
            <MdArrowBack className="w-12 h-12 " />{" "}
          </Link>
          <h2 className="flex text-3xl items-center ">Posts</h2>
          <button
            onClick={handleAdd}
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Add New{" "}
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white ">
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

          <div className="block max-w-sm w-96 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
              Detail
            </h5>
            <textarea
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              className="font-normal w-full rounded-lg h-72 p-2 text-gray-700 dark:text-gray-400"
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
              <BsTrash className="mx-2 text-xl" />
              Delete
            </span>
          </button>
          <button
            className="mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
            onClick={handleSubmit}
          >
            <span className="flex items-center justify-center ">
              <CiEdit className="mx-2 text-2xl" />
              Update
            </span>
          </button>
        </div>
      </div>

      <div className="comments"></div>

      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 max-h-96 ">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 ">
            Comments
          </h5>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 ">
            {comments?.map(() => {
              return (
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="/docs/images/people/profile-picture-5.jpg"
                        alt="Thomas image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate ">
                        Thomes Lean
                      </p>
                      <p className="text-sm text-gray-500 truncate ">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                      $2367
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
