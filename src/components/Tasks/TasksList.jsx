import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BsThreeDots } from "react-icons/bs";

const TasksList = ({ tasks, deleteTask, completeTask }) => {
    return (
        <div className="overflow-auto mt-5">
            <table className="table-fixed overflow-auto xl:w-full">
                <thead>
                    <tr>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]"> Title </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-full"> Description </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[200px]"> Status </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Priority </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Options </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks?.map(task => (
                            <tr key={task.id} className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
                                <td>
                                    <button>
                                        {task.isFavorite ? <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="24"
                                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="yellow" fill="yellow"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path
                                                d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="24"
                                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path
                                                d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                        </svg>}
                                    </button>
                                </td>
                                <td>{task.title}</td>
                                <td>
                                    <div>
                                        {task.description}
                                    </div>
                                </td>
                                <td>
                                    <ul className="flex justify-center gap-1.5 flex-wrap">
                                        <li>
                                            <span className={`inline-block h-5 whitespace-nowrap ${task?.status === "completed" ? "bg-teal-500" : "bg-red-500"} rounded-[45px] px-2.5 text-sm capitalize text-white`}>
                                                {task?.status}
                                            </span>
                                        </li>
                                    </ul>
                                </td>
                                <td className="text-center">
                                    <div className={`border text-sm rounded-full capitalize text-center ${task?.priority === "low" ? "border-blue-500 text-blue-500" :
                                        task?.priority === "medium" ? "border-yellow-500 text-yellow-500" :
                                            task?.priority === "high" ? "border-red-500 text-red-500" :
                                                ""
                                        }`}>
                                        {task?.priority}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center space-x-3">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button>
                                                    <BsThreeDots className="cursor-pointer mb-1" size={20} />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 top-6 divide-y divide-gray-100 rounded bg-white shadow">
                                                    <Menu.Item>
                                                        <button className="px-5 py-1 hover:bg-blue-500 hover:text-white w-full">Edit</button>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <button onClick={() => deleteTask(task.id)} className="px-5 py-1 hover:bg-red-500 hover:text-white w-full">Delete</button>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <button disabled={task?.status === "completed"} onClick={() => completeTask(task.id)} className="px-5 py-1 hover:bg-teal-500 hover:text-white w-full">Completed</button>
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TasksList;