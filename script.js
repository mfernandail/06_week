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
    } else {
      operacion += valor
      display.textContent = operacion
    }
  })
})
