import { useState } from "react";
import "./TodoList.css";
import { CheckSquare, Square, Edit, Trash, RefreshCcw } from "lucide-react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const addTask = () => {
    if (task.trim() === "") return;
    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex].text = task;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { text: task, completed: false }]);
    }
    setTask("");
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditingIndex(index);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const resetTasks = () => {
    setTasks([]);
  };

  return (
    <div className="todo-container">
      <h1 className="main-heading">Ultimate Task Manager</h1>
      <h2 className="sub-heading">Organize Your Life Efficiently</h2>
      <div className="input-group">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          className="task-input"
        />
        <button onClick={addTask} className="add-button">
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <div className="task-list">
        {tasks.length === 0 && <p className="no-tasks">No tasks added yet. Get started now!</p>}
        {tasks.map((t, index) => (
          <div key={index} className="task-item">
            <div className="task-content">
              <button onClick={() => toggleTask(index)} className="checkbox-button">
                {t.completed ? <CheckSquare className="icon completed" /> : <Square className="icon" />}
              </button>
              <span className={t.completed ? "task-text completed" : "task-text"}>{t.text}</span>
            </div>
            <div className="task-actions">
              <button className="edit-button" onClick={() => editTask(index)}>
                <Edit className="icon" />
              </button>
              <button className="delete-button" onClick={() => deleteTask(index)}>
                <Trash className="icon" />
              </button>
            </div>
          </div>
        ))}
        {tasks.length > 0 && (
          <button className="reset-button" onClick={resetTasks}>
            <RefreshCcw className="icon" /> Reset
          </button>
        )}
      </div>
    </div>
  );
}