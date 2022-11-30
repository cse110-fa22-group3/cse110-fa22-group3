function dataExist()
{
    if (localStorage.getItem("RoommateListData") === null)
    {
        const billDividerData = {
          contributions: [],
          log: [],
        };
    
        //adding it to local storage for the first time
        localStorage.setItem("BillDividerData", JSON.stringify(billDividerData));
    }
}

export function getContribution(id)
{

}

export function getDebt(id) 
{
    return getAvgContribution() - getContribution(id);
}

export function addPayment(text, giver, recipient, amount) 
{
}

export function getLog()
{

}

export function getTotalContributions()
{

}

export function getAvgContribution() 
{
}