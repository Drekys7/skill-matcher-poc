'use client'

import { Employee, Task, MatchResult, SkillCategoryNames } from '@/types'
import { SkillMatcher } from '@/lib/skillMatcher'

interface MatchingResultsProps {
  employees: Employee[]
  tasks: Task[]
}

export default function MatchingResults({ employees, tasks }: MatchingResultsProps) {
  if (employees.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <p className="text-gray-500">Zuerst müssen Mitarbeiter hinzugefügt werden (Test absolvieren)</p>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <p className="text-gray-500">Zuerst müssen Aufgaben hinzugefügt werden</p>
      </div>
    )
  }

  const optimalAssignments = SkillMatcher.suggestOptimalAssignments(employees, tasks)
  const teamAnalysis = SkillMatcher.analyzeTeam(employees)

  return (
    <div className="space-y-4 sm:space-y-8">
      {/* Optimale Zuweisungen */}
      <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          🎯 Empfohlene Zuweisungen
        </h2>
        
        {optimalAssignments.assignments.length === 0 ? (
          <p className="text-gray-500">Keine passenden Zuweisungen</p>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {optimalAssignments.assignments.map((assignment, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 leading-tight">
                      <span className="block sm:inline">{assignment.employee.name}</span>
                      <span className="hidden sm:inline"> → </span>
                      <span className="block sm:inline text-blue-600">{assignment.task.title}</span>
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {assignment.task.description}
                    </p>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                      {assignment.matchScore}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">Übereinstimmung</div>
                  </div>
                </div>
                
                {/* Detaillierter Breakdown */}
                <div className="mt-3 sm:mt-4">
                  <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Fähigkeitsanalyse:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                    {Object.entries(SkillMatcher.calculateMatch(assignment.employee, assignment.task).breakdown)
                      .filter(([, data]) => data.taskWeight > 0)
                      .map(([category, data]) => (
                      <div key={category} className="bg-gray-50 p-2 rounded">
                        <div className="font-medium">{SkillCategoryNames[category as keyof typeof SkillCategoryNames]}</div>
                        <div className="text-gray-600">
                          Fähigkeit: {data.employeeScore}% | Gewicht: {data.taskWeight}%
                        </div>
                        <div className="text-green-600 font-medium">
                          Beitrag: {data.contribution}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Nicht zugewiesene Elemente */}
        {(optimalAssignments.unassignedTasks.length > 0 || optimalAssignments.unassignedEmployees.length > 0) && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2 text-sm sm:text-base">⚠️ Benötigen Aufmerksamkeit:</h4>
            {optimalAssignments.unassignedTasks.length > 0 && (
              <div className="mb-2">
                <span className="text-sm text-yellow-700">
                  Aufgaben ohne Zuweisung: {optimalAssignments.unassignedTasks.map(t => t.title).join(', ')}
                </span>
              </div>
            )}
            {optimalAssignments.unassignedEmployees.length > 0 && (
              <div>
                <span className="text-sm text-yellow-700">
                  Mitarbeiter ohne Aufgaben: {optimalAssignments.unassignedEmployees.map(e => e.name).join(', ')}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Team-Analyse */}
      {teamAnalysis && (
        <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            📊 Team-Analyse ({teamAnalysis.teamSize} Mitarbeiter)
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Stärken */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-green-600 mb-3">
                💪 Team-Stärken
              </h3>
              <div className="space-y-2">
                {teamAnalysis.topStrengths.map((strength, index) => (
                  <div key={strength.skill} className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm sm:text-base">
                      {index + 1}. {SkillCategoryNames[strength.skill]}
                    </span>
                    <span className="font-bold text-green-600 text-sm sm:text-base">
                      {strength.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verbesserungsbereiche */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-orange-600 mb-3">
                📈 Verbesserungsbereiche
              </h3>
              <div className="space-y-2">
                {teamAnalysis.areasForImprovement.map((area, index) => (
                  <div key={area.skill} className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm sm:text-base">
                      {SkillCategoryNames[area.skill]}
                    </span>
                    <span className="font-bold text-orange-600 text-sm sm:text-base">
                      {area.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Durchschnittliche Team-Kennzahlen */}
          <div className="mt-4 sm:mt-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
              Durchschnittliche Team-Kennzahlen
            </h3>
            <div className="space-y-3">
              {Object.entries(teamAnalysis.averageSkills).map(([category, score]) => (
                <div key={category} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <div className="w-full sm:w-32 text-xs sm:text-sm text-gray-600 font-medium sm:font-normal">
                    {SkillCategoryNames[category as keyof typeof SkillCategoryNames]}:
                  </div>
                  <div className="flex-1 sm:mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-xs sm:text-sm font-medium text-gray-700 self-end sm:self-auto">
                    {score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Matrix aller Übereinstimmungen */}
      <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          🔍 Detaillierte Übereinstimmungsanalyse
        </h2>
        
        <div className="space-y-4 sm:space-y-6">
          {tasks.map(task => {
            const candidates = SkillMatcher.findBestCandidates(employees, task, 3)
            return (
              <div key={task.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  📋 {task.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">{task.description}</p>
                
                <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                  Beste Kandidaten:
                </div>
                <div className="space-y-2">
                  {candidates.map((candidate, index) => (
                    <div key={candidate.employeeId} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <div>
                        <span className="font-medium text-sm sm:text-base">
                          {index + 1}. {candidate.employeeName}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className={`font-bold text-sm sm:text-base ${
                          candidate.matchScore >= 80 ? 'text-green-600' : 
                          candidate.matchScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {candidate.matchScore}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}