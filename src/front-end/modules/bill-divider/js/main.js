//create a roommate item
window.addEventListener('DOMContentLoaded', init);
let array=[]
function init() {
    init_list()
    pay()
    transfer()
    del_history()
}
function create(data){
    let wrapper = document.createElement('li')
    wrapper.innerHTML=`
    <h3>${data.name}</h3>
    <p>is Owes $${data.isOwes}</p>
    `
    for(let [key,value] of Object.entries(data.Owes)){
      if(key!=data.name && value!=0)
        wrapper.insertAdjacentHTML('beforeend', `<span>Owes $${value} to ${key}!</span><br>`)
    }
    let list=document.querySelector('ul[class="list mb-3"]')
    list.append(wrapper)
}
function init_list(){
    let initial_data=[
        {
            name:"gjcghjv",
            isOwes:0,
            Owes:{}
        }
        ,{
            name:"cyabat",
            isOwes:0,
            Owes:{}
        }
        ,{
            name:"challah",
            isOwes:0,
            Owes:{}
        }
    ]
    
    let name_list=[]
    initial_data.forEach(data=>{name_list.push(data.name)})
    let radioList=document.querySelectorAll('.select_name')
    //create roommates and their corresponding radio buttons
    initial_data.forEach(data=>{
        // initialize the Owes attribute of data
        for(let name of name_list)
            data.Owes[name]=0
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

function display_array(){
    let list=document.querySelector('ul[class="list mb-3"]')
    while(list.firstChild)
        list.removeChild(list.firstChild)
    array.forEach(data=>{create(data)})
}

function pay(){
    let form_pay=document.querySelector('form#pay')
    form_pay.addEventListener('submit',submit)
    function submit(e){
        e.preventDefault()
        //get inputs from submitted form
        let inputs=form_pay.elements;
        let radioLength=array.length
        let cost=inputs[radioLength].value
        let to=inputs[radioLength+1].value
        let description=inputs[radioLength+2].value

        //update Owes and is Owes
        let index=0//index of selected roommate's data in array
        //The first array.length inputs are radio buttons. Loop through to find which is selected
        for(let x=0;x<radioLength;x++)
            if(inputs[x].checked)
                index=x;
        let average_cost=cost/radioLength
        let remainToBePaid=cost//used to track how much still need to be paid after offsetting all the current debts
        let Owes_entries=Object.entries(array[index].Owes)//list of [debtor,amount_owed] pairs of the paying roommate (array[index])
        // go over the debtor-amount_owed list to offset the debts
        for(let x=0;x<Owes_entries.length;x++){
            //do nothing at the iteration that looks at the paying roommate himself as debtor.
            if(x!=index){
                let [debtor,amount]=Owes_entries[x]
                let payer=array[index].name
                let smaller=Math.min(amount,average_cost)
                array[index].Owes[debtor]-=smaller
                array[x].Owes[payer]+=average_cost-smaller
                array[x].isOwes-=smaller
                remainToBePaid-=smaller
                //round to 2 decimal places, floating point error otherwise
                array[index].Owes[debtor]=Math.round(array[index].Owes[debtor]*100)/100
                array[x].Owes[payer]=Math.round(array[x].Owes[payer]*100)/100
                array[x].isOwes=Math.round(array[x].isOwes*100)/100
            }
        }
        array[index].isOwes+=remainToBePaid-average_cost
        array[index].isOwes=Math.round(array[index].isOwes*100)/100
        display_array(array)

        //add an record to history
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
        let amount=parseInt(document.querySelector('input[form="transfer"]').value)
        let owed=array[from_index].Owes[array[to_index].name]
        let smaller=Math.min(amount,owed)
        array[from_index].Owes[array[to_index].name]-=smaller
        array[to_index].isOwes-=smaller
        array[from_index].isOwes+=amount-smaller
        array[to_index].Owes[array[from_index].name]+=amount-smaller
        display_array()
        //add an record to history
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
function del_history(){
    let form_del_history=document.querySelector('form#del_history')
    let list=document.querySelector('ul.historyList')

    form_del_history.addEventListener("submit",submit)
    function submit(e){
        e.preventDefault()
        let inputs=form_del_history.elements
        console.log(inputs)
        let to_del=[]
        for(let x=0;x<inputs.length;x++){
            if(inputs[x].checked)
                to_del.push(inputs[x])
        }
        to_del.forEach(record=>{list.removeChild(record.parentElement)})
    }
}

