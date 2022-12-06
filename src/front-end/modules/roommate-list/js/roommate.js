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
            border-radius: 45px;
            border: 3px solid #000;
            text-align: center;
            cursor: pointer;
            word-break: break-word;
          }
          .text {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0;
          }
          .text img {
            width: 25px;
            height: auto;
          }
          .text p {
            font-size: 20px;
            padding-bottom: 0px;
            line-height: 25px;
          }
          h3 {
            text-align: center;
            font-size: 25px;
            margin-bottom: 0px;
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
                <p>&nbsp;${data.birthday}</p>
            </div>
            <div class="text">
                <p><b>Hobbies:</b> ${data.hobbies}</p>
            </div>
            <div class="text">
                <p><b>Notes:</b> ${data.notes}</p>
            </div>
        `;
  }
}

//define a new custom element roommate-card
customElements.define("roommate-card", Roommate);
