import { useState } from "react";

function TodoItem(props) {
  /*to check if the task is completed or not taking value from input field in this state variable by default the value
  is the already had data that i a showing in the input field, which is editable on click on edit button, if there is no data in that
  field then the default value will be false. same goes for taskName state variable.*/
  const [completed, setCompleted] = useState(
    props.taskItem.taskCompleted ? true : false
  );
  const [taskName, setTaskName] = useState(props.taskItem.taskName);
  const [taskDescription, setTaskDescription] = useState(
    props.taskItem.taskDescription
  );
  /*on click of edit button you will be able to edit your task and switch back to non-edit 
  make sure you save your edit or else it wont be updated.
  onclick of edit button red represents you can edit and purple represent you cant.
  updateItem state varible store this info to edit or not.
  */
  const [updateItem, setUpdateItem] = useState(false);
  const [errors, setErrors] = useState({
    nameError: false,
    descriptionError: false,
  });

  //handles form submissions and empty errors on form submissions
  const handleSubmit = (e) => {
    e.preventDefault();
    let form = document.getElementById(`updateForm${props.taskItem.id}`);
    let updatedFormData = new FormData(form);
    if (taskDescription != "" && taskName != "") {
      setErrors({ ...errors, nameError: false, descriptionError: false });
      updatedFormData &&
        props.handleEdit({ id: props.taskItem.id, updatedFormData });
      setUpdateItem(false);
    } else if (taskDescription == "" && taskName != "") {
      setErrors({ ...errors, nameError: false, descriptionError: true });
    } else if (taskDescription != "" && taskName == "") {
      setErrors({ ...errors, nameError: true, descriptionError: false });
    } else if (taskDescription == "" && taskName == "") {
      setErrors({ ...errors, nameError: true, descriptionError: true });
    }
  };
  /*made the input fields readonly and editable based on if edit is enabled or disabled*/
  /*errors are also handled on the change of the input fields*/
  return (
    <div className="todoItem">
      <form
        action="#"
        className="updatedItemForm"
        id={`updateForm${props.taskItem.id}`}
        onSubmit={handleSubmit}
      >
        <label>
          ID :{" "}
          <input
            type="text"
            value={props.taskItem.id}
            readOnly={true}
            name="id"
            className="id"
            id="edited-id"
          />
        </label>
        <label>
          Name :{" "}
          <input
            type="text"
            value={taskName}
            readOnly={!updateItem ? true : false}
            name="taskName"
            id="edited-name"
            className="name"
            onChange={(e) => {
              e.target.value == ""
                ? setErrors({ ...errors, nameError: true })
                : setErrors({ ...errors, nameError: false });
              setTaskName(e.target.value);
            }}
          />
          {errors.nameError ? (
            <p className="errors">*Task name can't be empty.</p>
          ) : (
            <></>
          )}
        </label>
        <label>
          Description :{" "}
          <input
            type="text"
            name="taskDescription"
            id="edited-description"
            className="description"
            value={taskDescription}
            readOnly={!updateItem ? true : false}
            onChange={(e) => {
              e.target.value == ""
                ? setErrors({ ...errors, descriptionError: true })
                : setErrors({ ...errors, descriptionError: false });
              setTaskDescription(e.target.value);
            }}
          />
          {errors.descriptionError ? (
            <p className="errors">*Task description can't be empty.</p>
          ) : (
            <></>
          )}
        </label>
        <label>
          Completed : {props.taskItem.taskCompleted ? "true" : "false"}
          <input
            type="checkbox"
            name="taskCompleted"
            id="edited-completed"
            checked={completed}
            value={completed}
            disabled={!updateItem ? true : false}
            onChange={(e) => {
              setCompleted(e.target.checked);
            }}
          />
        </label>
        <div className="action-btns">
          <button
            className="action-btn"
            type="button"
            onClick={() => {
              let answer = confirm(
                "Are you sure you want to delete this task? Note: This action is irreversible."
              );
              answer && props.handleDelete(props.taskItem.id);
            }}
          >
            Delete
          </button>
          <button
            className="action-btn"
            type="button"
            style={
              updateItem ? { background: "red" } : { background: "blueviolet" }
            }
            onClick={() => {
              setUpdateItem(!updateItem);
            }}
          >
            Edit
          </button>
          {updateItem && (
            <button className="action-btn" type="submit">
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default TodoItem;
