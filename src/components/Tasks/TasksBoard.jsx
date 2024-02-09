import { useState } from 'react';
import TasksList from './TasksList';
import { FaSearch, FaTasks } from 'react-icons/fa';
import { MdOutlineTaskAlt } from "react-icons/md";
import Swal from 'sweetalert2';
import EmptyData from './EmptyData';
import TaskModal from './TaskModal';

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
  // const [isOpen, setIsOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [latestId, setLatestId] = useState(data.length + 1);


  // =============================================================================>
  function handleAddEditTask(newTask, isAdd) {

    if (!isAdd) {
      
      const taskWithId = { ...newTask, id: latestId };

      setTasks([...tasks, taskWithId]);
      setLatestId(latestId + 1);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    handleCloseClick();
  }

  function handleEditTask(task) {

    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  // =============================================================================>
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

  const handleDeleteTask = (taskId) => {
    const taskToDelete = tasks.find(task => task.id === taskId);

    Swal.fire({
      title: "Delete Task",
      text: `Are you sure you want to delete the task "${taskToDelete.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks(tasks.filter(task => task.id !== taskId));
        Swal.fire(
          "Deleted!",
          `The task "${taskToDelete.title}" has been successfully deleted.`,
          "success"
        );
      }
    });
  };

  const handleDeleteAllTasks = () => {
    Swal.fire({
      title: "Delete All Tasks",
      text: "Are you sure you want to delete all tasks?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all!"
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks([]);
        Swal.fire(
          "Deleted!",
          "All tasks have been successfully deleted.",
          "success"
        );
      }
    });
  };

  const handleCompleteTask = (taskId) => {

    const taskToDelete = tasks.find(task => task.id === taskId);

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: "completed" };
      }
      return task;
    });
    setTasks(updatedTasks);
    Swal.fire(
      "Completed!",
      `The task "${taskToDelete.title}" has been marked as completed.`,
      "success"
    );
  };

  const handlePriorityFilterChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setTasks(data);
    } else {
      const filteredTasks = data.filter(task =>
        task.priority === value
      );
      setTasks(filteredTasks);
    }
  };



  return (
    <section className='w-full md:max-w-7xl mx-auto border shadow rounded-md p-5 my-10'>
      <div className="flex justify-between items-center">
        <div className='flex items-center gap-5'>
          <div className='flex items-center gap-2'>
            <FaTasks className='text-blue-500' size={24} />
            <h4 className="text-lg text-blue-500 font-semibold">Total Tasks: <span className="font-normal">{tasks?.length}</span></h4>
          </div>

          <div className='flex items-center gap-2'>
            <MdOutlineTaskAlt className='text-teal-500' size={24} />
            <h4 className="text-lg text-teal-500 font-semibold">Completed Tasks: <span className="font-normal">{tasks.filter(task => task.status === "completed").length}</span></h4>
          </div>
        </div>

        <div>
          <button onClick={() => setShowAddModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5">Add Task</button>
          <button onClick={handleDeleteAllTasks} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete All</button>
        </div>

        {/* add task modal */}
        <TaskModal isOpen={showAddModal} closeModal={handleCloseClick} onSave={handleAddEditTask} taskToUpdate={taskToUpdate} />
      </div>

      {tasks.length > 0 ? <TasksList tasks={tasks} onEdit={handleEditTask} completeTask={handleCompleteTask} deleteTask={handleDeleteTask} /> : <EmptyData message="Your to-do list is empty. Enjoy the satisfaction of a clean slate!" />}
    </section>
  );
};

export default TasksBoard;