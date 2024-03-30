class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
        nav {
            display: flex;
            justify-content: space-between;
            background-color: #31363f;
            box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.3);
            padding: 17px;
            font-size: 1em;
            flex-wrap: wrap;
        }     

        @media screen and (max-width: 1000px) {
          header {
            width: 100%;
          }
        
          nav {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 0.8em;
          }
        }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <nav>
            <div class="app-name">
                <h1 style = "color: #eeeeee">MY NOTES</h1>
            </div>

             <div class="app-name-description">
                <h1 style = "color: #eeeeee">Write, Remember, Repeat!</h1>
            </div>
        </nav>
        
    `;
  }
}

customElements.define("app-bar", AppBar);