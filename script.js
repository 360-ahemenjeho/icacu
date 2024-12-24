const currentEl = document.querySelector('#current')
const previousEl = document.querySelector('#previous')
const btns = document.querySelectorAll('#btns')
const btnsContainer = document.querySelector('#btns')

let current = ''
let previous = ''
let operator = ''

const MAX_DIGITS = 17

function renderPrevious(previous, operator) {
  return `<p>${previous} <span>${operator}</span></p>`
}

btnsContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('digit')) {
    const digit = event.target.textContent
    if (current?.includes('.') && digit === '.') return
    if ((current === '0' && digit !== '.') || current === '') {
      current = digit
    } else {
      current += digit
    }

    currentEl.textContent = current
  }

  if (event.target.classList.contains('operator')) {
    operator = event.target.textContent
    previous = current
    current = ''
    previousEl.innerHTML = renderPrevious(previous, operator)

    const notTwoOperators = !current || !previous || isNaN(previous) || isNaN(current)

    if (operator === '+') {
      if (notTwoOperators) return
      current = parseFloat(previous) + parseFloat(current)
    }

    if (operator === '-') {
      if (notTwoOperators) return
      current = parseFloat(previous) - parseFloat(current)
    }

    if (operator === '/') {
      if (notTwoOperators) return
      if (current < 1 || previous < 1) return
      current = parseFloat(previous) / parseFloat(current)
    }

    if (operator === '*') {
      if (notTwoOperators) return
      current = parseFloat(previous) * parseFloat(current)
    }

    if (operator === '%') {
      if (notTwoOperators) return
      if (current < previous) return
      current = parseFloat(previous) % parseFloat(current)
    }

    currentEl.textContent = current ?? previous
  }

  if (event.target.classList.contains('equal')) {
    if (operator === '+') {
      current = parseFloat(previous) + parseFloat(current)
    } else if (operator === '-') {
      current = parseFloat(previous) - parseFloat(current)
    } else if (operator === '×') {
      current = parseFloat(previous) * parseFloat(current)
    } else if (operator === '÷') {
      current = parseFloat(previous) / parseFloat(current)
    }

    currentEl.textContent = current
    previousEl.innerHTML = renderPrevious(previous, operator)
    previous = current
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
