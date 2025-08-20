import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import NoTaskFound from "./NoTaskFound";
export default function TaskBoard() {
  const defaultTasks = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "Implement a Python solution to synchronize data between an API and a third-party database securely, optimizing data exchange.",
    tags: ["web", "javascript", "python"],
    priority: "low",
    isFavorite: false,
  };
  const [tasks, setTasks] = useState([defaultTasks]);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  function handleSaveTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      const nextTasks = tasks.map((task) => {
        if (task.id === taskToUpdate.id) {
          return newTask;
        } else {
          return task;
        }
      });
      setTasks(nextTasks);
    }

    setAddTaskModal(false);
  }
  function handleEdit(task) {
    setTaskToUpdate(task);
    setAddTaskModal(true);
  }
  function handleCloseClick() {
    setTaskToUpdate(null);
    setAddTaskModal(false);
  }
  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  function handleDeleteAll() {
    setTasks([]);
  }
  function handleFavorite(id) {
    const nextTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isFavorite: !task.isFavorite,
        };
      } else {
        return task;
      }
    });
    setTasks(nextTasks);
  }
  function handleSearch(searchText) {
    const searchResult = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setTasks(searchResult);
  }
  return (
    <section className="mb-10" id="tasks">
      {addTaskModal && (
        <AddTaskModal
          onSave={handleSaveTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            openAddTaskModal={() => setAddTaskModal(true)}
            onDeleteAll={handleDeleteAll}
          />
          {tasks.length > 0 ? 
         ( <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onFavorite={handleFavorite}
          />) : <NoTaskFound/>
          }
        </div>
      </div>
    </section>
  );
}
