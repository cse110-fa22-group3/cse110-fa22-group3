function dataExist()
{
    if (localStorage.getItem("BillDividerData") === null)
    {
        const billDividerData = {
          contributions: [],
          log: [],
        };
    
        //adding it to local storage for the first time
        localStorage.setItem("BillDividerData", JSON.stringify(billDividerData));
    }
}
/////////////////////


export function getContribution(id)
{

}

export function getDebt(id) 
{
    return getAvgContribution() - getContribution(id);
}

export function addPayment(text, giver, recipient, amount) 
{
    //giver/recipient is -1
    //giver/recipient is not in roommatelist
    const billDividerData = JSON.parse(localStorage.getItem("BillDividerData"));
    const contributions = billDividerData["contributions"];
    const log = billDividerData["log"];

    if (!(giver < 0))
    {
        for (let i = 0; i < contributions.length; i++)
        {
            if (contributions[i]["id"] == giver)
            {
                contributions[i]["contribution"] += amount;
            }
        }
    }

    if (!(recipient < 0))
    {
        for (let i = 0; i < contributions.length; i++)
        {
            if (contributions[i]["id"] == recipient)
            {
                contributions[i]["contribution"] -= amount;
            }
        }
    }

    log.push({"text": text, "giver": giver, "recipient": recipient, "amount": amount});

    billDividerData["contributions"] = contributions;
    billDividerData["log"] = log;

    localStorage.setItem(JSON.stringify(billDividerData));
}

export function getLog()
{
    return JSON.parse(localStorage.getItem("BillDividerData"))["log"];
}

export function getTotalContributions()
{
    const billDividerData = JSON.parse(localStorage.getItem("BillDividerData"));
    const contributions = billDividerData["contributions"];
    let total = 0;

    for (let i = 0; i < contributions.length; i++)
    {
        total += contributions[i]["contribution"];
    }
    
    return total;
}

export function getAvgContribution() 
{
    const billDividerData = JSON.parse(localStorage.getItem("BillDividerData"));
    const contributions = billDividerData["contributions"];

    return getTotalContributions() / contributions.length;
}