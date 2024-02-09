import { BiTask, BiTaskX } from "react-icons/bi";
import { MdOutlineTaskAlt } from 'react-icons/md';
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

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
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Actions </th>
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
                                            <span className={`inline-block h-5 whitespace-nowrap ${task?.status === "completed" ? "bg-[#D1F4E0] text-[#12A150]" : "bg-[#FDD0DF] text-[#F64582]"} rounded-[45px] px-2.5 text-sm capitalize`}>
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
                                    <div className="flex items-center justify-center gap-1">
                                        <button disabled={task?.status === "completed"} onClick={() => completeTask(task.id)}><MdOutlineTaskAlt className="text-teal-500 hover:text-teal-600" size={16} /></button>
                                        <button onClick={() => onEdit(task)}><AiOutlineEdit className="text-indigo-500 hover:text-indigo-600" size={16} /></button>
                                        <button onClick={() => deleteTask(task.id)}><RiDeleteBin6Line className="text-red-500 hover:text-red-600" size={16} /></button>
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