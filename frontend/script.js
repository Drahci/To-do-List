document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  const apiUrl = "http://localhost:3000/api/tasks";

  const fetchTasks = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const tasks = await response.json();
      taskList.innerHTML = "";
      tasks.forEach((task) => {
        const taskItem = createTaskItem(task);
        taskList.appendChild(taskItem);
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTaskItem = (task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.textContent = task.title;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";

    completeBtn.addEventListener("click", async () => {
      try {
        const response = await fetch(`${apiUrl}/${task.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !task.completed }),
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const updatedTask = await response.json();
        li.className = updatedTask.completed ? "completed" : "";
        completeBtn.textContent = updatedTask.completed ? "Undo" : "Complete";
      } catch (error) {
        console.error("Error updating task:", error);
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", async () => {
      try {
        await fetch(`${apiUrl}/${task.id}`, { method: "DELETE" });
        taskList.removeChild(li);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    });

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    return li;
  };

  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = taskInput.value;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const newTask = await response.json();
      const taskItem = createTaskItem(newTask);
      taskList.appendChild(taskItem);
      taskInput.value = "";
    } catch (error) {
      console.error("Error creating task:", error);
    }
  });

  fetchTasks();
});
