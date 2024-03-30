import notesData from "../data/note-data.js";

class FormInput extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _notesData = null;
  _isRendered = false

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._shadowRoot.appendChild(this._style);
    this._updateStyle();
    this._loadNotesData();
    this._render();

    this._shadowRoot.querySelector("#form").addEventListener("submit", this._handleSubmit.bind(this));
  }

  _loadNotesData() {
    const savedNotesData = localStorage.getItem('notesData');
    this._notesData = savedNotesData ? JSON.parse(savedNotesData) : [];
  }

  _saveNotesData() {
    localStorage.setItem('notesData', JSON.stringify(this._notesData));
  }

  _updateStyle() {
    this._style.textContent = `
      
                .form-container {
                    margin-top: 70px;
                }
                
                .form-container h2 {
                    text-align: center;
                    font-size: 2em;
                }
                
                form {
                    margin-top: 20px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                  
                }
                
                input[type="text"],
                form textarea {
                    padding: 10px;
                    font-size: 15px;
                    margin-top: 20px;
                    font-size: 16px;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                }
                
                form button {
                    margin-top: 20px;
                    padding: 15px;
                    background-color: #76ABAE;
                    border: none;
                    border-radius: 20px;
                    width: 300px;
                    cursor: pointer;
                    font-size: 15px;
                    align-self: center;
                  
                }

                @media screen and (max-width: 500px) {
                    input, textarea {
                        width: 60%;
                    }
                }
     `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    if (!this._isRendered) {
      this._render();
    }
    document.addEventListener("addNewNote", this.handleAddNewNote.bind(this));
  }


  _render() {


    this._loadNotesData()

    this._shadowRoot.innerHTML += `
        <div class="form-container">
            <h2>MY NOTES</h2>
            <form id="form">
            <div class="form-group">
                <input
                type="text"
                name="input-title"
                id="input-title"
                placeholder="Masukkan judul..."
                size="63"
                />
            </div>
            
            <div class="form-group">
                <textarea
                name="input-notes"
                id="input-notes"
                cols="59"
                rows="10"
                placeholder="Masukkan notes..."
                ></textarea>
            </div>
            <button id="submit-button">Submit</button>
            </form>
        </div>
    `;

    const submitButton = this._shadowRoot.getElementById("submit-button");
    submitButton.addEventListener("click", this._handleSubmit.bind(this));
    this._isRendered = true
  }
  _handleSubmit(event) {
    event.preventDefault();

    let inputTitle = this._shadowRoot.getElementById("input-title").value;
    let inputNote = this._shadowRoot.getElementById("input-notes").value;
    console.log("Data telah disimpan:", this._notesData);
    if (inputTitle.trim() === '' || inputNote.trim() === '') {
      alert('Judul dan catatan tidak boleh kosong!');
      return;
    }
    const addNote = {
      title: inputTitle,
      body: inputNote,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    let storedNotesData = JSON.parse(localStorage.getItem("notesData")) || [];
    storedNotesData.push(addNote);
    localStorage.setItem("notesData", JSON.stringify(storedNotesData));
    this.dispatchEvent(new CustomEvent("addNewNote", { detail: addNote }));
    this._render();
  }
  handleAddNewNote(event){
    const newNote = event.detail
    this._notesData.push(newNote)
    this._saveNotesData()
    this._render()
  }
}

customElements.define("form-input", FormInput);
