import { useEffect, useState } from "react";
import firebaseService from "./services/firebaseServices";
import LandingPage from "./pages/LandingPage";

function App() {
  const [tasks, setTasks] = useState(null);
  const fetchTasks = async () => {
    try {
      const res = await firebaseService.getDocuments("tasks");
      console.log(res);
      setTasks(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <LandingPage />
    </>
  );
}

export default App;
