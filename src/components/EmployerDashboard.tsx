'use client'

import { useState } from 'react'
import { Task, TaskWeights, SkillCategory, SkillCategoryNames } from '@/types'

interface EmployerDashboardProps {
  tasks: Task[]
  onAddTask: (task: Task) => void
}

export default function EmployerDashboard({ tasks, onAddTask }: EmployerDashboardProps) {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [weights, setWeights] = useState<TaskWeights>({
    creativity: 0,
    technical: 0,
    organization: 0,
    communication: 0,
    leadership: 0,
    problemSolving: 0
  })

  const updateWeight = (category: SkillCategory, value: number) => {
    setWeights(prev => ({
      ...prev,
      [category]: value / 100
    }))
  }

  const getTotalWeight = () => {
    return Object.values(weights).reduce((sum, weight) => sum + weight, 0)
  }

  const normalizeWeights = () => {
    const total = getTotalWeight()
    if (total === 0) return weights

    const normalized: TaskWeights = {
      creativity: 0,
      technical: 0,
      organization: 0,
      communication: 0,
      leadership: 0,
      problemSolving: 0
    }

    Object.keys(weights).forEach(key => {
      const category = key as SkillCategory
      normalized[category] = weights[category] / total
    })

    return normalized
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!taskTitle.trim() || !taskDescription.trim()) {
      alert('Bitte füllen Sie alle Felder aus')
      return
    }

    const totalWeight = getTotalWeight()
    if (totalWeight === 0) {
      alert('Setzen Sie mindestens ein Gewicht größer als 0')
      return
    }

    const task: Task = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      weights: normalizeWeights(),
      createdAt: new Date()
    }

    onAddTask(task)
    
    // Сбросить форму
    setTaskTitle('')
    setTaskDescription('')
    setWeights({
      creativity: 0,
      technical: 0,
      organization: 0,
      communication: 0,
      leadership: 0,
      problemSolving: 0
    })
    setIsAddingTask(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Arbeitgeber-Dashboard 💼
          </h2>
          <button
            onClick={() => setIsAddingTask(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            + Aufgabe hinzufügen
          </button>
        </div>

        {/* Aufgabe hinzufügen Formular */}
        {isAddingTask && (
          <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-xl font-semibold mb-4">Neue Aufgabe</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aufgabenname
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Z.B.: Entwicklung einer mobilen App"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beschreibung
                </label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detaillierte Aufgabenbeschreibung..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Fähigkeitsgewichte (Summe: {Math.round(getTotalWeight() * 100)}%)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(weights).map(category => {
                    const cat = category as SkillCategory
                    const percentage = Math.round(weights[cat] * 100)
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            {SkillCategoryNames[cat]}
                          </span>
                          <span className="text-sm text-gray-600">
                            {percentage}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={percentage}
                          onChange={(e) => updateWeight(cat, parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    )
                  })}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Die Gewichte werden automatisch auf 100% normalisiert
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Aufgabe erstellen
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Aufgabenliste */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Erstellte Aufgaben ({tasks.length})
          </h3>
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Noch keine Aufgaben. Fügen Sie die erste Aufgabe hinzu!
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map(task => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {task.title}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {new Date(task.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{task.description}</p>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Fähigkeitsgewichte:
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      {Object.entries(task.weights).map(([category, weight]) => {
                        const cat = category as SkillCategory
                        const percentage = Math.round(weight * 100)
                        return percentage > 0 ? (
                          <div key={category} className="flex justify-between bg-gray-100 px-2 py-1 rounded">
                            <span>{SkillCategoryNames[cat]}:</span>
                            <span className="font-medium">{percentage}%</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}