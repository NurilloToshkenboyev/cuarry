import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} from "./redux/service/todo-api";
import { Card } from "./components/Card/card";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login/Login";

function App() {
  const { data, isLoading } = useGetTodosQuery();
  const [createTodo, { isLoading: createLoading }] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const { handleSubmit, register, reset } = useForm();

  const submit = (data) => {
    createTodo(data)
      .unwrap()
      .then(() => {
        toast.success("Todo created successfully!");
      })
      .catch((error) => {
        toast.error("Failed to create todo.");
        console.error(error);
      });
    reset();
  };

  const handleDelete = (id) => {
    deleteTodo(id)
      .unwrap()
      .then(() => {
        toast.success("Todo deleted successfully!");
      })
      .catch((error) => {
        toast.error("Failed to delete todo.");
        console.error(error);
      });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
          <nav className="mb-6">
            <Link to="/" className="text-blue-500 hover:underline">Home</Link> | 
            <Link to="/login" className="text-blue-500 hover:underline ml-2">Login</Link>
          </nav>
          <Routes>
            <Route path="/" element={
              <>
                {createLoading && <h2>Loading...</h2>}
                <form onSubmit={handleSubmit(submit)} className="mb-6">
                  <div className="mb-4">
                    <input
                      className="bg-gray-200 p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("title")}
                      type="text"
                      placeholder="Title"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      className="bg-gray-200 p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("description")}
                      type="text"
                      placeholder="Description"
                    />
                  </div>
                  <button className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition-colors" type="submit">
                    Submit
                  </button>
                </form>
                {isLoading ? (
                  <h1>Loading...</h1>
                ) : (
                  <div>
                    {data.map((item) => (
                      <div key={nanoid()}>
                        <Card {...item} />
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            } />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
