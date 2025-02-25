import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../Redux/todoSlice";
import { toast } from "react-toastify";

const TodoCard = ({ task, id, setLoader }) => {
  console.log(setLoader);

  const [isEditing, SetisEditing] = useState(false);
  const [input, setInput] = useState(task);
  const dispatch = useDispatch();

  const deleteTask = async (id) => {
    setLoader(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/deleteTodo`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id,
          }),
        }
      );
      const data = await res.json();
      dispatch(addTodo(data.todo));
      toast("task deleted successfully!");
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  const editTask = async (id) => {
    setLoader(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/updateTodo`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            task: input,
            id,
          }),
        }
      );
      const data = await res.json();
      toast("task updated successfully!");
      dispatch(addTodo(data.todo));
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  return (
    <>
      {isEditing ? (
        <div className="flex space-x-2 w-full">
          <input
            type="text"
            className="bg-gray-600 border-b text-white w-full focus:ring-2 focus:ring-yellow-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <button
            onClick={() => {
              editTask(id, input);
              SetisEditing(false);
            }}
            className="bg-green-500 px-4 py-2 rounded-md text-white font-bold hover:bg-green-600 transition shadow-md hover:shadow-green-400"
          >
            ✅ Save
          </button>
        </div>
      ) : (
        <div className="flex justify-between w-full">
          <span className="text-white">{task}</span>
          <div className="space-x-2">
            <button
              onClick={() => {
                SetisEditing(true);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-md text-white font-bold hover:from-blue-600 hover:to-purple-600 transition shadow-md hover:shadow-blue-400"
            >
              ✏ Edit
            </button>
            <button
              onClick={() => deleteTask(id)}
              className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 rounded-md text-white font-bold hover:from-red-600 hover:to-orange-600 transition shadow-md hover:shadow-red-400"
            >
              ❌ Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoCard;
