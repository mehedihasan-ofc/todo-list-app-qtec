import { useState } from 'react';
import TasksList from './TasksList';
import { FaSearch, FaTasks } from 'react-icons/fa';
import { MdOutlineTaskAlt } from "react-icons/md";

const data = [
  {
    id: 1,
    title: "Design User-friendly Landing Page",
    description: "Create an attractive and intuitive landing page layout to welcome visitors and encourage engagement.",
    status: "incomplete",
    priority: "high"
  },
  {
    id: 2,
    title: "Implement Responsive Navigation Bar",
    description: "Develop a navigation bar that adjusts seamlessly across various screen sizes to ensure a consistent user experience.",
    status: "incomplete",
    priority: "medium"
  },
  {
    id: 3,
    title: "Optimize Website Performance",
    description: "Enhance website loading speed and overall performance by optimizing code, images, and server settings.",
    status: "completed",
    priority: "low"
  },
  {
    id: 4,
    title: "Test Cross-browser Compatibility",
    description: "Verify that the website functions correctly across different web browsers to ensure broad accessibility for users.",
    status: "incomplete",
    priority: "medium"
  },
  {
    id: 5,
    title: "Deploy Website to Production Server",
    description: "Deploy the finalized website to the production server, making it accessible to the public.",
    status: "completed",
    priority: "high"
  }
];


const TasksBoard = () => {

  const [tasks, setTasks] = useState(data);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;

    if (value === '') {
      setTasks(data);
    } else {
      const filteredTasks = data.filter(task =>
        task.title.toLowerCase().includes(value.toLowerCase())
      );
      setTasks(filteredTasks);
    }
  };


  return (
    <section className='w-full md:max-w-7xl mx-auto border shadow rounded-md p-5 my-10'>

      <div className="flex justify-between items-center">
        <div className='flex items-center gap-5'>
          <div className='flex items-center gap-3'>
            <FaTasks size={20} />
            <h4 className="text-lg font-semibold">Total Tasks: <span className="font-normal">{tasks?.length}</span></h4>
          </div>

          <div className='flex items-center gap-3'>
            <MdOutlineTaskAlt size={20} />
            <h4 className="text-lg font-semibold">Completed Tasks: <span className="font-normal">{tasks.filter(task => task.status === "completed").length}</span></h4>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks..."
            className="border rounded py-2 px-4 pl-10 outline-none"
            onChange={handleSearchInputChange}
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>

        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5">Add Task</button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete All</button>
        </div>
      </div>

      <TasksList tasks={tasks} />
    </section>
  );
};

export default TasksBoard;