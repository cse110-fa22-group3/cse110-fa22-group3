import {readRoommate} from "../../../../back-end/roommateListAPI.js";
function getRoommate(id) {
    let roommates = readRoommate();
    console.log(roommates)
    for (let i = 0; i < roommates.length; i++) {
      if (roommates[i].id == id) return roommates[i];
    }
    return null;
  }
getRoommate(0)
//create a roommate item
window.addEventListener('DOMContentLoaded', init);
function init() {
    init_list()
    pay()
    transfer()
    del_history()
}
let cardBox = document.querySelectorAll('.card')
let array=[]//array containing data objects
let history_array=[]
/**
 * 
 * @param {Object} data 
 * create a roommate card using information in the input data object
 */
function create(data){
    let wrapper = document.createElement('li')
    wrapper.innerHTML=`<h3>${data.name}</h3>`
    if(data.isOwed!=0)
        wrapper.insertAdjacentHTML('beforeend', `<p>is Owed $${data.isOwed}</p>`)
    for(let [key,value] of Object.entries(data.Owes)){
      if(key!=data.name && value!=0)
        wrapper.insertAdjacentHTML('beforeend', `<span>Owes $${value} to ${key}!</span><br>`)
    }
    let list=document.querySelector('ul[class="list mb-3"]')
    list.append(wrapper)
}
/**
 * initialize a sample data object array
 * and create the roommate cards and their corresponding radio buttons
 */
function init_list(){
    let initial_data=[
        {
            name:"gjcghjv",
            isOwed:0,
            Owes:{},//filled below 
            paid:0,
            transferred:{}
        }
        ,{
            name:"cyabat",
            isOwed:0,
            Owes:{},//filled below 
            paid:0,
            transferred:{}
        }
        ,{
            name:"challah",
            isOwed:0,
            Owes:{},//filled below
            paid:0,
            transferred:{}
        }
        ,{
            name:"ch435lah",
            isOwed:0,
            Owes:{},//filled below
            paid:0,
            transferred:{}
        }
    ]
    let name_list=[]
    initial_data.forEach(data=>{name_list.push(data.name)})
    let radioList=document.querySelectorAll('.select_name')
    //create roommates and their corresponding radio buttons
    initial_data.forEach(data=>{
        // initialize the Owes attribute of data
        for(let name of name_list){
            data.Owes[name]=0
            data.transferred[name]=0
        }
        create(data)
        array.push(data)
        // create radio buttons for this roommate
        let radioTransferFrom = document.createElement('div')
        let radioTransferTo = document.createElement('div')
        let radioPay = document.createElement('div')
        radioTransferFrom.innerHTML=`<input type="radio" name="roommate" form="transfer_from"><label>${data.name}</label>`
        radioTransferTo.innerHTML=`<input type="radio" name="roommate" form="transfer_to"><label>${data.name}</label>`
        radioPay.innerHTML=`<input type="radio" name="roommate" form="pay"><label>${data.name}</label>`
        radioList[0].append(radioTransferFrom)
        radioList[1].append(radioTransferTo)
        radioList[2].append(radioPay)
    })
}
/**
 * display the roommate cards list. used everytime any roommate data is modified (pay and transfer)
 */
function display_array(){
    let list=document.querySelector('ul[class="list mb-3"]')
    while(list.firstChild)
        list.removeChild(list.firstChild)
    array.forEach(data=>{create(data)})
}
/**
 * pay functionality.
 * Any payment made is equally divided among all roommates.
 * If roommate A owes some money to roommate B, when roommate A pays a bill, 
 * B's share (to be paid to A) will offset the money A owes B first. 
 */
function pay(){
    let form_pay=document.querySelector('form#pay')
    form_pay.addEventListener('submit',submit)
    function submit(e){
        e.preventDefault()
        //get inputs from submitted form
        let inputs=form_pay.elements;
        let radioLength=array.length
        let cost=parseFloat(inputs[radioLength].value)
        let to=inputs[radioLength+1].value
        let description=inputs[radioLength+2].value
        //update Owes and is Owed
        let index=0//index of selected roommate's data in array
        //The first array.length inputs are radio buttons. Loop through to find which is selected
        for(let x=0;x<array.length;x++)
            if(inputs[x].checked)
                index=x;
        pay_update_array(index,cost)
        //return to home page and clear the form
        cardBox[0].classList.add('active')
        cardBox[3].classList.remove('active')
        form_pay.reset()
        //add an record to history
        history_array.push([index,cost])
        let record=document.createElement('li')
        record.className='mb-3'
        record.innerHTML=`
            <input type="checkbox" form="del_history">
            <span>${array[index].name} paid ${cost} for ${description}</span>
        `
        let historyList=document.querySelector('ul.historyList')
        historyList.insertBefore(record,historyList.firstChild)
    }
}
function pay_update_array(index,cost){
        array[index].paid+=cost
        let total_paid=0
        let total_debt=0
        array.forEach(data=>{total_paid+=data.paid})
        let average_paid=total_paid/array.length
        let debtors_percentage={}
        for(let x=0;x<array.length;x++){
            array[x].isOwed=0
            if(array[x].paid>average_paid){
                let debtor_excess=array[x].paid-average_paid
                debtors_percentage[array[x].name]=debtor_excess//store the actual amount instead of percentage for now, will divide by total debt after we acquired it
                array[x].isOwed=debtor_excess
                array[x].isOwed=Math.round(array[x].isOwed*100)/100//round to 2 decimal places
                total_debt+=debtor_excess
            }
            for(let name in array[x].Owes)
                array[x].Owes[name]=0
        }
        for(let name in debtors_percentage){
            debtors_percentage[name]/=total_debt
        }
        for(let x=0;x<array.length;x++){
            if(array[x].paid<average_paid){
                for(let name in debtors_percentage){
                    array[x].Owes[name]=(average_paid-array[x].paid)*debtors_percentage[name]
                    array[x].Owes[name]=Math.round(array[x].Owes[name]*100)/100//round to 2 decimal places
                }
            }
        }
        //adding debts generated by transfer
        for(let i=0;i<array.length;i++){
            for(let j=i+1;j<array.length;j++){
                let amount_fst=array[i].transferred[array[j].name]
                let amount_scd=array[j].transferred[array[i].name]
                if(amount_fst>=amount_scd)
                    transfer_update_array(i,amount_fst-amount_scd,j)
                else
                    transfer_update_array(j,amount_scd-amount_fst,i)
            }
        }
        display_array()
}
/**
 * transfer functionality
 * Any transfer from roommate A to roommate B will offset the money A owes B.
 * If extra amount is paid, B owes to A.
 */
