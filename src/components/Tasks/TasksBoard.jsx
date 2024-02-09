import { useState, useEffect } from 'react';
import TasksList from './TasksList';
import { FaSearch, FaTasks } from 'react-icons/fa';
import { MdOutlineTaskAlt } from "react-icons/md";
import Swal from 'sweetalert2';
import EmptyData from './EmptyData';
import TaskModal from './TaskModal';

const TasksBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); // Separate state for filtered tasks
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
      setFilteredTasks(savedTasks); // Initialize filteredTasks with all tasks
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
    setFilteredTasks(updatedTasks); // Update filteredTasks along with tasks
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
        setFilteredTasks(updatedTasks); // Update filteredTasks along with tasks
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
        setFilteredTasks([]); // Update filteredTasks along with tasks
        setLatestId(1); // Reset latestId when tasks are deleted
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
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: "completed" };
      }
      return task;
    });
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filteredTasks along with tasks
    saveTasksToLocalStorage(updatedTasks);
    Swal.fire(
      "Completed!",
      `The task with ID ${taskId} has been marked as completed.`,
      "success"
    );
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value.trim().toLowerCase();

    if (value === '') {
      setFilteredTasks(tasks); // Reset filteredTasks to all tasks
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
      setFilteredTasks(tasks); // Reset filteredTasks to all tasks
    } else {
      const filteredTasks = tasks.filter(task =>
        task.priority === value
      );
      setFilteredTasks(filteredTasks);
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
          <select
            onChange={handlePriorityFilterChange}
            className="border rounded py-2 px-4 outline-none"
          >
            <option value="">Filter by Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <button onClick={() => setShowAddModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5">Add Task</button>
          <button onClick={handleDeleteAllTasks} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete All</button>
        </div>

        <TaskModal isOpen={showAddModal} closeModal={handleCloseClick} onSave={handleAddEditTask} taskToUpdate={taskToUpdate} />
      </div>

      {filteredTasks.length > 0 ? <TasksList tasks={filteredTasks} onEdit={handleEditTask} completeTask={handleCompleteTask} deleteTask={handleDeleteTask} /> : <EmptyData message="No Data Found!" />}
    </section>
  );
};

export default TasksBoard;