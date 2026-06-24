# FIX URGENTE - ERRORE BUILD

## 🔴 PROBLEMA
7 file corrotti con `<GlobalKPICards />` inserite DENTRO i props di `<PageHeader>`

## 📁 FILE DA FIXARE
```
src/app/servizi/page.tsx
src/app/turni/page.tsx  
src/app/operatori/page.tsx
src/app/timesheet/page.tsx
src/app/amministrazione/page.tsx
src/app/alert/page.tsx
src/app/commesse/page.tsx
```

## ❌ CODICE SBAGLIATO (attuale)
```tsx
<PageHeader
  <GlobalKPICards />
  title="Servizi"
  <GlobalKPICards />
  description="..."
  <GlobalKPICards />
  icon={Icon}
/>
```

## ✅ CODICE CORRETTO
```tsx
<PageHeader
  title="Servizi"
  description="..."
  icon={Icon}
/>

<GlobalKPICards />
```

## 🔧 FIX RAPIDO
Per ogni file, trovare la sezione `<PageHeader.../>` e:
1. Rimuovere TUTTE le righe `<GlobalKPICards />`
2. Aggiungere `<GlobalKPICards />` DOPO la chiusura `</PageHeader>`
3. Aggiungere import in alto: `import { GlobalKPICards } from '@/components/GlobalKPICards';`

## 🚀 DOPO IL FIX
```bash
npm run dev
# Apri http://localhost:3000
```

## ✅ STATO PROGETTO
- Repository: https://github.com/Plagemes/noesis_v2
- Commit corrotti nel repo
- Dashboard funziona (già ha GlobalKPICards)
- Calendario funziona
- 7 pagine hanno syntax error da fixare

## 📝 PRIORITÀ
1. **PRIMA**: Fix i 7 file (5 minuti)
2. Build e test
3. Commit e push fix
