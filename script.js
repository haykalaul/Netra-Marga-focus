let workTime = 20 * 60
let breakTime = 20

let time = workTime
let isBreak = false
let running = false
let interval

let timer = document.getElementById("timer")
let startBtn = document.getElementById("startBtn")
let desc = document.getElementById("desc")
let progress = document.getElementById("progress")
let popup = document.getElementById("popup")

if (Notification.permission !== "granted") {
Notification.requestPermission()
}

function showNotification(title,message){

if(Notification.permission==="granted"){

new Notification(title,{
body:message,
icon:"https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
})

}

}

function updateTimer(){

let minutes=Math.floor(time/60)
let seconds=time%60

timer.textContent=

minutes+":"+(seconds<10?"0":"")+seconds

let total=isBreak?breakTime:workTime

let percent=((total-time)/total)*100

progress.style.width=percent+"%"

if(time>0){

time--

return

}

if(!isBreak){

showNotification(
"Break Time!",
"Look at something 20 feet away for 20 seconds 👀"
)

popup.style.display="flex"

isBreak=true

time=breakTime

desc.textContent="Take a 20 second eye break 👁️"

}

else{

showNotification(
"Focus Time!",
"Start focusing on your work again 🎯"
)

popup.style.display="none"

isBreak=false

time=workTime

desc.textContent="Focus on your work for 20 minutes 🎯"

}

}

startBtn.addEventListener("click",()=>{

if(!running){

interval=setInterval(updateTimer,1000)

running=true

}

})