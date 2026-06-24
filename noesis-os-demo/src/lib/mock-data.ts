import type { Servizio, Turno, Operatore, Timesheet, Commessa, Fattura, Alert, Cliente } from './types';

// Clienti
export const clienti: Cliente[] = [
  {
    id: 'cli-001',
    nome: 'Comune di Rimini',
    ragioneSociale: 'Comune di Rimini',
    partitaIva: 'IT00304260409',
    email: 'eventi@comune.rimini.it',
    telefono: '+39 0541 704111',
    indirizzo: 'Piazza Cavour, 27 - 47921 Rimini',
    referente: 'Dott.ssa Laura Bianchi'
  },
  {
    id: 'cli-002',
    nome: 'Fiera di Rimini',
    ragioneSociale: 'Rimini Fiera S.p.A.',
    partitaIva: 'IT00139440408',
    email: 'sicurezza@riminifiera.it',
    telefono: '+39 0541 744111',
    indirizzo: 'Via Emilia, 155 - 47921 Rimini',
    referente: 'Ing. Marco Rossi'
  },
  {
    id: 'cli-003',
    nome: 'Grand Hotel',
    ragioneSociale: 'Grand Hotel Rimini S.r.l.',
    partitaIva: 'IT01234567890',
    email: 'direzione@grandhotelrimini.com',
    telefono: '+39 0541 56000',
    indirizzo: 'Parco Federico Fellini, 1 - 47921 Rimini',
    referente: 'Dott. Alessandro Verdi'
  },
  {
    id: 'cli-004',
    nome: 'Riviera Congress Centre',
    ragioneSociale: 'Riviera Eventi S.r.l.',
    partitaIva: 'IT09876543210',
    email: 'info@rivieracongress.it',
    telefono: '+39 0541 123456',
    indirizzo: 'Lungomare Murri, 13 - 47921 Rimini',
    referente: 'Dott.ssa Sofia Neri'
  }
];

// Servizi
export const servizi: Servizio[] = [
  {
    id: 'srv-001',
    nome: 'Notte Rosa 2026',
    cliente: 'Comune di Rimini',
    commessa: 'Evento Riviera',
    tipoServizio: 'Sicurezza',
    dataInizio: '2026-07-04',
    dataFine: '2026-07-05',
    luogo: 'Lungomare Rimini',
    stato: 'Confermato',
    personeRichieste: 25,
    fatturabile: true,
    fatturato: false,
    coperturaTurno: 88,
    noteOperative: 'Evento con oltre 50.000 partecipanti. Coordinamento con Polizia Locale.'
  },
  {
    id: 'srv-002',
    nome: 'TTG Travel Experience',
    cliente: 'Fiera di Rimini',
    commessa: 'Appalto Fiera 2026',
    tipoServizio: 'Steward',
    dataInizio: '2026-10-14',
    dataFine: '2026-10-16',
    luogo: 'Rimini Fiera',
    stato: 'In corso',
    personeRichieste: 18,
    fatturabile: true,
    fatturato: false,
    coperturaTurno: 100,
    noteOperative: 'Fiera internazionale del turismo. Servizio accoglienza e sicurezza.'
  },
  {
    id: 'srv-003',
    nome: 'Sicurezza Notturna Grand Hotel',
    cliente: 'Grand Hotel',
    commessa: 'Servizio continuativo GH',
    tipoServizio: 'Sicurezza',
    dataInizio: '2026-06-01',
    dataFine: '2026-09-30',
    luogo: 'Grand Hotel Rimini',
    stato: 'In corso',
    personeRichieste: 2,
    fatturabile: true,
    fatturato: false,
    coperturaTurno: 100,
    noteOperative: 'Servizio h24 per tutta la stagione estiva.'
  },
  {
    id: 'srv-004',
    nome: 'Congresso Medico Internazionale',
    cliente: 'Riviera Congress Centre',
    commessa: 'Evento singolo RCC',
    tipoServizio: 'Pronto soccorso',
    dataInizio: '2026-09-20',
    dataFine: '2026-09-22',
    luogo: 'Riviera Congress Centre',
    stato: 'Bozza',
    personeRichieste: 4,
    fatturabile: true,
    fatturato: false,
    coperturaTurno: 25,
    noteOperative: 'Richiesto personale sanitario qualificato.'
  },
  {
    id: 'srv-005',
    nome: 'Capodanno Piazza Tre Martiri',
    cliente: 'Comune di Rimini',
    commessa: 'Eventi Invernali 2026',
    tipoServizio: 'Sicurezza',
    dataInizio: '2026-12-31',
    dataFine: '2027-01-01',
    luogo: 'Piazza Tre Martiri, Rimini',
    stato: 'Confermato',
    personeRichieste: 30,
    fatturabile: true,
    fatturato: false,
    coperturaTurno: 60,
    noteOperative: 'Evento con concerto e fuochi artificio.'
  },
  {
    id: 'srv-006',
    nome: 'Rimini Wellness 2026',
    cliente: 'Fiera di Rimini',
    commessa: 'Appalto Fiera 2026',
    tipoServizio: 'Steward',
    dataInizio: '2026-05-28',
    dataFine: '2026-05-31',
    luogo: 'Rimini Fiera',
    stato: 'Concluso',
    personeRichieste: 22,
    fatturabile: true,
    fatturato: true,
    coperturaTurno: 100,
    noteOperative: 'Fiera del fitness completata con successo.'
  }
];

