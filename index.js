window.addEventListener("DOMContentLoaded", loadEventHandlers);

function loadEventHandlers() {
  /* *** Code for the drop zone *** */
  document
    .querySelector(".drop-zone")
    ?.addEventListener("dragover", handleDragOver);
  document.querySelector(".drop-zone")?.addEventListener("drop", handleDrop);

  function handleDragOver(event) {
    console.log("dragOver");
    event.preventDefault();
  }
  function handleDrop(event) {
    console.log("Drop");
    event.preventDefault();
    // Get the data, which is the id of the source element
    const data = event.dataTransfer.getData("text");
    const source = document.getElementById(data);
    event.target.appendChild(source);
  }

  /* *** Code for the draggable elements *** */
  var draggableLIs = Array.from(
    document.querySelectorAll('li[draggable="true"]')
  );

  draggableLIs.forEach((draggableLI) => {
    draggableLI.addEventListener("dragstart", (event) => {
      console.log("dragStart");
      // Change the source element's background color
      // to show that drag has started
      event.currentTarget.classList.add("dragging");
      // Clear the drag data cache (for all formats/types)
      event.dataTransfer.clearData();
      // Set the drag's format and data.
      // Use the event target's id for the data
      event.dataTransfer.setData("text/plain", event.target.id);
    });

    draggableLI.addEventListener("dragend", (event) => {
      event.target.classList.remove("dragging");
      event.target.classList.add("was-dragged");
    });
  });
}
