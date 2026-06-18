# NOESIS OS

**Centro Operativo Aziendale** - Sistema completo per la gestione di servizi, turni, operatori, commesse, clienti, fatture e amministrazione.

## 🎯 Overview

NOESIS OS è una demo SaaS professionale pensata per PMI, cooperative, società di servizi, sicurezza, eventi e organizzazioni con personale operativo. Un gestionale completo che unisce operatività quotidiana e controllo amministrativo in un'unica piattaforma moderna ed elegante.

## ✨ Caratteristiche Principali

### 📊 Dashboard Centralizzata
- Panoramica KPI in tempo reale
- Alert e notifiche prioritarie
- Prossimi turni e scadenze
- Metriche finanziarie aggregate

### 💼 Gestione Servizi
- Stati servizio: Bozza → Confermato → In corso → Concluso → Fatturato
- Copertura turni in tempo reale
- Collegamento commesse e clienti
- Note operative e documentazione

### ⏰ Pianificazione Turni
- Stati turno: Da coprire → Parziale → Coperto → Svolto
- Assegnazione operatori
- Gestione supervisori
- Monitoraggio copertura

### 👥 Operatori / HR
- Anagrafica completa personale
- Documenti e certificazioni
- Lingue, patenti, divise
- Categorie protette

### 📝 Timesheet & Approvazioni
- Registrazione ore lavorate
- Workflow approvazione
- Calcolo compensi
- Tariffe e costi

### 💰 Amministrazione & Fatture
- Emissione fatture
- Tracking pagamenti
- Solleciti automatici
- Stati: Bozza → Emessa → In scadenza → Sollecitata → Scaduta → Pagata

### 📢 Alert Center
- Priorità: Bassa → Media → Alta → URGENTE
- Tipologie: Sistema, Operativo, Amministrativo, HR, Scadenze
- Assegnazioni e stati
- Notifiche contestuali

### 📁 Commesse & Project Management
- Tipologie: Straordinario, Continuativo, Appalto, Evento singolo
- Margini previsti vs consuntivi
- Ricavi e costi
- Stati avanzamento

### 🤖 AI Assistant (Demo)
- Interfaccia chat intelligente
- Risposte contestuali su:
  - Turni scoperti
  - Fatture in scadenza
  - Margini commesse
  - Certificazioni operatori

## 🛠️ Stack Tecnologico

- **Framework**: Next.js 14 (App Router)
- **Linguaggio**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 🚀 Quick Start

### Prerequisiti
- Node.js 18.17 o superiore
- npm o yarn

### Installazione

\`\`\`bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
\`\`\`

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## 📁 Struttura Progetto

\`\`\`
noesis-os/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── page.tsx            # Dashboard
│   │   ├── servizi/            # Gestione Servizi
│   │   ├── turni/              # Pianificazione Turni
│   │   ├── operatori/          # HR & Personale
│   │   ├── timesheet/          # Registrazione Ore
│   │   ├── amministrazione/    # Fatture & Pagamenti
│   │   ├── alert/              # Alert Center
│   │   ├── commesse/           # Project Management
│   │   └── ai-assistant/       # AI Assistant Demo
│   ├── components/             # React Components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Sidebar.tsx         # Navigation
│   │   ├── PageHeader.tsx      # Page headers
│   │   ├── KPICard.tsx         # KPI cards
│   │   ├── DataTable.tsx       # Data tables
│   │   └── StatusBadge.tsx     # Status badges
│   └── lib/                    # Utilities
│       ├── types.ts            # TypeScript types
│       ├── mock-data.ts        # Mock data
│       └── utils.ts            # Helper functions
└── public/                     # Static assets
\`\`\`

## 🎨 Design System

### Tema
- **Mode**: Dark (default)
- **Palette**: Enterprise-grade con accenti blu/viola
- **Typography**: Geist Sans (UI) + Geist Mono (code)
- **Border Radius**: 0.625rem
- **Spacing**: Sistema 4px

## 🔧 Scripts Disponibili

\`\`\`bash
# Sviluppo
npm run dev          # Avvia dev server (porta 3000)

# Build
npm run build        # Build produzione
npm run start        # Avvia server produzione

# Linting
npm run lint         # Verifica codice con ESLint
\`\`\`

## 📱 Responsive Design

- **Desktop**: Layout completo con sidebar espansa
- **Tablet**: Sidebar collassabile, tabelle responsive
- **Mobile**: Menu hamburger, card view per tabelle, layout verticale

## 🎯 Casi d'Uso

### Società di Sicurezza
- Gestione turni vigilanza
- Certificazioni operatori (antincendio, primo soccorso)
- Fatturazione servizi
- Margini per commessa

### Eventi & Steward
- Pianificazione eventi
- Assegnazione steward
- Timesheet giornalieri
- Gestione compensi

### Cooperative Servizi
- Gestione soci lavoratori
- Turni continuativi e straordinari
- Compliance categorie protette
- Fatturazione clienti

### PMI Servizi Operativi
- Commesse multiple
- Gestione risorse umane
- Controllo margini
- Alert scadenze

## 📄 Licenza

Progetto demo - Tutti i dati sono fittizi.

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS and shadcn/ui**
