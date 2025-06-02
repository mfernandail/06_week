const display = document.getElementById("display")
const buttons = document.querySelectorAll(".btn")
const operation = document.querySelector("#calculo")

let numbers = []
let operators = []
let currentNumber = ""
let clear = false
let calculo = []

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent

    if (value === "AC") {
      currentNumber = ""
      operation.style.display = "none"
      operation.textContent = ""
      calculo = []
      numbers = []
      operators = []
      updateDisplay()
      clear = false
      return
    }

    if (value === "C") {
      if (!clear) {
        currentNumber = currentNumber.slice(0, -1)
        updateDisplay()
      }
      return
    }

    if (value === "=") {
      if (currentNumber !== "") {
        numbers.push(currentNumber)
        calculo.push(numbers[numbers.length - 1])
        operation.textContent = calculo.join("")
        operation.style.display = "block"
      }
      calculate()
      clear = true
      return
    }

    if (["+", "-", "*", "/"].includes(value)) {
      if (currentNumber !== "") {
        numbers.push(currentNumber)
        operators.push(value)
        currentNumber = ""

        calculo.push(numbers[numbers.length - 1])
        calculo.push(value)
        operation.textContent = calculo.join("")
        operation.style.display = "block"
      }
      updateDisplay(value)

      return
    }

    if (currentNumber.length < 10) {
      currentNumber += value
    }

    updateDisplay()
  })
})

function updateDisplay(op = "") {
  if (op.length === 0) {
    display.textContent = currentNumber || "0"
  } else {
    display.textContent = op
  }
}

function calculate() {
  operation.textContent = calculo.join("")

  let result2 = Function(`"use strict"; return (${calculo.join("")})`)()

  currentNumber = result2.toString().slice(0, 10) // Redondear visualmente
  numbers = []
  operators = []

  updateDisplay()
}
