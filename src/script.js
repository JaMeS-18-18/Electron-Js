const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.on("screenshot:captured",(e,ImageData)=>{
        document.getElementById("placeholder").src =ImageData;
    });

    const time_el = document.querySelector(".watch")
    const start_btn = document.querySelector(".start_btn")
    const stop_btn = document.querySelector(".stop_btn")
    const reset_btn = document.querySelector('.reset_btn')

    let seconds = 0;
    let interval = null;

    start_btn.addEventListener("click", start )
    function Timer() {

      seconds++

      let hrs = Math.floor(seconds / 3600)
      let mins = Math.floor((seconds - (hrs * 3600)) / 60)
      let secs = seconds % 60;

      if (seconds < 10) secs = "0" + secs
      if (mins < 10) mins = "0" + mins
      if (hrs < 10) hrs = "0" + hrs
      time_el.innerText = `${hrs}:${mins}:${secs}`

      if (seconds === 20 ) {
        ipcRenderer.send("screenshot:capture",{});
      }
    }

    stop_btn.addEventListener("click", Stop)

    function Stop() {
      clearInterval(interval)
      interval = null
      start_btn.classList.toggle("d-none")
      stop_btn.classList.toggle("d-none")
      reset_btn.classList.toggle("disabled")
    }

    function start() {
      start_btn.classList.toggle("d-none")
      stop_btn.classList.toggle("d-none")
      reset_btn.classList.toggle("disabled")
      if (interval) {
        return
      }
      interval = setInterval(Timer, 1000)
    }
    
    reset_btn.addEventListener("click", () => {
      clearInterval(interval)
      interval = null
      seconds = 0
      time_el.innerHTML = '00:00:00'
    })
})