import notesData from "../data/note-data.js";

class NoteList extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _notesData = [];

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._notesData = JSON.parse(localStorage.getItem("notesData")) || [];
    this._updateStyle()

  }

  _updateStyle() {
    this._style.textContent = `
    .notes-list {
        margin-top: 50px;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-template-rows: auto;
        display: grid;
        justify-items: center;
        gap: 20px;
        margin: 30px;
      }
      
      .notes-item {
        background-color: #eeeee;
        box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.3);
        padding: 20px;
        font-size: 15px;
      }
      
      .title-note,
      .body-note,
      .date-note {
        margin-bottom: 10px;
      }
      `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
    window.addEventListener("storage", () => {
      this.render();
    });
   }

  handleNewNoteAdded(event) {
    const newNote = event.detail;
    this._notesData.push(newNote);
    this._saveNotesData();
    this.render();
  }

  _saveNotesData() {
    localStorage.setItem("notesData", JSON.stringify(this._notesData));
  }
  

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);

    const notesListContainer = document.createElement("div");
    notesListContainer.classList.add("notes-list");

    let storedNotesData = JSON.parse(localStorage.getItem("notesData")) || [];

    notesData.forEach((note) => {
      const noteItem = document.createElement("div");
      noteItem.classList.add("notes-item");

      const titleNote = document.createElement("div");
      titleNote.classList.add("title-note");
      titleNote.innerHTML = `<h3>${note.title}</h3>`;

      const bodyNote = document.createElement("div");
      bodyNote.classList.add("body-note");
      bodyNote.innerHTML = `<p>${note.body}</p>`;

      const dateNote = document.createElement("div");
      dateNote.classList.add("date-note");
      dateNote.textContent = new Date(note.createdAt).toLocaleDateString();

      noteItem.appendChild(titleNote);
      noteItem.appendChild(bodyNote);
      noteItem.appendChild(dateNote);

      notesListContainer.appendChild(noteItem);
    });
    this._shadowRoot.appendChild(notesListContainer);
  }
}

customElements.define("note-list", NoteList);
