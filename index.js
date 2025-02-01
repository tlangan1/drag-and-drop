window.addEventListener("DOMContentLoaded", loadEventHandlers);

function loadEventHandlers() {
  /* *** Code for the drop zone *** */
  let selected = null;
  document
    .querySelector(".drop-zone")
    ?.addEventListener("dragover", handleDragOver);
  document.querySelector(".drop-zone")?.addEventListener("drop", handleDrop);

  function handleDragOver(e) {
    console.log("dragOver");
    if (isBefore(selected, e.target)) {
      e.target.parentNode.insertBefore(selected, e.target);
    } else {
      e.target.parentNode.insertBefore(selected, e.target.nextSibling);
    }
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
    draggableLI.addEventListener("dragstart", (e) => {
      console.log("dragStart");
      // Change the source element's background color
      // to show that drag has started
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", null);
      selected = e.target;
    });

    draggableLI.addEventListener("dragend", (event) => {
      event.target.classList.remove("dragging");
      event.target.classList.add("was-dragged");
      selected = null;
    });
  });

  function isBefore(el1, el2) {
    let cur;
    if (el2.parentNode === el1.parentNode) {
      for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
        if (cur === el2) return true;
      }
    }
    return false;
  }
}
