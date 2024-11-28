import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import "./App.css";
import Header from "./Components/Header";

function App() {
  //data is comming from localstorage if there is no data then an empty array is assigned to it.
  const [listItems, setListItems] = useState(
    JSON.parse(localStorage.getItem("data"))
      ? JSON.parse(localStorage.getItem("data"))
      : []
  );

  //making a unique id limit 10 lakh or 1 million
  function uniqueId() {
    let random = Math.abs(Math.floor(Math.random() * 1000000));
    if (listItems.length > 0) {
      for (let item of listItems) {
        if (item.id == random) {
          uniqueId();
        } else {
          return random;
        }
      }
    } else {
      return random;
    }
  }

  //handling the task to add in total tasks
  const addItemInList = (data) => {
    //creating a unique id through function uniqueID.
    data.id = uniqueId();
    setListItems([data, ...listItems]);
  };

  //as soon as the total task list changes setting the changed data to the localstorage function is trigged
  useEffect(() => {
    setLocalStorage();
  }, [listItems]);

  function setLocalStorage() {
    //whenever new item is added to the total list the value gets set in the localstorage too.
    localStorage.setItem("data", JSON.stringify(listItems));
  }

  const handleDeleteItem = (id) => {
    //filtering the list to remove the item with the id that is passed to the function
    setListItems(listItems.filter((item) => item.id != id));
  };

  const handleEditItem = (data) => {
    //to edit data first i am storing the form data of the edit task in a local variable then replace it with the value in the orignal list
    let formData = data.updatedFormData;
    let updateCompletion = formData.get("taskCompleted");
    let updatedItemObj = {};
    for (const [key, value] of formData.entries()) {
      updatedItemObj[key] = value;
    }
    updatedItemObj.taskCompleted =
      updateCompletion || updateCompletion == "true" ? true : false;
    //replacing update form data value in the orignal list
    let updateData = listItems.map((item) => {
      if (item.id == data.id) {
        item.taskName = updatedItemObj.taskName;
        item.taskCompleted = updatedItemObj.taskCompleted;
        item.taskDescription = updatedItemObj.taskDescription;
        return item;
      }
      return item;
    });
    //the update total task list is set to the orignal total task list
    setListItems(updateData);
    //localstorage will automatically be set as the useEffect will run on change in the data of listItems
  };

  return (
    <>
      <div id="main">
        <Header />
        <TodoList
          listData={listItems}
          addItem={addItemInList}
          handleDelete={handleDeleteItem}
          handleEdit={handleEditItem}
        />
      </div>
    </>
  );
}

export default App;
