class passwordHolderCard extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      const passwordHolderCard = document.createElement("div");
      this.shadow.append(passwordHolderCard);
    }

    /**
    * Called when the .data property is set on this element.
    * @param {Object} data which is the JSON passed to the element
    * from localStorage.
    */
    set data(data) {
      if (!data) return;
      const passwordHolderCard = this.shadow.querySelector("div");
      passwordHolderCard.className = "whole-password";
      passwordHolderCard.innerHTML = `<style>.whole-password{
          background-color: rgba(0, 0, 0, 0);
          border-radius: 12px;
          border: solid white 2px;
          box-shadow: 0 10px 8px rgba(0, 0, 0, 0.5);
          transition-duration: 0.4s;
          color:white;
          height: 50px;
          margin-top: 15px;
          padding-left: 20px;
          padding-bottom: 25px;
          width: 115vh; 
          /* display: flex; */
          /* display: inline-block; */
        }
      
      .whole-password:hover{
      transform: translateY(-4px);
      color: black;
      background-color: white;
      cursor: pointer;
      }</style><h2>${data.key}</h2>`;
    }
    /**
    * Called when the data property is read from the element.
    */
    get data() {
      const passwordHolderCard = this.shadow.querySelector("div");
      return passwordHolderCard.innerHTML;
    }
  }
  customElements.define("password-holder-card", passwordHolderCard);