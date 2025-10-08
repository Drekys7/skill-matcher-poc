'use client'

import { useState } from 'react'
import { Employee, Task, AppState } from '@/types'
import EmployeeAssessment from '@/components/EmployeeAssessment'
import EmployerDashboard from '@/components/EmployerDashboard'
import MatchingResults from '@/components/MatchingResults'

export default function Home() {
  const [appState, setAppState] = useState<AppState>({
    employees: [],
    tasks: [],
    mode: 'employee'
  })

  const addEmployee = (employee: Employee) => {
    setAppState(prev => ({
      ...prev,
      employees: [...prev.employees, employee],
      currentEmployee: employee,
      mode: 'dashboard'
    }))
  }

  const addTask = (task: Task) => {
    setAppState(prev => ({
      ...prev,
      tasks: [...prev.tasks, task]
    }))
  }

  const switchMode = (mode: AppState['mode']) => {
    setAppState(prev => ({ ...prev, mode }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
            Skill
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Matcher{" "}
            </span>
            PoC
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            System zur Aufgabenzuweisung für Mitarbeiter basierend auf ihren Fähigkeiten. 
            Proof of Concept zur Demonstration des Matching-Algorithmus.
          </p>
          
          {/* Statistik */}
          <div className="flex justify-center space-x-6 sm:space-x-8 mb-6 md:mb-8">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {appState.employees.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Mitarbeiter</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {appState.tasks.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Aufgaben</div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6 md:mb-8 px-4">
            <button
              onClick={() => switchMode('employee')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                appState.mode === 'employee'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              👤 Mitarbeiter
            </button>
            <button
              onClick={() => switchMode('employer')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                appState.mode === 'employer'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              💼 Arbeitgeber
            </button>
            <button
              onClick={() => switchMode('dashboard')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                appState.mode === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              📊 Ergebnisse
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4">
          {appState.mode === 'employee' && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Mitarbeiter-Fähigkeitstest
                </h2>
                <p className="text-gray-600">
                  Absolvieren Sie einen kurzen Test mit 12 Fragen, um Ihr Fähigkeitsprofil zu bestimmen
                </p>
              </div>
              <EmployeeAssessment onComplete={addEmployee} />
            </div>
          )}

          {appState.mode === 'employer' && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Aufgabenverwaltung
                </h2>
                <p className="text-gray-600">
                  Erstellen Sie Aufgaben und legen Sie Gewichte für verschiedene Fähigkeiten fest
                </p>
              </div>
              <EmployerDashboard 
                tasks={appState.tasks}
                onAddTask={addTask}
              />
            </div>
          )}

          {appState.mode === 'dashboard' && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Analyse und Empfehlungen
                </h2>
                <p className="text-gray-600">
                  Automatische Auswahl optimaler Aufgabenzuweisungen für Mitarbeiter
                </p>
              </div>
              <MatchingResults 
                employees={appState.employees}
                tasks={appState.tasks}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Skill Matcher PoC. Erstellt mit ❤️ unter Verwendung von Next.js, TypeScript & Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  )
}
