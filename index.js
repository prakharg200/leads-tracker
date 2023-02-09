let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const recoverBtn = document.getElementById("recover-btn")
const savetabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
const dlEl = document.getElementById("deleted-el")

//add and display leads from available localstorage
let prevStorage = JSON.parse(localStorage.getItem("leads"))
if(prevStorage){
    prevStorage.forEach((lead)=>{
        myLeads.push(lead)
    })
    render(myLeads,ulEl)
}

function render(arr,element) {
    let listItems = ""
    arr.forEach((item)=>{
        listItems += `
            <li>
                <a target='_blank' href='${item}'>
                    ${item}
                </a>
            </li>
        `
    })
    element.innerHTML = listItems  
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    localStorage.setItem("leads",JSON.stringify(myLeads))
    inputEl.value = ""
    render(myLeads,ulEl)
})

deleteBtn.addEventListener("click",function(){
    localStorage.clear()
    localStorage.setItem("deletedLeads",JSON.stringify(myLeads))
    myLeads = []
    render(myLeads,ulEl)
})

recoverBtn.addEventListener("click",function(){
    let deletedLeads = []
    let previousDeletedStorage = JSON.parse(localStorage.getItem("deletedLeads"))
    if(previousDeletedStorage){
        previousDeletedStorage.forEach((lead)=>{
            deletedLeads.push(lead)
        })
        render(deletedLeads,dlEl)
    }
})

savetabBtn.addEventListener("click",function(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("leads",JSON.stringify(myLeads))
        render(myLeads,ulEl)
    });
})


