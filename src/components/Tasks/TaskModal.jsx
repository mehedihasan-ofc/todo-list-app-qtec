import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const TaskModal = ({ onSave, taskToUpdate, isOpen, closeModal }) => {
    const initialTaskState = {
        title: "",
        description: "",
        status: "incomplete",
        priority: ""
    };

    const [task, setTask] = useState(initialTaskState);

    useEffect(() => {
        if(taskToUpdate) {
            setTask(taskToUpdate);
        }
    }, [taskToUpdate])

    const handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;

        setTask({
            ...task,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(task, taskToUpdate);
        setTask(initialTaskState);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {taskToUpdate ? 'Add New Task' : 'Update Task'}
                                </Dialog.Title>

                                <form onSubmit={handleSubmit}>
                                    <div className="mt-2">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={task.title}
                                            onChange={handleChange}
                                            placeholder="Enter task title"
                                            className="block w-full outline-none border py-2 pl-2 shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            rows={3}
                                            value={task.description}
                                            onChange={handleChange}
                                            placeholder="Enter task description"
                                            className="block w-full outline-none border pl-2 pt-2 shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                                        <select
                                            name="priority"
                                            id="priority"
                                            value={task.priority}
                                            onChange={handleChange}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        >
                                            <option value="">Select Priority</option>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>

                                    <div className="mt-4">
                                        <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            {taskToUpdate ? 'Update' : 'Add'} Task
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default TaskModal;