// Turni
export const turni: Turno[] = [
  {
    id: 'trn-001',
    turno: 'Notte Rosa - Turno Diurno 04/07',
    servizio: 'Notte Rosa 2026',
    dataTurno: '2026-07-04',
    durataOre: 8,
    pausaMinuti: 30,
    personeRichieste: 25,
    statoTurno: 'Coperto',
    supervisore: 'Marco Rossi',
    note: 'Turno dalle 14:00 alle 22:00'
  },
  {
    id: 'trn-002',
    turno: 'Notte Rosa - Turno Notturno 04/07',
    servizio: 'Notte Rosa 2026',
    dataTurno: '2026-07-04',
    durataOre: 10,
    pausaMinuti: 30,
    personeRichieste: 25,
    statoTurno: 'Parziale',
    supervisore: 'Marco Rossi',
    note: 'Turno dalle 22:00 alle 08:00. Mancano 3 persone.'
  },
  {
    id: 'trn-003',
    turno: 'TTG - Giorno 1',
    servizio: 'TTG Travel Experience',
    dataTurno: '2026-10-14',
    durataOre: 9,
    pausaMinuti: 45,
    personeRichieste: 18,
    statoTurno: 'Coperto',
    supervisore: 'Laura Bianchi',
    note: 'Turno dalle 08:00 alle 17:00'
  },
  {
    id: 'trn-004',
    turno: 'Grand Hotel - Notte 18/06',
    servizio: 'Sicurezza Notturna Grand Hotel',
    dataTurno: '2026-06-18',
    durataOre: 12,
    pausaMinuti: 60,
    personeRichieste: 2,
    statoTurno: 'Coperto',
    supervisore: 'Alessandro Verdi',
    note: 'Turno notturno dalle 20:00 alle 08:00'
  },
  {
    id: 'trn-005',
    turno: 'Congresso Medico - Giorno 1',
    servizio: 'Congresso Medico Internazionale',
    dataTurno: '2026-09-20',
    durataOre: 10,
    pausaMinuti: 60,
    personeRichieste: 4,
    statoTurno: 'Da coprire',
    supervisore: 'Sofia Neri',
    note: 'Richiesta presenza medico e infermieri'
  },
  {
    id: 'trn-006',
    turno: 'Capodanno - Sera 31/12',
    servizio: 'Capodanno Piazza Tre Martiri',
    dataTurno: '2026-12-31',
    durataOre: 8,
    pausaMinuti: 30,
    personeRichieste: 30,
    statoTurno: 'Parziale',
    supervisore: 'Marco Rossi',
    note: 'Turno dalle 18:00 alle 02:00. Coperto 18/30.'
  }
];

