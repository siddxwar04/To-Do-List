document.addEventListener("DOMContentLoaded", function () {
    const inputbox = document.getElementById("input-box");
    const listcontainer = document.getElementById("list-container");
    const addButton = document.getElementById("add-button"); // Get the add button

    function addTask() {
        if (inputbox.value === '') {
            alert("You must write something!");
        } else {
            let li = document.createElement("li");
            li.innerHTML = inputbox.value;
            listcontainer.appendChild(li);

            let span = document.createElement("span");
            span.innerHTML = "\u00d7";  // Add the delete button
            li.appendChild(span);

            inputbox.value = "";  // Clear input field

            // Save data to localStorage
            saveData();
        }
    }

    listcontainer.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();  // Save changes when an item is checked/unchecked
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();  // Remove task
            saveData();  // Save changes after deletion
        }
    }, false);

    function saveData() {
        localStorage.setItem("data", listcontainer.innerHTML);  // Save the current list to localStorage
    }

    function showTask() {
        const savedData = localStorage.getItem("data");  // Retrieve saved data from localStorage
        if (savedData) {
            listcontainer.innerHTML = savedData;  // Populate the list with saved data
        }
    }

    // Attach the addTask function to the button's click event
    addButton.addEventListener("click", addTask);

    // Show saved tasks when the page loads
    showTask();
});
