import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../Redux/todoSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Tasks = () => {
  const tasks = useSelector((state) => state.todoReducer);
  const [newTask, setNewTask] = useState("");
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const addTask = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/addtodo`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          task: newTask,
        }),
      });
      const data = await res.json();
      dispatch(addTodo(data.todo));
      setNewTask("");
      toast("task added successfully");
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/allTodo`, {
        credentials: "include",
      });
      const todos = await res.json(res);
      // console.log(todos[0].todo);
      dispatch(addTodo(todos[0].todo));
    })();
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <div className="p-6 mt-16">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        📝 Your Tasks
      </h2>
      <div className="max-w-lg mx-auto bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-2xl">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Add a new task..."
            className="w-full p-3 border rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-yellow-400 text-gray-900 px-4 py-3 rounded font-bold hover:bg-yellow-500 transition shadow-lg"
          >
            ➕
          </button>
        </div>

        <div className="mt-6">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex justify-between bg-gray-700 p-3 rounded mt-2 items-center shadow-lg"
              >
                <TodoCard
                  task={task.task}
                  id={task._id}
                  setLoader={setLoader}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No tasks available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
