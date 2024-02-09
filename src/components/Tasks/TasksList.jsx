import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { BiTask, BiTaskX } from "react-icons/bi";

const TasksList = ({ tasks, deleteTask, completeTask, onEdit }) => {
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
                            <tr key={task.id} className="border-t border-gray-300 [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
                                <td>
                                {task?.status === "completed" ? <BiTask className='text-teal-500' size={20} /> : <BiTaskX className='text-red-500' size={20} />}
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
                                    <div className="flex items-center justify-center">
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
                                                        <button onClick={() => onEdit(task)} className="px-5 py-1 hover:bg-blue-500 hover:text-white w-full">Edit</button>
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