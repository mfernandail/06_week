const display = document.getElementById("display")
const buttons = document.querySelectorAll(".btn")
const operation = document.querySelector("#calculo")

let numbers = [] // Guarda los números (como strings primero)
let operators = [] // Guarda los operadores
let currentNumber = "" // Número que el usuario está escribiendo
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
      updateDisplay(value) // puedes agregar otro display para el operador si quieres

      return
    }

    // Lógica para números y punto decimal
    if (currentNumber.length < 10) {
      currentNumber += value
    }

    updateDisplay()
  })
})

function updateDisplay(op = "") {
  if(op.length === 0){
    display.textContent = currentNumber || "0"
  } else{
    display.textContent = op
  }
}

function calculate() {
  console.log({numbers})
  console.log({operators})

  let result = parseFloat(numbers[0])

  for (let i = 0; i < operators.length; i++) {
    const nextNumber = parseFloat(numbers[i + 1])

    if (operators[i] === "+") {
      result += nextNumber
    } else if (operators[i] === "-") {
      result -= nextNumber
    } else if (operators[i] === "*") {
      result *= nextNumber
    } else if (operators[i] === "/") {
      result /= nextNumber
    }
  }

  operation.textContent = calculo.join("")
  
  let result2 = Function(`"use strict"; return (${calculo.join("")})`)()

  currentNumber = result2.toString().slice(0, 10) // Redondear visualmente
  numbers = []
  operators = []

  updateDisplay()
}
// const display = document.getElementById("display")
// const buttons = document.querySelectorAll(".btn")
// const mensajeLimite = document.querySelectorAll(".mensaje-limite")

// let currentInput = ""
// let clear = false

// buttons.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const value = btn.textContent

//     switch (value) {
//       case "C":
//         if (!clear) {
//           currentInput = currentInput.slice(0, -1)
//         }
//         break
//       case "AC":
//         clear = false
//         currentInput = ""
//         break
//       case "=":
//         calculate()
//         clear = true
//         return
//       default:
//         if (currentInput.length < 10) {
//           currentInput += value
//           mensajeLimite.textContent = ""
//         } else {
//           mensajeLimite.textContent = "Maximum 10 characters"
//         }
//         break
//     }

//     updateDisplay()
//   })
// })

// function updateDisplay() {
//   display.textContent = currentInput || "0"
// }

// function calculate() {
//   try {
//     const safeInput = currentInput.replace(/[^0-9+\-*/().]/g, "")
//     // const result = Function(`"use strict"; return (${safeInput})`)()
//     // currentInput = result.toString()
//     let result = Function(`"use strict"; return (${safeInput})`)()
//     result = parseFloat(result.toPrecision(10)) // controla precisión numérica
//     currentInput = result.toString()

//     if (currentInput.length > 10) {
//       currentInput = currentInput.slice(0, 10)
//     }
//   } catch (e) {
//     currentInput = currentInput.slice(0, 10)
//   }

//   updateDisplay()
// }
