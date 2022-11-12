//passwordHolderAPI.js
export function readPasswords(){
    if(localStorage.getItem("PasswordHolderData")  === null){
        let firstPasswordList = {
            "Passwords" : [],
            "idPasswordCount" : 0
        }
        localStorage.setItem("PasswordHolderData", JSON.stringify(firstPasswordList));
        return JSON.parse(localStorage.getItem('PasswordHolderData'))["Passwords"];
    }
    else{
        return JSON.parse(localStorage.getItem('PasswordHolderData'))["Passwords"];
    }
}
export function createPassword(formData){
    let apiData = JSON.parse(localStorage.getItem('PasswordHolderData'));
    let newPassword = {
        "id" : apiData["idPasswordCount"],
        "key" : formData["key"],
        "username" : formData["username"],
        "password" : formData["password"]
    };
    apiData["idPasswordCount"]+=1;
    apiData["Passwords"].push(newPassword);
    localStorage.setItem("PasswordHolderData",JSON.stringify(apiData));
}

export function updatePassword(id,formData){
    let apiData = JSON.parse(localStorage.getItem('PasswordHolderData'));
    for(let i = 0; i < apiData["Passwords"];i++){
        if(apiData["Passwords"][i]["id"] == id){
            apiData["Passwords"][i]["key"] = formData["key"];
            apiData["Passwords"][i]["username"] = formData["username"];
            apiData["Passwords"][i]["username"] = formData["password"];
            break;
        }
    }
    localStorage.setItem("PasswordHolderData",JSON.stringify(apiData));
}

export function deletePassword(id){
    let apiData = JSON.parse(localStorage.getItem('PasswordHolderData'));
    for(let i = 0; i < apiData["Passwords"];i++){
        if(apiData["Passwords"][i]["id"] == id){
            apiData["Passwords"][i].splice(i, 1);
            break;
        }
    }
    localStorage.setItem("PasswordHolderData",JSON.stringify(apiData));
}