const display = document.getElementById("display")
const botones = document.querySelectorAll(".btn")

let operacion = ""

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const valor = boton.textContent

    if (valor === "C") {
      operacion = ""
      display.textContent = "0"
    } else if (valor === "=") {
      try {
        operacion = eval(operacion).toString()
        display.textContent = operacion
      } catch {
        display.textContent = "Error"
        operacion = ""
      }
    } else if(valor === "√") {
      try {
        operacion = Math.sqrt(eval(operacion)).toString()
        display.textContent = operacion
      }
      catch {
        display.textContent = "Error"
        operacion = ""
      }
    } else if(valor === "AC") {
      operacion = operacion.slice(0, -1)
      display.textContent = operacion || "0"
      
    } else {
      operacion += valor
      display.textContent = operacion
    }
  })
})
