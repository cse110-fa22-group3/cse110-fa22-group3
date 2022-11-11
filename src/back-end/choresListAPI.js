//choresListAPI.js

/**
 * Reads 'ChoresListData' data from local storage 
 * and returns a JSON with all the chores information
 * found. If nothing in local storage returns JSON with
 * initialized fields
 * @returns {Object} A JSON object of ChoresListData
 */
export function readChores(){
    if(localStorage.getItem("ChoresListData")  === null){
        let chores = {
            "chores" : [

            ],
            "archived" : [

            ],
            "openChoresCount" : 0,
            "closedChoresCount" : 0,
            "choresCountId" : 1
        }
        localStorage.setItem("ChoresListData", JSON.stringify(chores));
        return JSON.parse(localStorage.getItem("ChoresListData"));
    }
    else{
        return JSON.parse(localStorage.getItem("ChoresListData"));
    }
}

/**
 * queryChore focuses on providing information on a specific chore,
 * to avoid the hassle of parsing through entire lists for information
 * on one chore. Takes in two parameters: listToQuery and id.
 * listToQuery handles which list to check for the chore: archived or open.
 * id specifies the id of the chore we are looking for.
 * @param {String} listToQuery A string indicating which list to check 
 * for the chore, either 'open' or 'closed'
 * @param {Int} id An integer indicating chore id
 * @return {Object} A JSON object with specific info on a chore, 
 * otherwise return an empty object
 */
export function queryChore(listToQuery,id){
    //call for all data from ChoresList feature
    let choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));

    //Check which list to search from, and do a linear search for object
    if(listToQuery == "archived"){
        for(let i = 0; i < choresAPIData["archived"].length();i++){
            if(choresAPIData["archived"][i]["id"] == id){
                return choresAPIData["archived"][i]
            }
        }
        //not found therefore return empty JSON object
        return {};
    }
    else{
        for(let i = 0; i < choresAPIData["chores"].length();i++){
            if(choresAPIData["chores"][i]["id"] == id){
                return choresAPIData["chores"][i]
            }
        }
        //not found therefore return empty JSON object
        return {};
    }
}

/**
 * createChore focues on creating a chore object to add to the chores(open) list.
 * It requires data from a form to fill out the fields for the chores. Updates the id
 * counter to maintain unique ids for chores and updates the amount of open chores.
 * @param {Object} formData contains the Object info for the new chore
 */
export function createChore(formData){
    let choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));
    let newChore = {
        "id" : choresAPIData["choresCounterId"],
        "title" : formData["title"],
        "description" : formData["description"],
        "assignee" : formData["assignee"],
        "dueDate" : formData["dueDate"],
        "status" : "open"
    };
    choresAPIData["choresCounterId"] +=1;
    choresAPIData["openChoresCount"] +=1;
    choresAPIData["chores"].push(newChore);
    localStorage.setItem("ChoresListData", JSON.stringify(choresAPIData));
}

/**
 * updateChore focues on updating the information for a given chore. This function allows
 * a whole remap of a chore, therefore can be used for small and big changes. Only field 
 * that does not change is the id field, as it remains unique. We take three paramaeters:
 * @param {Int} id An integer indicating chore id
 * @param {String} listToQuery A string indicating which list to check 
 * for the chore, either 'open' or 'closed'
 * @param {Object} formData contains the Object info for the chore
 */
export function updateChore(id,listToQuery,formData){
    let choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));
    //setup flags so that we can ensure if we change status, it will put the chore
    //in the correct list: chores(open) or archived.
    let switchToOpen = false;
    let switchToClosed = false;

    //Do a check to see which list we should iterate through
    if(listToQuery == "archive"){
        for(let i = 0; i < choresAPIData["archived"].length();i++){
            if(choresAPIData["archived"][i]["id"] == id){
                //set flag to indicate we need to put the chore in the other list
                if(formData["status"] == "open" && choresAPIData["chores"][i]["status"] == "closed"){
                    choresAPIData["archived"][i]["status"] = formData["open"];
                    switchToOpen = true;
                }
                //update our chore
                choresAPIData["archived"][i]["title"] = formData["title"];
                choresAPIData["archived"][i]["description"] = formData["description"];
                choresAPIData["archived"][i]["assignee"] = formData["assignee"];
                choresAPIData["archived"][i]["dueDate"] = formData["dueDate"];
                choresAPIData["archived"][i]["status"] = formData["status"];
                break;
            }
        }
    }
    else{
        for(let i = 0; i < choresAPIData["chores"].length();i++){
            if(choresAPIData["chores"][i]["id"] == id){
                //set flag to indicate we need to put the chore in the other list
                if(formData["status"] == "closed" && choresAPIData["chores"][i]["status"] == "open"){
                    choresAPIData["chores"][i]["status"] = formData["open"];
                    switchToClosed = true;
                }
                //update our chore
                choresAPIData["chores"][i]["title"] = formData["title"];
                choresAPIData["chores"][i]["description"] = formData["description"];
                choresAPIData["chores"][i]["assignee"] = formData["assignee"];
                choresAPIData["chores"][i]["dueDate"] = formData["dueDate"];
                choresAPIData["chores"][i]["status"] = formData["status"];
                break;
            }
        }
    }
    //handle switching lists utilizing helper functions
    if(switchToClosed == true){
        closeChore(id);
    }
    if(switchToOpen == true){
        reOpenChore(id);
    }
    //update our localStorage
    localStorage.setItem("ChoresListData", JSON.stringify(choresAPIData));
}

/**
 * closeChore focues on closing out a chore or otherwise putting a given chore
 * into the archived array, so we can track completetion.
 * @param {Int} id An integer indicating chore id
 */
export function closeChore(id){
    let choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));
    for(let i = 0; i < choresAPIData["chores"].length();i++){
        if(choresAPIData["chores"][i]["id"] == id){
            let archivedChore = choresAPIData["chores"][i];
            archivedChore["status"] = "closed";
            choresAPIData["chores"].splice(i, 1);
            choresAPIData["archived"].push(archivedChore);
            choresAPIData["closedChoresCount"] +=1;
            choresAPIDate["openChoressCount"] -=1;
            break;
        }
    }
    localStorage.setItem("ChoresListData", JSON.stringify(choresAPIData));
}

/**
 * reOpenChore focues on reOpening a chore or otherwise putting a given chore
 * into the chores(open) array, so we can track completetion.
 * @param {Int} id An integer indicating chore id
 */
export function reOpenChore(id){
    let choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));
    for(let i = 0; i < choresAPIData["archived"].length();i++){
        if(choresAPIData["archived"][i]["id"] == id){
            let reOpenChore = choresAPIData["archived"][i];
            choresAPIData["archived"].splice(i, 1);
            choresAPIData["chores"].push(reOpenChore);
            choresAPIData["closedChoresCount"] -=1;
            choresAPIDate["openChoressCount"] +=1;
            break;
        }
    }
    localStorage.setItem("ChoresListData", JSON.stringify(choresAPIData));
}

//TO DO IF SPECIFIC DATA IS NEEDED
export function updateChoreCounterForRoommate(roommateId){

}
//TO DO IF SPECIFIC DATA IS NEEDED
export function updateChoreStatus(id, status){

}
//TO DO IF SPECIFIC DATA IS NEEDED
export function updateChoreOwner(choreId,oldOwnerID,newOwnerId){

}