function transfer(){
    let form_transfer_from=document.querySelector('form#transfer_from')
    let form_transfer_to=document.querySelector('form#transfer_to')
    let transfer_btn=document.querySelector('#transfer_btn')
    transfer_btn.onclick=function(){
        let radios_from=form_transfer_from.elements
        let radios_to=form_transfer_to.elements
        let radioLength=array.length
        let from_index=0//index of payer
        let to_index=0//index of receiver
        for(let x=0;x<radioLength;x++){
            if(radios_from[x].checked)
                from_index=x
            if(radios_to[x].checked)
                to_index=x
        }
        //update Owes and is Owed
        let input_amount=document.querySelector('input[form="transfer"]')
        let amount=parseFloat(input_amount.value)
        array[from_index].transferred[array[to_index].name]+=amount//store transfer info in transferred array
        transfer_update_array(from_index,amount,to_index)
        //return to home page and clear the form
        cardBox[0].classList.add('active')
        cardBox[2].classList.remove('active')
        form_transfer_from.reset()
        form_transfer_to.reset()
        input_amount.value=''
        //add an record to history
        history_array.push([from_index,amount,to_index])
        let record=document.createElement('li')
        record.className='mb-3'
        record.innerHTML=`
            <input type="checkbox" form="del_history">
            <span>${array[from_index].name} transferred ${amount} to ${array[to_index].name}</span>
        `
        let historyList=document.querySelector('ul.historyList')
        historyList.insertBefore(record,historyList.firstChild)
    }
}
function transfer_update_array(from_index,amount,to_index){
    let owed=array[from_index].Owes[array[to_index].name]
    let smaller=Math.min(amount,owed)
    array[from_index].Owes[array[to_index].name]-=smaller
    array[to_index].isOwed-=smaller
    array[from_index].isOwed+=amount-smaller
    array[to_index].Owes[array[from_index].name]+=amount-smaller
    //round to 2 decimal places, floating point error otherwise
    array[from_index].Owes[array[to_index].name]=Math.round(array[from_index].Owes[array[to_index].name]*100)/100
    array[to_index].isOwed=Math.round(array[to_index].isOwed*100)/100
    array[from_index].isOwed=Math.round(array[from_index].isOwed*100)/100
    array[to_index].Owes[array[from_index].name]=Math.round(array[to_index].Owes[array[from_index].name]*100)/100
    display_array()
}
/**
 * delete history functionality
 * check the checkboxes of the records you want to delete and click on delete button to delete them
 */
function del_history(){
    let form_del_history=document.querySelector('form#del_history')
    let list=document.querySelector('ul.historyList')
    form_del_history.addEventListener("submit",submit)
    function submit(e){
        e.preventDefault()
        let inputs=form_del_history.elements
        let to_del=[]//store elements to be deleted
        let to_del_idx=[]
        for(let x=0;x<inputs.length;x++){
            if(inputs[x].checked){
                to_del_idx.push(inputs.length-2-x)
                to_del.push(inputs[x])
            }
        }
        to_del_idx.forEach(idx=>{
            if(history_array[idx].length==3){
                let [from_index,amount,to_index]=history_array[idx]
                array[from_index].transferred[array[to_index].name]-=amount
                transfer_update_array(to_index,amount,from_index)//from_index,-amount,to_index is incorrect for how transfer is implemented
            }
            else{
                let [index,cost]=history_array[idx]
                pay_update_array(index,-cost)
            }
        })
        to_del.forEach(record=>{list.removeChild(record.parentElement)})
        // //return to home page
        // cardBox[0].classList.add('active')
        // cardBox[1].classList.remove('active')
    }
}

