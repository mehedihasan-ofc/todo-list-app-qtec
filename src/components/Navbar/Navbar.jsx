import { useState } from 'react';
import Logo from '../../assets/todo.png';
import Moon from "../../assets/moon.svg";
import Sun from "../../assets/sun.svg";

const Navbar = () => {

    const { darkMode, setDarkMode } = useState(false);

    return (
        <nav className="py-4 px-2 md:py-6 w-full shadow">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-x-6">

                <div className='flex items-center gap-2'>
                    <img className="h-[50px]" src={Logo} alt="Lws" />
                    <div>
                        <h2 className='text-3xl font-semibold'>Todo List</h2>
                        <p className='text-xs'>Master Your Tasks</p>
                    </div>
                </div>

                <div className="flex items-center space-x-5">
                    <div
                        className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
                        href="#"
                        onClick={() => setDarkMode(darkMode => !darkMode)}
                    >
                        <img className='w-8 h-8 rounded-full object-cover' src={darkMode ? Sun : Moon} alt="theme-icon" />
                    </div>

                    <img className='w-8 h-8 rounded-full object-cover' src="https://i.ibb.co/1qJsYCh/avatar.jpg" alt="avatar" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;