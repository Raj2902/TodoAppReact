import { useState } from "react";
import TodoItem from "./TodoItem";

function TodoList(props) {
  /*using one single object state variable for storing input field values and errors */
  const [taskAndErrors, setTaskAndErrors] = useState({
    taskName: "",
    taskCompleted: false,
    taskDescription: "",
    taskNameError: false,
    taskDescriptionError: false,
  });

  //what happens after the click of add item button? this button handles that
  const handleAddItem = (e) => {
    e.preventDefault();
    if (
      taskAndErrors.taskDescription &&
      taskAndErrors.taskName &&
      !taskAndErrors.taskNameError &&
      !taskAndErrors.taskDescriptionError
    ) {
      props.addItem(taskAndErrors);
      setTaskAndErrors({
        taskName: "",
        taskCompleted: false,
        taskDescription: "",
        taskNameError: false,
        taskDescriptionError: false,
      });
    } else {
      if (taskAndErrors.taskName == "" && taskAndErrors.taskDescription == "") {
        setTaskAndErrors({
          ...taskAndErrors,
          taskNameError: true,
          taskDescriptionError: true,
        });
      } else if (
        taskAndErrors.taskName != "" &&
        taskAndErrors.taskDescription == ""
      ) {
        setTaskAndErrors({
          ...taskAndErrors,
          taskNameError: false,
          taskDescriptionError: true,
        });
      } else if (
        taskAndErrors.taskName == "" &&
        taskAndErrors.taskDescription != ""
      ) {
        setTaskAndErrors({
          ...taskAndErrors,
          taskNameError: true,
          taskDescriptionError: false,
        });
      }
    }
  };

  //errors are handled on change of the input fields as well as on form submissions
  return (
    <div className="todoList">
      <form id="AddItemForm" action="#" onSubmit={handleAddItem}>
        <label htmlFor="name">
          <input
            type="text"
            placeholder="Enter task name"
            name="taskName"
            id="name"
            className="addItem-input"
            value={taskAndErrors.taskName}
            onChange={(e) => {
              e.target.value == ""
                ? setTaskAndErrors({
                    ...taskAndErrors,
                    taskNameError: true,
                    taskName: e.target.value,
                  })
                : setTaskAndErrors({
                    ...taskAndErrors,
                    taskNameError: false,
                    taskName: e.target.value,
                  });
            }}
          />
          {taskAndErrors.taskNameError ? (
            <p className="errors">*Task Name can't be empty.</p>
          ) : (
            <></>
          )}
        </label>
        <label htmlFor="description">
          <input
            className="addItem-input"
            type="text"
            placeholder="Enter task description"
            name="taskDescription"
            id="description"
            value={taskAndErrors.taskDescription}
            onChange={(e) => {
              e.target.value == ""
                ? setTaskAndErrors({
                    ...taskAndErrors,
                    taskDescriptionError: true,
                    taskDescription: e.target.value,
                  })
                : setTaskAndErrors({
                    ...taskAndErrors,
                    taskDescriptionError: false,
                    taskDescription: e.target.value,
                  });
            }}
          />
          {taskAndErrors.taskDescriptionError ? (
            <p className="errors">*Task Description can't be empty.</p>
          ) : (
            <></>
          )}
        </label>
        <label htmlFor="completed">
          Completed
          <input
            type="checkbox"
            name="taskCompleted"
            id="completed"
            checked={taskAndErrors.taskCompleted}
            value={taskAndErrors.taskCompleted}
            onChange={(e) => {
              setTaskAndErrors({
                ...taskAndErrors,
                taskCompleted: !taskAndErrors.taskCompleted,
              });
            }}
          />
        </label>
        <input
          type="submit"
          name="sumit-btn"
          id="submit-btn"
          value="Add Item"
        />
      </form>
      <div className="todoListDisplay">
        {!props.listData.length ? (
          <div className="todoItem">No task to show please add some</div>
        ) : (
          props.listData.map((task) => {
            return (
              <TodoItem
                key={task.id}
                taskItem={task}
                handleDelete={props.handleDelete}
                handleEdit={props.handleEdit}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
export default TodoList;
