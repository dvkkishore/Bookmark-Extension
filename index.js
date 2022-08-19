let links=[]
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const deleteBtn=document.getElementById("delete-btn")
const ulEl=document.getElementById("ul-el")
const prevLinks=JSON.parse(localStorage.getItem("Links"))
const tabBtn=document.getElementById("tab-btn")

if(prevLinks){
    links=prevLinks
    render(links)
}

function render(ext){
    let listItems=""
    for(let i=0;i<ext.length;i++){
        listItems +=`
        <li>
            <a href="${ext[i]}" target="_blank">
                ${ext[i]}
            </a>
        </li>
        `
    }
    ulEl.innerHTML=listItems
    inputEl.value=""
}

deleteBtn.addEventListener("click", function(){
    localStorage.clear()
    links=[]
    render(links)
})

inputBtn.addEventListener("click",function(){
    links.push(inputEl.value) 
    localStorage.setItem("Links",JSON.stringify(links))
    render(links)
})

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
        links.push(tabs[0].url)
        localStorage.setItem("Links", JSON.stringify(links))
        render(links)
    })
})