//roommate.js

/**
 * Class Roommate has the functionality to create custom roommate-card
 * elements and input a consistent style and roommate data from local storage.
 */
class Roommate extends HTMLElement {
  constructor() {
    //inheret everything from HTMLElement
    super();
    //attach shadow DOM
    this.shadow = this.attachShadow({ mode: "open" });

    //defining the roommate element and appending it
    const roommate = document.createElement("div");
    roommate.className = "item";
    this.shadow.append(roommate);

    //defining the style element and appending it
    const style = document.createElement("style");
    style.innerText = `
          .item {
            margin-bottom: 30px;
            padding: 30px;
            width: 200px;
            border-radius: 45px;
            border: 5px solid #000;
            text-align: center;
            cursor: pointer;
          }
          .text {
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .text img {
            width: 35px;
            height: auto;
          }
          .text p {
            font-size: 25px;
          }
          h3 {
            text-align: center;
            font-size: 35px;
            margin-bottom: 20px;
          }
          span {
            font-size: 20px;
          }
          `;
    this.shadow.append(style);
  }
  //setting the data that we will receive from local storage
  set data(data) {
    //if there is no data, return
    if (!data) return;

    //querying the div element
    const roommate = this.shadow.querySelector("div");

    //showing the roommate's data in the shadow DOM
    roommate.innerHTML = `
            <h3>${data.name}</h3>
            <div class="text">
                <img src="./modules/roommate-list/images/icon-1.png" alt="">
                <p>${data.birthday}</p>
            </div>
            <div class="text">
                <p>${data.hobbies}</p>
            </div>
            <div class="text">
                <p>${data.notes}</p>
            </div>
        `;
  }
}

//define a new custom element roommate-card
customElements.define("roommate-card", Roommate);