// Operatori
export const operatori: Operatore[] = [
  {
    id: 'op-001',
    nome: 'Marco',
    cognome: 'Rossi',
    email: 'marco.rossi@noesis.it',
    telefono: '+39 333 1234567',
    residenza: 'Rimini (RN)',
    codiceFiscale: 'RSSMRC85M10H294Z',
    iban: 'IT60X0542811101000000123456',
    lingue: ['Italiano', 'Inglese'],
    patente: 'B',
    tagliaDivisa: 'L',
    status: 'Attivo',
    categoriaProtetta: false,
    noteHR: 'Supervisore anziano, esperienza 15 anni nel settore sicurezza.'
  },
  {
    id: 'op-002',
    nome: 'Laura',
    cognome: 'Bianchi',
    email: 'laura.bianchi@noesis.it',
    telefono: '+39 347 7654321',
    residenza: 'Riccione (RN)',
    codiceFiscale: 'BNCLRA90A50H294W',
    iban: 'IT60X0542811101000000654321',
    lingue: ['Italiano', 'Inglese', 'Tedesco'],
    patente: 'B',
    tagliaDivisa: 'M',
    status: 'Attivo',
    categoriaProtetta: false,
    noteHR: 'Specializzata in gestione eventi fieristici. Certificazione Steward.'
  },
  {
    id: 'op-003',
    nome: 'Alessandro',
    cognome: 'Verdi',
    email: 'alessandro.verdi@noesis.it',
    telefono: '+39 320 1112233',
    residenza: 'Rimini (RN)',
    codiceFiscale: 'VRDLSS88C15H294M',
    iban: 'IT60X0542811101000000789012',
    lingue: ['Italiano'],
    patente: 'B, C',
    tagliaDivisa: 'XL',
    status: 'Attivo',
    categoriaProtetta: false,
    noteHR: 'Addetto sicurezza notturna strutture alberghiere.'
  },
  {
    id: 'op-004',
    nome: 'Sofia',
    cognome: 'Neri',
    email: 'sofia.neri@noesis.it',
    telefono: '+39 349 9998877',
    residenza: 'Cattolica (RN)',
    codiceFiscale: 'NRESFO92D55H294X',
    iban: 'IT60X0542811101000000345678',
    lingue: ['Italiano', 'Inglese', 'Francese'],
    patente: 'B',
    tagliaDivisa: 'S',
    status: 'Attivo',
    categoriaProtetta: false,
    noteHR: 'Infermiera qualificata per servizi pronto soccorso eventi.'
  },
  {
    id: 'op-005',
    nome: 'Giuseppe',
    cognome: 'Romano',
    email: 'giuseppe.romano@noesis.it',
    telefono: '+39 338 5556677',
    residenza: 'Misano Adriatico (RN)',
    codiceFiscale: 'RMNGPP80R20H294P',
    iban: 'IT60X0542811101000000567890',
    lingue: ['Italiano'],
    patente: 'B',
    tagliaDivisa: 'L',
    status: 'In ferie',
    categoriaProtetta: true,
    noteHR: 'In ferie fino al 30/06. Certificazione antincendio livello 2.'
  },
  {
    id: 'op-006',
    nome: 'Francesca',
    cognome: 'Conti',
    email: 'francesca.conti@noesis.it',
    telefono: '+39 345 3334455',
    residenza: 'Rimini (RN)',
    codiceFiscale: 'CNTFNC95T60H294L',
    iban: 'IT60X0542811101000000901234',
    lingue: ['Italiano', 'Inglese', 'Spagnolo'],
    patente: 'B',
    tagliaDivisa: 'M',
    status: 'Attivo',
    categoriaProtetta: false,
    noteHR: 'Steward con esperienza in grandi eventi musicali.'
  }
];

