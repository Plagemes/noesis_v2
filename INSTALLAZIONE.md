# 🚀 Installazione NOESIS OS Demo

## Requisiti Minimi

Prima di iniziare, assicurati di avere installato:

- **Node.js** versione 18 o superiore ([Download](https://nodejs.org/))
- **npm** (incluso con Node.js)
- Un browser moderno (Chrome, Firefox, Edge, Safari)

## 📦 Installazione

### 1. Estrai lo ZIP

Estrai il file `noesis-os-demo.zip` in una cartella a tua scelta, ad esempio:
```
C:\Projects\noesis-os
```

### 2. Apri il Terminale

Apri il terminale (Prompt dei comandi, PowerShell, o Git Bash) nella cartella estratta:

**Windows (Metodo veloce):**
- Apri la cartella in Esplora File
- Digita `cmd` nella barra degli indirizzi e premi Invio

**O da terminale:**
```bash
cd C:\Projects\noesis-os
```

### 3. Installa le Dipendenze

Esegui il comando:
```bash
npm install
```

Questo installerà tutti i pacchetti necessari (Next.js, React, Tailwind CSS, etc.). L'operazione richiede 1-3 minuti.

### 4. Avvia il Server di Sviluppo

Dopo l'installazione, avvia il server:
```bash
npm run dev
```

Vedrai un messaggio simile a:
```
▲ Next.js 16.2.9 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.x.x:3000
✓ Ready in 500ms
```

### 5. Apri il Browser

Apri il tuo browser e vai su:
```
http://localhost:3000
```

🎉 **La demo è ora attiva!**

## 🎯 Funzionalità della Demo

La demo include **15 sezioni complete**:

### Core System
1. **Dashboard** - Panoramica generale con KPI e statistiche
2. **AI Assistant** - Assistente virtuale intelligente

### Planning & Operations
3. **Calendario** - Vista calendario turni e appuntamenti
4. **Turni** - Pianificazione turni di lavoro
5. **Servizi** - Gestione servizi erogati
6. **Commesse** - Gestione progetti e commesse

### People Management
7. **Clienti** ✨ - Anagrafica clienti, contratti e CRM
8. **Operatori/HR** - Gestione personale operativo
9. **Timesheet** - Registrazione ore lavorate

### Business & Finance
10. **Amministrazione** - Gestione fatture e pagamenti
11. **Report** ✨ - Dashboard analytics e KPI aziendali

### Documentation & Compliance
12. **Documenti** ✨ - Archivio documentale aziendale
13. **Compliance** ✨ - Gestione normative, audit (GDPR, ISO)

### System
14. **Alert Center** - Centro notifiche e alert
15. **Impostazioni** ✨ - Configurazione sistema e profilo

## 🛠️ Comandi Disponibili

```bash
# Avvia il server di sviluppo
npm run dev

# Compila per la produzione
npm run build

# Avvia in modalità produzione (dopo build)
npm start

# Verifica codice con ESLint
npm run lint
```

## ⚠️ Risoluzione Problemi

### Porta 3000 già in uso
Se la porta 3000 è occupata, Next.js userà automaticamente la 3001, 3002, etc.

O puoi fermare il processo esistente:
```bash
# Windows
taskkill /F /IM node.exe

# Linux/Mac
killall node
```

### Errori di installazione
Se `npm install` fallisce:
```bash
# Pulisci la cache npm
npm cache clean --force

# Riprova l'installazione
npm install
```

### Errori di compilazione
Se ci sono errori TypeScript o di compilazione:
```bash
# Elimina le cartelle cache
rm -rf .next node_modules

# Reinstalla tutto
npm install
npm run dev
```

## 📝 Note

- **Dati Mock**: La demo usa dati di esempio. Non c'è un database reale.
- **Hot Reload**: Le modifiche al codice si aggiornano automaticamente nel browser.
- **Dark Mode**: La demo usa il tema scuro di default.
- **Responsive**: Ottimizzato per desktop, tablet e mobile.

## 🔗 Link Utili

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

## 💡 Prossimi Passi

Per personalizzare la demo:

1. **Modifica i dati**: Vai in `src/lib/mock-data.ts`
2. **Cambia i colori**: Modifica `src/app/globals.css`
3. **Aggiungi pagine**: Crea nuovi file in `src/app/`
4. **Modifica componenti**: Trova i componenti in `src/components/`

## 📧 Supporto

Per problemi o domande, consulta il file `FIXES_APPLIED.md` per le soluzioni ai problemi comuni.

---

**Buon lavoro con NOESIS OS! 🚀**
