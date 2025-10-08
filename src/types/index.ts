// Категории навыков
export type SkillCategory = 'creativity' | 'technical' | 'organization' | 'communication' | 'leadership' | 'problemSolving'

// Названия категорий на немецком для UI
export const SkillCategoryNames: Record<SkillCategory, string> = {
  creativity: 'Kreativität',
  technical: 'Technische Fähigkeiten',
  organization: 'Organisation',
  communication: 'Kommunikation',
  leadership: 'Führung',
  problemSolving: 'Problemlösung'
}

// Профиль навыков сотрудника
export type SkillProfile = {
  [key in SkillCategory]: number // баллы от 0 до 100
}

// Сотрудник
export interface Employee {
  id: string
  name: string
  email: string
  skillProfile: SkillProfile
  completedAt?: Date
}

// Вопрос теста
export interface Question {
  id: number
  text: string
  category: SkillCategory
  options: {
    text: string
    points: number // баллы за этот ответ
  }[]
}

// Ответ на вопрос
export interface Answer {
  questionId: number
  selectedOption: number
  points: number
}

// Веса для задачи
export type TaskWeights = {
  [key in SkillCategory]: number // веса от 0 до 1, сумма должна быть = 1
}

// Задача от работодателя
export interface Task {
  id: string
  title: string
  description: string
  weights: TaskWeights
  createdAt: Date
}

// Результат матчинга
export interface MatchResult {
  employeeId: string
  employeeName: string
  taskId: string
  taskTitle: string
  matchScore: number // от 0 до 100
  breakdown: {
    [key in SkillCategory]: {
      employeeScore: number
      taskWeight: number
      contribution: number
    }
  }
}

// Состояние приложения
export interface AppState {
  employees: Employee[]
  tasks: Task[]
  currentEmployee?: Employee
  mode: 'employee' | 'employer' | 'dashboard'
}