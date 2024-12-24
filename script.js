const currentEl = document.querySelector('#current')
const previousEl = document.querySelector('#previous')
const btns = document.querySelectorAll('#btns')
const btnsContainer = document.querySelector('#btns')

let current = ''
let previous = ''
let operator = ''
let isFirstOperation = true

const MAX_DIGITS = 16
const MAX_ERR_DURATION = 500

function renderPrevious(previous, operator) {
  return `<p>${previous} <span>${operator}</span></p>`
}

function throwDisplayError() {
  currentEl.classList.add('error')
  setTimeout(() => {
    currentEl.classList.remove('error')
  }, MAX_ERR_DURATION)
}

btnsContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('digit')) {
    const digit = event.target.textContent

    if (current.length >= MAX_DIGITS) {
      throwDisplayError()
      return
    }

    if (current?.includes('.') && digit === '.') {
      throwDisplayError()
      return
    }

    if ((current === '0' && digit !== '.') || current === '') {
      current = digit
    } else {
      current += digit
    }

    currentEl.textContent = current
  }

  if (event.target.classList.contains('operator')) {
    operator = event.target.textContent

    if (isFirstOperation) {
      previous = current
      previousEl.innerHTML = renderPrevious(previous, operator)
      currentEl.textContent = current
      current = ''
      isFirstOperation = false
      return
    }

    previousEl.innerHTML = renderPrevious(previous, operator)
    const operandsNotSet = isNaN(previous) || isNaN(current)

    if (operator === '+') {
      if (operandsNotSet) return
      current = parseFloat(previous) + parseFloat(current)
    }

    previous = current
    currentEl.textContent = current
  }

  if (event.target.classList.contains('equal')) {
    // handle equal to here.
  }

  if (event.target.classList.contains('clear')) {
    current = '0'
    previous = ''
    operator = ''
    currentEl.textContent = current
    previousEl.textContent = previous
  }

  if (event.target.classList.contains('delete')) {
    if (current.length === 1) {
      current = '0'
    } else {
      current = current.slice(0, -1)
    }
    currentEl.textContent = current
  }
})
