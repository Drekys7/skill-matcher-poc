'use client'

import { useState } from 'react'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const percentage = () => {
    const value = parseFloat(display)
    setDisplay(String(value / 100))
  }

  const toggleSign = () => {
    const value = parseFloat(display)
    setDisplay(String(value * -1))
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm mx-auto">
      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 text-white p-4 rounded-xl text-right">
          <div className="text-3xl font-mono overflow-hidden">
            {display}
          </div>
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <button
          onClick={clear}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-xl transition-colors"
        >
          AC
        </button>
        <button
          onClick={toggleSign}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-xl transition-colors"
        >
          +/-
        </button>
        <button
          onClick={percentage}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-xl transition-colors"
        >
          %
        </button>
        <button
          onClick={() => performOperation('÷')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={() => inputNumber('7')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-xl transition-colors"
        >
          7
        </button>
        <button
          onClick={() => inputNumber('8')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-xl transition-colors"
        >
          8
        </button>
        <button
          onClick={() => inputNumber('9')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-xl transition-colors"
        >
          9
        </button>
        <button
          onClick={() => performOperation('×')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          onClick={() => inputNumber('4')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-xl transition-colors"
        >
          4
        </button>
        <button
          onClick={() => inputNumber('5')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-xl transition-colors"
        >
          5
        </button>
        <button
          onClick={() => inputNumber('6')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-xl transition-colors"
        >
          6
        </button>
        <button
          onClick={() => performOperation('-')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          -
        </button>

        {/* Row 4 */}
        <button
          onClick={() => inputNumber('1')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-xl transition-colors"
        >
          1
        </button>
        <button
          onClick={() => inputNumber('2')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-xl transition-colors"
        >
          2
        </button>
        <button
          onClick={() => inputNumber('3')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-xl transition-colors"
        >
          3
        </button>
        <button
          onClick={() => performOperation('+')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => inputNumber('0')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-xl transition-colors col-span-2"
        >
          0
        </button>
        <button
          onClick={inputDecimal}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-xl transition-colors"
        >
          .
        </button>
        <button
          onClick={() => performOperation('=')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          =
        </button>
      </div>
    </div>
  )
}