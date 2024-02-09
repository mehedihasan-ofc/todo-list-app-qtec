import LoadingGif from '../../assets/loading.gif';

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <img className='w-40 h-40 object-cover' src={LoadingGif} alt="Loading ..." />
        </div>
    );
};

export default Loading;