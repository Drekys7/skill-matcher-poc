import { Question, SkillCategory } from '@/types'

export const questionnaire: Question[] = [
  // Kreativität
  {
    id: 1,
    text: "Wie gehen Sie normalerweise bei der Lösung neuer Aufgaben vor?",
    category: 'creativity',
    options: [
      { text: "Ich nutze bewährte Methoden", points: 2 },
      { text: "Ich suche nach neuen, unkonventionellen Ansätzen", points: 5 },
      { text: "Ich kombiniere alte und neue Methoden", points: 3 },
      { text: "Ich frage Kollegen um Rat", points: 1 }
    ]
  },
  {
    id: 2,
    text: "Was zieht Sie bei der Arbeit am meisten an?",
    category: 'creativity',
    options: [
      { text: "Klare Anweisungen und Algorithmen", points: 1 },
      { text: "Die Möglichkeit zu experimentieren", points: 5 },
      { text: "Teamarbeit", points: 2 },
      { text: "Das Erreichen konkreter Ergebnisse", points: 3 }
    ]
  },

  // Technische Fähigkeiten
  {
    id: 3,
    text: "Wie schnell lernen Sie neue Technologien?",
    category: 'technical',
    options: [
      { text: "Sehr schnell, ich lerne gerne Neues", points: 5 },
      { text: "Ziemlich schnell, wenn es nötig ist", points: 4 },
      { text: "Mittelmäßig, ich bevorzuge vertraute Tools", points: 2 },
      { text: "Langsam, es ist schwer umzulernen", points: 1 }
    ]
  },
  {
    id: 4,
    text: "Wie stehen Sie zu komplexen technischen Aufgaben?",
    category: 'technical',
    options: [
      { text: "Das ist meine Herausforderung, ich löse sie gerne", points: 5 },
      { text: "Interessant, aber ich brauche Unterstützung", points: 3 },
      { text: "Ich bevorzuge einfachere Aufgaben", points: 1 },
      { text: "Ich bin bereit sie zu verstehen, wenn nötig", points: 4 }
    ]
  },

  // Organisation
  {
    id: 5,
    text: "Wie planen Sie Ihre Arbeit?",
    category: 'organization',
    options: [
      { text: "Ich erstelle im Voraus detaillierte Pläne", points: 5 },
      { text: "Ich plane allgemeine Aufgaben, Details unterwegs", points: 3 },
      { text: "Ich arbeite situativ", points: 1 },
      { text: "Ich nutze Aufgabenmanagementsysteme", points: 4 }
    ]
  },
  {
    id: 6,
    text: "Wie führen Sie Dokumentation?",
    category: 'organization',
    options: [
      { text: "Ich führe immer eine detaillierte Dokumentation", points: 5 },
      { text: "Ich dokumentiere die wichtigsten Punkte", points: 3 },
      { text: "Minimale Dokumentation", points: 1 },
      { text: "Ich dokumentiere nur auf Anfrage", points: 2 }
    ]
  },

  // Kommunikation
  {
    id: 7,
    text: "Wie bevorzugen Sie Feedback zu erhalten?",
    category: 'communication',
    options: [
      { text: "Schriftlich", points: 2 },
      { text: "In persönlichen Gesprächen", points: 4 },
      { text: "Bei Team-Meetings", points: 5 },
      { text: "Über Messenger", points: 3 }
    ]
  },
  {
    id: 8,
    text: "Wie erklären Sie komplexe Konzepte?",
    category: 'communication',
    options: [
      { text: "Ich verwende Analogien und Beispiele", points: 5 },
      { text: "Ich zeichne Schemas und Diagramme", points: 4 },
      { text: "Ich erkläre schrittweise", points: 3 },
      { text: "Ich sende Links zur Dokumentation", points: 1 }
    ]
  },

  // Führung
  {
    id: 9,
    text: "In Gruppenprojekten:",
    category: 'leadership',
    options: [
      { text: "Übernehme ich die Rolle des Koordinators", points: 5 },
      { text: "Schlage ich Ideen und Lösungen vor", points: 4 },
      { text: "Führe ich zugeteilte Aufgaben aus", points: 2 },
      { text: "Unterstütze ich die Initiativen anderer", points: 3 }
    ]
  },
  {
    id: 10,
    text: "Wie motivieren Sie ein Team?",
    category: 'leadership',
    options: [
      { text: "Durch persönliches Vorbild", points: 4 },
      { text: "Ich setze klare Ziele", points: 5 },
      { text: "Ich pflege eine freundliche Atmosphäre", points: 3 },
      { text: "Ich sehe das nicht als meine Aufgabe", points: 1 }
    ]
  },

  // Problemlösung
  {
    id: 11,
    text: "Wenn Sie auf ein Problem stoßen:",
    category: 'problemSolving',
    options: [
      { text: "Analysiere ich die Ursachen systematisch", points: 5 },
      { text: "Probiere ich verschiedene Lösungen aus", points: 4 },
      { text: "Bitte ich um Hilfe", points: 2 },
      { text: "Suche ich nach ähnlichen Fällen im Internet", points: 3 }
    ]
  },
  {
    id: 12,
    text: "Unter Zeitdruck:",
    category: 'problemSolving',
    options: [
      { text: "Bleibe ich ruhig und konzentriert", points: 5 },
      { text: "Arbeite ich schneller, aber die Qualität leidet", points: 2 },
      { text: "Bitte ich Kollegen um Hilfe", points: 3 },
      { text: "Werde ich gestresst und verliere Effizienz", points: 1 }
    ]
  }
]