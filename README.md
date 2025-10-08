# Skill Matcher PoC 🎯

Ein Proof of Concept für ein intelligentes Skill-Matching-System zwischen Mitarbeitern und Aufgaben.

## ✨ Features

- 👤 **Mitarbeiter-Assessment** - Interaktiver Test mit 12 Fragen zur Fähigkeitsbewertung
- � **Aufgaben-Management** - Erstellen von Aufgaben mit gewichteten Skill-Anforderungen  
- 🤖 **Smart Matching** - Automatische Zuordnung basierend auf Algorithmus
- � **Team-Analyse** - Detaillierte Auswertung der Teamstärken und -schwächen
- 🇩🇪 **Deutsche Lokalisierung** - Vollständig auf Deutsch

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript für Typsicherheit
- **Styling**: Tailwind CSS für modernes Design
- **Algorithmus**: Gewichtetes Scoring-System
- **UI/UX**: Responsive Design für alle Geräte

## 🚀 Getting Started

### Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/yourusername/skill-matcher-poc.git
cd skill-matcher-poc

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser.

### 📊 Skill-Kategorien

1. **Kreativität** - Innovative Lösungsansätze und kreatives Denken
2. **Technische Fähigkeiten** - IT-Kompetenz und technisches Know-how
3. **Organisation** - Planung, Strukturierung und Zeitmanagement
4. **Kommunikation** - Interaktion, Präsentation und Teamarbeit
5. **Führung** - Leadership und Mitarbeiterführung
6. **Problemlösung** - Analytisches Denken und Lösungsfindung

## 🎮 Verwendung

### 1. Mitarbeiter-Modus
- Klicken Sie auf "👤 Mitarbeiter"
- Beantworten Sie 12 Fragen zu verschiedenen Fähigkeitsbereichen
- Geben Sie Ihren Namen ein
- Erhalten Sie Ihr personalisiertes Fähigkeitsprofil

### 2. Arbeitgeber-Modus
- Klicken Sie auf "💼 Arbeitgeber"
- Erstellen Sie neue Aufgaben mit Beschreibung
- Legen Sie Gewichte für verschiedene Fähigkeiten fest
- Verwalten Sie alle erstellten Aufgaben

### 3. Ergebnisse & Analyse
- Klicken Sie auf "📊 Ergebnisse"
- Sehen Sie optimale Mitarbeiter-Aufgaben-Zuordnungen
- Analysieren Sie Teamstärken und Verbesserungsbereiche
- Erhalten Sie detaillierte Matching-Scores

## 📝 Available Scripts

- `npm run dev` - Entwicklungsserver starten
- `npm run build` - Produktions-Build erstellen
- `npm run start` - Produktionsserver starten
- `npm run lint` - ESLint ausführen

## 🌐 Deployment auf Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/skill-matcher-poc)

1. Forken Sie dieses Repository
2. Verbinden Sie Ihr Vercel-Account mit GitHub
3. Importieren Sie das Projekt in Vercel
4. Automatisches Deployment bei jedem Push!

## 🏗 Projekt-Struktur

```
src/
├── app/
│   ├── globals.css      # Tailwind CSS Styles
│   ├── layout.tsx       # Haupt-Layout
│   └── page.tsx         # Hauptseite mit Navigation
├── components/
│   ├── EmployeeAssessment.tsx    # Mitarbeiter-Test
│   ├── EmployerDashboard.tsx     # Arbeitgeber-Interface
│   └── MatchingResults.tsx       # Ergebnisse & Analyse
├── data/
│   └── questions.ts             # Test-Fragen (Deutsch)
├── lib/
│   └── skillMatcher.ts          # Matching-Algorithmus
└── types/
    └── index.ts                 # TypeScript Definitionen
```

## 🔧 Algorithmus

Das Matching-System verwendet einen gewichteten Scoring-Algorithmus:
- Mitarbeiter-Fähigkeiten (0-100%)
- Aufgaben-Gewichte (normalisiert zu 100%)
- **Match-Score = Σ(Fähigkeit × Gewicht)** für jede Kategorie

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

Dieses Projekt steht unter der [MIT License](LICENSE).
