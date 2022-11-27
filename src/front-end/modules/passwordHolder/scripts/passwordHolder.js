class passwordHolderCard extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      const passwordHolderCard = document.createElement("div");
      passwordHolderCard.className = "whole-password";
      this.shadow.append(passwordHolderCard);
    }
  
    set data(data) {
      if (!data) return;
      const passwordHolderCard = this.shadow.querySelector("div");
      passwordHolderCard.innerHTML = `<p>
          <h2>${data.key}</h2>
      </p>
          `;
    }
  
    get data() {
      const passwordHolderCard = this.shadow.querySelector("div");
      return passwordHolderCard.innerHTML;
    }
  }
  customElements.define("passwordHolderCard", passwordHolderCard);