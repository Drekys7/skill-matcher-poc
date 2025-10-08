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
    <div className="space-y-8">
      {/* Optimale Zuweisungen */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🎯 Empfohlene Zuweisungen
        </h2>
        
        {optimalAssignments.assignments.length === 0 ? (
          <p className="text-gray-500">Keine passenden Zuweisungen</p>
        ) : (
          <div className="space-y-4">
            {optimalAssignments.assignments.map((assignment, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {assignment.employee.name} → {assignment.task.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {assignment.task.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {assignment.matchScore}%
                    </div>
                    <div className="text-sm text-gray-500">Übereinstimmung</div>
                  </div>
                </div>
                
                {/* Detaillierter Breakdown */}
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Fähigkeitsanalyse:
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
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
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Benötigen Aufmerksamkeit:</h4>
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
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📊 Team-Analyse ({teamAnalysis.teamSize} Mitarbeiter)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Stärken */}
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-3">
                💪 Team-Stärken
              </h3>
              <div className="space-y-2">
                {teamAnalysis.topStrengths.map((strength, index) => (
                  <div key={strength.skill} className="flex justify-between items-center">
                    <span className="text-gray-700">
                      {index + 1}. {SkillCategoryNames[strength.skill]}
                    </span>
                    <span className="font-bold text-green-600">
                      {strength.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verbesserungsbereiche */}
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3">
                📈 Verbesserungsbereiche
              </h3>
              <div className="space-y-2">
                {teamAnalysis.areasForImprovement.map((area, index) => (
                  <div key={area.skill} className="flex justify-between items-center">
                    <span className="text-gray-700">
                      {SkillCategoryNames[area.skill]}
                    </span>
                    <span className="font-bold text-orange-600">
                      {area.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Durchschnittliche Team-Kennzahlen */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Durchschnittliche Team-Kennzahlen
            </h3>
            <div className="space-y-2">
              {Object.entries(teamAnalysis.averageSkills).map(([category, score]) => (
                <div key={category} className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">
                    {SkillCategoryNames[category as keyof typeof SkillCategoryNames]}:
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-sm font-medium text-gray-700">
                    {score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Matrix aller Übereinstimmungen */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🔍 Detaillierte Übereinstimmungsanalyse
        </h2>
        
        <div className="space-y-6">
          {tasks.map(task => {
            const candidates = SkillMatcher.findBestCandidates(employees, task, 3)
            return (
              <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  📋 {task.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                
                <div className="text-sm font-medium text-gray-700 mb-3">
                  Beste Kandidaten:
                </div>
                <div className="space-y-2">
                  {candidates.map((candidate, index) => (
                    <div key={candidate.employeeId} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <div>
                        <span className="font-medium">
                          {index + 1}. {candidate.employeeName}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className={`font-bold ${
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