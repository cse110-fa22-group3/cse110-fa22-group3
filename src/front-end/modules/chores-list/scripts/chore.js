class chore extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    const chore = document.createElement("div");
    chore.className = "float-child edit-chore";
    this.shadow.append(chore);
  }

  set data(data) {
    if (!data) return;
    const chore = this.shadow.querySelector("div");
    chore.innerHTML = `<p>
        <h2>${data.choreName}</h2>
        <h3>${data.roommateName}</h3>
    </p>
        `;
  }
}
customElements.define("chore-card", chore);
