import "../components/app.js";
import "../components/form.js";
import "../components/note-list.js";
import notesData from "../data/note-data.js";

document.addEventListener("DOMContentLoaded", () => {
  const noteList = document.querySelector("note-list");
  noteList.render()

  customElements.whenDefined("form-input").then(() => {
    const formInput = document.querySelector("form-input");
    formInput.addEventListener("addNewNote", (event) => {
      const newNote = event.detail;
      noteList.render()
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const noteList = document.querySelector("note-list");
  
    window.addEventListener("storage", (event) => {
      if (event.key === "notesData") {
        noteList.render();
      }
    });
  });
  
});
