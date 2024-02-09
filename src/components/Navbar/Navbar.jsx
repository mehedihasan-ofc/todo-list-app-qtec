import Logo from '../../assets/todo.png';

const Navbar = () => {
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

                <div>
                    <img className='w-10 h-10 rounded-full object-cover' src="https://i.ibb.co/1qJsYCh/avatar.jpg" alt="avatar" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;