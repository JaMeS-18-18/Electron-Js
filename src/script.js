const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.on("screenshot:captured",(e,ImageData)=>{
        document.getElementById("placeholder").src =ImageData;
    });

    let mms = 00;
    let s = 00;
    let m = 00;
    let h = 00;
    
    let interval;
    
    let second = document.querySelector(".second")
    let minute = document.querySelector(".minute")
    let hour = document.querySelector(".hour")
    
    function StartTimer() {
      if (m === 59) {
        h++
        hour.innerHTML = h
        m = 0
        
      }
      if (s === 59) {
        m++
        minute.innerHTML = m
        s = 0
        ipcRenderer.send("screenshot:capture",{});
      }
      if (mms === 100) {
        s++
        second.innerHTML = s
        mms = 0
      }
      mms++
    }
    
    
    
    document.querySelector('.start_btn').addEventListener("click", () => {
      interval= setInterval(StartTimer,10)
    })
    
    document.querySelector('.stop_btn').addEventListener("click", () => {
      clearInterval(interval)
    })
})