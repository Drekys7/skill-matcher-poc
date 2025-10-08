import { Employee, Task, MatchResult, SkillCategory } from '@/types'

export class SkillMatcher {
  /**
   * Рассчитывает совпадение между сотрудником и задачей
   * @param employee - профиль сотрудника
   * @param task - задача с весами
   * @returns результат матчинга с оценкой от 0 до 100
   */
  static calculateMatch(employee: Employee, task: Task): MatchResult {
    const breakdown: MatchResult['breakdown'] = {
      creativity: { employeeScore: 0, taskWeight: 0, contribution: 0 },
      technical: { employeeScore: 0, taskWeight: 0, contribution: 0 },
      organization: { employeeScore: 0, taskWeight: 0, contribution: 0 },
      communication: { employeeScore: 0, taskWeight: 0, contribution: 0 },
      leadership: { employeeScore: 0, taskWeight: 0, contribution: 0 },
      problemSolving: { employeeScore: 0, taskWeight: 0, contribution: 0 }
    }

    let totalScore = 0

    // Рассчитываем вклад каждой категории навыков
    Object.keys(task.weights).forEach(categoryKey => {
      const category = categoryKey as SkillCategory
      const employeeScore = employee.skillProfile[category]
      const taskWeight = task.weights[category]
      
      // Вклад этой категории = (балл сотрудника / 100) * вес задачи * 100
      const contribution = (employeeScore / 100) * taskWeight * 100
      
      breakdown[category] = {
        employeeScore,
        taskWeight: Math.round(taskWeight * 100), // в процентах для отображения
        contribution: Math.round(contribution)
      }

      totalScore += contribution
    })

    return {
      employeeId: employee.id,
      employeeName: employee.name,
      taskId: task.id,
      taskTitle: task.title,
      matchScore: Math.round(totalScore),
      breakdown
    }
  }

  /**
   * Находит лучших кандидатов для задачи
   * @param employees - список сотрудников
   * @param task - задача
   * @param limit - количество лучших кандидатов (по умолчанию 5)
   * @returns отсортированный список кандидатов
   */
  static findBestCandidates(employees: Employee[], task: Task, limit = 5): MatchResult[] {
    const matches = employees.map(employee => 
      this.calculateMatch(employee, task)
    )

    return matches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit)
  }

  /**
   * Находит лучшие задачи для сотрудника
   * @param employee - сотрудник
   * @param tasks - список задач
   * @param limit - количество лучших задач (по умолчанию 5)
   * @returns отсортированный список задач
   */
  static findBestTasks(employee: Employee, tasks: Task[], limit = 5): MatchResult[] {
    const matches = tasks.map(task => 
      this.calculateMatch(employee, task)
    )

    return matches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit)
  }

  /**
   * Создает матрицу совпадений всех сотрудников со всеми задачами
   * @param employees - список сотрудников
   * @param tasks - список задач
   * @returns матрица результатов
   */
  static createMatchMatrix(employees: Employee[], tasks: Task[]): MatchResult[][] {
    return employees.map(employee =>
      tasks.map(task => this.calculateMatch(employee, task))
    )
  }

  /**
   * Рассчитывает оптимальное распределение задач между сотрудниками
   * Простой greedy алгоритм для PoC
   * @param employees - список сотрудников
   * @param tasks - список задач
   * @returns оптимальные назначения
   */
  static suggestOptimalAssignments(employees: Employee[], tasks: Task[]): {
    assignments: Array<{
      employee: Employee
      task: Task
      matchScore: number
    }>
    unassignedTasks: Task[]
    unassignedEmployees: Employee[]
  } {
    const assignments: Array<{
      employee: Employee
      task: Task
      matchScore: number
    }> = []
    
    const availableEmployees = [...employees]
    const availableTasks = [...tasks]

    // Greedy алгоритм: назначаем задачи по максимальному скору
    while (availableEmployees.length > 0 && availableTasks.length > 0) {
      let bestEmployee: Employee | null = null
      let bestTask: Task | null = null
      let bestScore = 0
      let bestEmployeeIndex = -1
      let bestTaskIndex = -1

      // Находим лучшее совпадение среди всех доступных комбинаций
      availableEmployees.forEach((employee, empIndex) => {
        availableTasks.forEach((task, taskIndex) => {
          const match = this.calculateMatch(employee, task)
          if (match.matchScore > bestScore) {
            bestEmployee = employee
            bestTask = task
            bestScore = match.matchScore
            bestEmployeeIndex = empIndex
            bestTaskIndex = taskIndex
          }
        })
      })

      if (bestEmployee && bestTask && bestScore > 0) {
        assignments.push({
          employee: bestEmployee,
          task: bestTask,
          matchScore: bestScore
        })

        // Удаляем назначенные элементы из доступных
        availableEmployees.splice(bestEmployeeIndex, 1)
        availableTasks.splice(bestTaskIndex, 1)
      } else {
        break
      }
    }

    return {
      assignments,
      unassignedTasks: availableTasks,
      unassignedEmployees: availableEmployees
    }
  }

  /**
   * Анализирует общие тенденции в команде
   * @param employees - список сотрудников
   * @returns аналитика команды
   */
  static analyzeTeam(employees: Employee[]) {
    if (employees.length === 0) {
      return null
    }

    const averages: Record<SkillCategory, number> = {
      creativity: 0,
      technical: 0,
      organization: 0,
      communication: 0,
      leadership: 0,
      problemSolving: 0
    }

    // Рассчитываем средние значения
    Object.keys(averages).forEach(categoryKey => {
      const category = categoryKey as SkillCategory
      const total = employees.reduce((sum, emp) => sum + emp.skillProfile[category], 0)
      averages[category] = Math.round(total / employees.length)
    })

    // Находим сильные и слабые стороны команды
    const sortedSkills = Object.entries(averages)
      .sort(([,a], [,b]) => b - a)

    return {
      teamSize: employees.length,
      averageSkills: averages,
      topStrengths: sortedSkills.slice(0, 3).map(([skill, score]) => ({ skill: skill as SkillCategory, score })),
      areasForImprovement: sortedSkills.slice(-2).map(([skill, score]) => ({ skill: skill as SkillCategory, score }))
    }
  }
}