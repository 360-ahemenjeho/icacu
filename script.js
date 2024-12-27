const currentEl = document.querySelector('#current')
const previousEl = document.querySelector('#previous')
const btnsContainer = document.querySelector('#btns')

let current = ''
let previous = ''
let operator = ''
const MAX_DIGITS = 16
const MAX_ERR_DURATION = 500

// Render the previous calculation display
function renderPrevious(previous, operator) {
  return `<p>${previous} <span>${operator}</span></p>`
}

// Show an error effect on the display
function throwDisplayError() {
  currentEl.classList.add('error')
  setTimeout(() => {
    currentEl.classList.remove('error')
  }, MAX_ERR_DURATION)
}

// Perform the calculation based on the operator
function calculateResult(prev, curr, op) {
  const a = parseFloat(prev)
  const b = parseFloat(curr)
  if (isNaN(a) || isNaN(b)) return '0'

  switch (op) {
    case '+':
      return String(a + b)
    case '-':
      return String(a - b)
    case '*':
      return String(a * b)
    case '/':
      return b === 0 ? 'Error' : String(a / b)
    default:
      return '0'
  }
}

// Reset the calculator state
function resetCalculator() {
  current = ''
  previous = ''
  operator = ''
  currentEl.textContent = '0'
  previousEl.textContent = ''
}

// Handle digit input
function handleDigitInput(digit) {
  if (current.length >= MAX_DIGITS) {
    throwDisplayError()
    return
  }
  if (current.includes('.') && digit === '.') {
    throwDisplayError()
    return
  }
  current = current === '0' && digit !== '.' ? digit : current + digit
  currentEl.textContent = current
}

// Handle operator input
function handleOperatorInput(op) {
  if (!current && !previous) {
    throwDisplayError()
    return
  }
  if (!current) {
    operator = op
    previousEl.innerHTML = renderPrevious(previous, operator)
    return
  }
  if (previous && operator) {
    previous = calculateResult(previous, current, operator)
  } else {
    previous = current
  }
  operator = op
  current = ''
  currentEl.textContent = '0'
  previousEl.innerHTML = renderPrevious(previous, operator)
}

// Handle equal input
function handleEqualInput() {
  if (!operator || !current || !previous) {
    throwDisplayError()
    return
  }
  current = calculateResult(previous, current, operator)
  currentEl.textContent = current
  previousEl.textContent = ''
  operator = ''
  previous = ''
}

// Handle delete input
function handleDeleteInput() {
  current = current.length > 1 ? current.slice(0, -1) : '0'
  currentEl.textContent = current
}

// Event listener for button clicks
btnsContainer.addEventListener('click', function (event) {
  const target = event.target

  if (target.classList.contains('digit')) {
    handleDigitInput(target.textContent)
  }
  if (target.classList.contains('operator')) {
    handleOperatorInput(target.textContent)
  }
  if (target.classList.contains('equal')) {
    handleEqualInput()
  }
  if (target.classList.contains('clear')) {
    resetCalculator()
  }
  if (target.classList.contains('delete')) {
    handleDeleteInput()
  }
})
