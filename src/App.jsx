import { useEffect, useState } from "react";
import TasksBoard from "./components/Tasks/TasksBoard";
import Loading from "./components/Loading/Loading";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loaderTimeout);
    };
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Navbar />
      <TasksBoard />
      <Footer />
    </>
  );
};

export default App;