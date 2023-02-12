
const {ipcRenderer}=require("electron")

document.getElementById("btn2").addEventListener("click",ButtonHanler)

const ButtonHanler=(e)=>{
    e.preventDefault()
    const image=document.querySelector(".image").src
    ipcRenderer.send("image:send",image)
}