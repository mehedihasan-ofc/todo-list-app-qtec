import { useState, useEffect } from 'react';
import TasksList from './TasksList';
import { FaSearch, FaTasks } from 'react-icons/fa';
import { MdOutlineTaskAlt } from "react-icons/md";
import Swal from 'sweetalert2';
import EmptyData from './EmptyData';
import TaskModal from './TaskModal';

const defaultData = [
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
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [latestId, setLatestId] = useState(1);

  useEffect(() => {
    const hasDefaultDataShown = localStorage.getItem('hasDefaultDataShown');
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (!hasDefaultDataShown) {
      setTasks(defaultData);
      localStorage.setItem('tasks', JSON.stringify(defaultData));
      localStorage.setItem('hasDefaultDataShown', true);
    } else {
      setTasks(storedTasks || []);
    }
  }, []);

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  const loadTasksFromLocalStorage = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
      setLatestId(savedTasks.length > 0 ? savedTasks[savedTasks.length - 1].id + 1 : 1);
      setFilteredTasks(savedTasks);
    }
  };

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  function handleAddEditTask(newTask, isAdd) {
    let updatedTasks;
    if (!isAdd) {
      const taskWithId = { ...newTask, id: latestId };
      updatedTasks = [...tasks, taskWithId];
      setLatestId(latestId + 1);
    } else {
      updatedTasks = tasks.map((task) => {
        if (task.id === newTask.id) {
          return newTask;
        }
        return task;
      });
    }
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
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
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
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
        setFilteredTasks([]);
        setLatestId(1);
        saveTasksToLocalStorage([]);
        Swal.fire(
          "Deleted!",
          "All tasks have been successfully deleted.",
          "success"
        );
      }
    });
  };

  const handleCompleteTask = (taskId) => {

    const taskToComplete = tasks.find(task => task.id === taskId);

    if (taskToComplete.status === "completed") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `The task "${taskToComplete.title}" has already been completed.`,
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark "${taskToComplete?.title}" as completed?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it as completed"
    }).then((result) => {
      if (result.isConfirmed) {

        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: "completed" };
          }
          return task;
        });
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
        Swal.fire({
          title: "Completed!",
          text: `The task "${taskToComplete?.title}" has been marked as completed.`,
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });

      }
    });
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value.trim().toLowerCase();

    if (value === '') {
      setFilteredTasks(tasks);
    } else {
      const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(value)
      );
      setFilteredTasks(filteredTasks);
    }
  };

  const handlePriorityFilterChange = (e) => {
    const value = e.target.value;

    if (value === '') {
      setFilteredTasks(tasks);
    } else {
      const filteredTasks = tasks.filter(task =>
        task.priority === value
      );
      setFilteredTasks(filteredTasks);
    }
  };

  return (
    <section className='p-5'>

      <div className='w-full max-w-7xl mx-auto border shadow rounded-md p-5'>
        <div className="flex flex-col md:flex-row justify-between items-center">

          <div className='flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0'>
            <div className='flex items-center border py-1 px-3 shadow-sm rounded gap-2'>
              <FaTasks className='text-blue-500' size={24} />
              <h4 className="text-lg text-blue-500 font-medium">Total Tasks: {tasks?.length}</h4>
            </div>

            <div className='flex items-center border py-1 px-3 shadow-sm rounded gap-2'>
              <MdOutlineTaskAlt className='text-teal-500' size={24} />
              <h4 className="text-lg text-teal-500 font-medium">Completed Tasks: {tasks.filter(task => task.status === "completed").length}</h4>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search tasks..."
                className="border shadow-sm rounded py-2 px-4 pl-10 outline-none"
                onChange={handleSearchInputChange}
              />
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
            </div>

            <div>
              <select
                onChange={handlePriorityFilterChange}
                className="border shadow-sm rounded py-2 px-4 outline-none"
              >
                <option value="">Filter by Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-500 hover:bg-blue-700 transition-colors duration-300 ease-in-out text-white font-medium py-2 px-4 rounded"
            >
              Add Task
            </button>
            <button
              onClick={handleDeleteAllTasks}
              className="bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out text-white font-medium py-2 px-4 rounded"
            >
              Delete All
            </button>
          </div>
        </div>

        {filteredTasks.length > 0 ? <TasksList tasks={filteredTasks} onEdit={handleEditTask} completeTask={handleCompleteTask} deleteTask={handleDeleteTask} /> : <EmptyData message="No Data Found!" />}
        <TaskModal isOpen={showAddModal} closeModal={handleCloseClick} onSave={handleAddEditTask} taskToUpdate={taskToUpdate} />
      </div>
    </section>
  );
};

export default TasksBoard;