const TasksList = ({ tasks }) => {
    return (
        <div className="overflow-auto mt-5">
            <table className="table-fixed overflow-auto xl:w-full">
                <thead>
                    <tr>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]"> Title </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-full"> Description </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]"> Status </th>
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
                                        <button className="text-red-500">Delete</button>
                                        <button className="text-blue-500">Edit</button>
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