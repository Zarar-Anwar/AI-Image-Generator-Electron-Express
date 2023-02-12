const {app,BrowserWindow,ipcMain}=require("electron")
const path =require("path")
const url=require("url")

let win1

//Express backend 

const express=require("express")
const dotenv=require("dotenv").config()


const port=process.env.PORT || 5000

const appExpress=express()

appExpress.use(express.json())
appExpress.use(express.urlencoded({extended:false}))
appExpress.use(express.static(path.join(__dirname,"public")))


appExpress.use("/openai",require("./routes/openaiRoutes.js"))

appExpress.listen(port,()=>{
    console.log(`The Server is Runnning at http://localhost:${port}`)
})

const creatingWindow=()=>{

   win1=new BrowserWindow({
    width:900,
    height:700,
    frame:false,
    resizable:false,
    webPreferences:{
        nodeIntegration:true,
    }
   })
   win1.loadURL(url.format({
    pathname:"localhost:5000",
    protocol:"http:",
    slashes:true
   }))
}
app.whenReady().then(()=>{
      creatingWindow()
})

//Main Function Handling :
ipcMain.on("image:send",(event,pic)=>{
console.log(pic)
})
app.on("active",()=>{
    if(process.platform!=='darwin') app.quit()
})

app.on("window-all-closed",()=>{
    if(BrowserWindow.getAllWindows.length===0) creatingWindow()
})