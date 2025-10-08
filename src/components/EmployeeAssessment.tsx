'use client'

import { useState } from 'react'
import { Question, Answer, SkillProfile, SkillCategory, SkillCategoryNames, Employee } from '@/types'
import { questionnaire } from '@/data/questions'

interface EmployeeAssessmentProps {
  onComplete: (employee: Employee) => void
}

export default function EmployeeAssessment({ onComplete }: EmployeeAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [employeeName, setEmployeeName] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [skillProfile, setSkillProfile] = useState<SkillProfile | null>(null)

  const currentQuestion = questionnaire[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questionnaire.length) * 100

  const handleAnswer = (optionIndex: number) => {
    const question = currentQuestion
    const points = question.options[optionIndex].points

    const newAnswer: Answer = {
      questionId: question.id,
      selectedOption: optionIndex,
      points
    }

    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)

    if (currentQuestionIndex < questionnaire.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Тест завершен, рассчитываем результаты
      const profile = calculateSkillProfile(updatedAnswers)
      setSkillProfile(profile)
      setIsCompleted(true)
    }
  }

  const calculateSkillProfile = (answers: Answer[]): SkillProfile => {
    const categoryTotals: Record<SkillCategory, number> = {
      creativity: 0,
      technical: 0,
      organization: 0,
      communication: 0,
      leadership: 0,
      problemSolving: 0
    }

    const categoryCounts: Record<SkillCategory, number> = {
      creativity: 0,
      technical: 0,
      organization: 0,
      communication: 0,
      leadership: 0,
      problemSolving: 0
    }

    // Суммируем баллы по категориям
    answers.forEach(answer => {
      const question = questionnaire.find(q => q.id === answer.questionId)
      if (question) {
        categoryTotals[question.category] += answer.points
        categoryCounts[question.category] += 1
      }
    })

    // Вычисляем средние баллы и конвертируем в 0-100
    const profile: SkillProfile = {
      creativity: 0,
      technical: 0,
      organization: 0,
      communication: 0,
      leadership: 0,
      problemSolving: 0
    }

    Object.keys(categoryTotals).forEach(category => {
      const cat = category as SkillCategory
      const average = categoryTotals[cat] / categoryCounts[cat]
      // Конвертируем из шкалы 1-5 в 0-100
      profile[cat] = Math.round(((average - 1) / 4) * 100)
    })

    return profile
  }

  const handleComplete = () => {
    if (!skillProfile || !employeeName) return

    const employee: Employee = {
      id: Date.now().toString(),
      name: employeeName,
      email: `${employeeName.toLowerCase().replace(/\s+/g, '.')}@company.com`,
      skillProfile,
      completedAt: new Date()
    }

    onComplete(employee)
  }

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  if (isCompleted && skillProfile) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4 md:mb-6 text-center">
          Test abgeschlossen! 🎉
        </h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Ihr Fähigkeitsprofil:</h3>
          <div className="space-y-4">
            {Object.entries(skillProfile).map(([category, score]) => (
              <div key={category} className="flex items-center">
                <div className="w-40 text-sm font-medium">
                  {SkillCategoryNames[category as SkillCategory]}:
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm font-bold text-blue-600">
                  {score}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Ihr Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            onClick={handleComplete}
            disabled={!employeeName}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Ergebnis speichern
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
      {/* Fortschrittsbalken */}
      <div className="mb-4 md:mb-6">
        <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
          <span>Frage {currentQuestionIndex + 1} von {questionnaire.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Frage */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 md:mb-6 leading-tight">
          {currentQuestion.text}
        </h2>

        {/* Antwortoptionen */}
        <div className="space-y-2 sm:space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex items-start sm:items-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-300 rounded-full mr-3 flex-shrink-0 mt-0.5 sm:mt-0"></div>
                <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Zurück-Button */}
      {currentQuestionIndex > 0 && (
        <button
          onClick={goBack}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Vorherige Frage
        </button>
      )}
    </div>
  )
}