// Timesheet
export const timesheet: Timesheet[] = [
  {
    id: 'ts-001',
    operatore: 'Marco Rossi',
    turno: 'Notte Rosa - Turno Diurno 04/07',
    servizio: 'Notte Rosa 2026',
    commessa: 'Evento Riviera',
    data: '2026-07-04',
    oreTotali: 8,
    pausaMinuti: 30,
    tariffaCosto: 18.50,
    compensoTurno: 148.00,
    approvato: true,
    fatturabile: true,
    note: 'Supervisore turno diurno'
  },
  {
    id: 'ts-002',
    operatore: 'Laura Bianchi',
    turno: 'TTG - Giorno 1',
    servizio: 'TTG Travel Experience',
    commessa: 'Appalto Fiera 2026',
    data: '2026-10-14',
    oreTotali: 9,
    pausaMinuti: 45,
    tariffaCosto: 16.00,
    compensoTurno: 144.00,
    approvato: true,
    fatturabile: true,
    note: 'Servizio accoglienza stand internazionali'
  },
  {
    id: 'ts-003',
    operatore: 'Alessandro Verdi',
    turno: 'Grand Hotel - Notte 18/06',
    servizio: 'Sicurezza Notturna Grand Hotel',
    commessa: 'Servizio continuativo GH',
    data: '2026-06-18',
    oreTotali: 12,
    pausaMinuti: 60,
    tariffaCosto: 20.00,
    compensoTurno: 240.00,
    approvato: false,
    fatturabile: true,
    note: 'In attesa di approvazione supervisore'
  },
  {
    id: 'ts-004',
    operatore: 'Francesca Conti',
    turno: 'Notte Rosa - Turno Diurno 04/07',
    servizio: 'Notte Rosa 2026',
    commessa: 'Evento Riviera',
    data: '2026-07-04',
    oreTotali: 8,
    pausaMinuti: 30,
    tariffaCosto: 15.00,
    compensoTurno: 120.00,
    approvato: true,
    fatturabile: true,
    note: 'Servizio varchi accesso pubblico'
  }
];

// Commesse
export const commesse: Commessa[] = [
  {
    id: 'com-001',
    nome: 'Evento Riviera',
    cliente: 'Comune di Rimini',
    referente: 'Dott.ssa Laura Bianchi',
    tipoCommessa: 'Evento singolo',
    stato: 'In corso',
    dataApertura: '2026-05-01',
    dataChiusuraPrevista: '2026-07-31',
    ricavoPrevisto: 45000,
    costoPrevisto: 30600,
    marginePrevisto: 32,
    margineConsuntivo: 28
  },
  {
    id: 'com-002',
    nome: 'Appalto Fiera 2026',
    cliente: 'Fiera di Rimini',
    referente: 'Ing. Marco Rossi',
    tipoCommessa: 'Appalto',
    stato: 'In corso',
    dataApertura: '2026-01-15',
    dataChiusuraPrevista: '2026-12-31',
    ricavoPrevisto: 180000,
    costoPrevisto: 126000,
    marginePrevisto: 30,
    margineConsuntivo: 31
  },
  {
    id: 'com-003',
    nome: 'Servizio continuativo GH',
    cliente: 'Grand Hotel',
    referente: 'Dott. Alessandro Verdi',
    tipoCommessa: 'Servizio continuativo',
    stato: 'In corso',
    dataApertura: '2026-06-01',
    dataChiusuraPrevista: '2026-09-30',
    ricavoPrevisto: 72000,
    costoPrevisto: 50400,
    marginePrevisto: 30,
    margineConsuntivo: 29
  },
  {
    id: 'com-004',
    nome: 'Eventi Invernali 2026',
    cliente: 'Comune di Rimini',
    referente: 'Dott.ssa Laura Bianchi',
    tipoCommessa: 'Straordinario',
    stato: 'Aperta',
    dataApertura: '2026-11-01',
    dataChiusuraPrevista: '2027-01-15',
    ricavoPrevisto: 38000,
    costoPrevisto: 26600,
    marginePrevisto: 30,
    margineConsuntivo: 0
  }
];

// Fatture
export const fatture: Fattura[] = [
  {
    id: 'fat-001',
    numeroFattura: '2026/0145',
    cliente: 'Fiera di Rimini',
    commessa: 'Appalto Fiera 2026',
    servizio: 'Rimini Wellness 2026',
    imponibile: 28000,
    iva: 6160,
    totale: 34160,
    dataEmissione: '2026-06-05',
    dataInvio: '2026-06-05',
    dataScadenza: '2026-07-05',
    statoPagamento: 'In scadenza',
    giorniAScadenza: 17,
    note: 'Pagamento previsto entro fine mese'
  },
  {
    id: 'fat-002',
    numeroFattura: '2026/0132',
    cliente: 'Grand Hotel',
    commessa: 'Servizio continuativo GH',
    servizio: 'Sicurezza Notturna Grand Hotel',
    imponibile: 18000,
    iva: 3960,
    totale: 21960,
    dataEmissione: '2026-06-01',
    dataInvio: '2026-06-01',
    dataScadenza: '2026-06-16',
    dataIncasso: '2026-06-14',
    statoPagamento: 'Pagata',
    giorniAScadenza: 0,
    note: 'Pagamento ricevuto in anticipo'
  },
  {
    id: 'fat-003',
    numeroFattura: '2026/0156',
    cliente: 'Comune di Rimini',
    commessa: 'Evento Riviera',
    servizio: 'Notte Rosa 2026',
    imponibile: 35000,
    iva: 7700,
    totale: 42700,
    dataEmissione: '2026-07-10',
    dataInvio: '2026-07-10',
    dataScadenza: '2026-08-09',
    statoPagamento: 'Emessa',
    giorniAScadenza: 52,
    note: ''
  },
  {
    id: 'fat-004',
    numeroFattura: '2026/0098',
    cliente: 'Riviera Congress Centre',
    commessa: 'Evento singolo RCC',
    servizio: 'Evento Marzo 2026',
    imponibile: 5200,
    iva: 1144,
    totale: 6344,
    dataEmissione: '2026-03-25',
    dataInvio: '2026-03-25',
    dataScadenza: '2026-04-24',
    statoPagamento: 'Scaduta',
    giorniAScadenza: -55,
    note: 'Inviato sollecito il 10/05/2026'
  },
  {
    id: 'fat-005',
    numeroFattura: '2026/0120',
    cliente: 'Fiera di Rimini',
    commessa: 'Appalto Fiera 2026',
    servizio: 'TTG Travel Experience',
    imponibile: 22000,
    iva: 4840,
    totale: 26840,
    dataEmissione: '2026-05-15',
    dataInvio: '2026-05-15',
    dataScadenza: '2026-06-14',
    statoPagamento: 'Sollecitata',
    giorniAScadenza: -4,
    note: 'Cliente conferma pagamento entro fine settimana'
  }
];

// Alert
export const alerts: Alert[] = [
  {
    id: 'alt-001',
    alert: 'Turno Notte Rosa incompleto',
    tipoAlert: 'Operativo',
    priorita: 'URGENTE',
    stato: 'Aperto',
    dataTrigger: '2026-06-18',
    assegnatoA: 'Marco Rossi',
    servizio: 'Notte Rosa 2026',
    note: 'Mancano 3 operatori per turno notturno del 04/07'
  },
  {
    id: 'alt-002',
    alert: 'Fattura scaduta RCC',
    tipoAlert: 'Amministrativo',
    priorita: 'Alta',
    stato: 'In gestione',
    dataTrigger: '2026-04-25',
    assegnatoA: 'Sofia Neri',
    cliente: 'Riviera Congress Centre',
    fattura: 'fat-004',
    note: 'Secondo sollecito inviato. Cliente segnala problemi liquidità.'
  },
  {
    id: 'alt-003',
    alert: 'Certificazione antincendio in scadenza',
    tipoAlert: 'HR',
    priorita: 'Media',
    stato: 'Aperto',
    dataTrigger: '2026-06-15',
    assegnatoA: 'Laura Bianchi',
    operatore: 'Giuseppe Romano',
    note: 'Certificazione antincendio livello 2 scade il 30/07/2026'
  },
  {
    id: 'alt-004',
    alert: '5 fatture in scadenza entro 30 giorni',
    tipoAlert: 'Amministrativo',
    priorita: 'Media',
    stato: 'Aperto',
    dataTrigger: '2026-06-18',
    assegnatoA: 'Alessandro Verdi',
    note: 'Monitorare incassi per liquidità mensile'
  },
  {
    id: 'alt-005',
    alert: 'Margine commessa Evento Riviera sotto target',
    tipoAlert: 'Amministrativo',
    priorita: 'Bassa',
    stato: 'Risolto',
    dataTrigger: '2026-06-10',
    assegnatoA: 'Marco Rossi',
    commessa: 'com-001',
    note: 'Margine consuntivo 28% vs previsto 32%. Analizzato: costi straordinari imprevisti.'
  }
];
