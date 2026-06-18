// Tipi di entità
export type StatoServizio = 'Bozza' | 'Confermato' | 'In corso' | 'Concluso' | 'Fatturato' | 'Annullato';
export type StatoTurno = 'Da coprire' | 'Parziale' | 'Coperto' | 'Svolto' | 'Annullato';
export type StatoPagamento = 'Bozza' | 'Emessa' | 'In scadenza' | 'Sollecitata' | 'Scaduta' | 'Pagata';
export type PrioritaAlert = 'Bassa' | 'Media' | 'Alta' | 'URGENTE';
export type TipoServizio = 'Sicurezza' | 'Pronto soccorso' | 'Antincendio' | 'Steward' | 'Altro';
export type TipoCommessa = 'Straordinario' | 'Servizio continuativo' | 'Appalto' | 'Evento singolo';
export type TipoAlert = 'Sistema' | 'Operativo' | 'Amministrativo' | 'HR' | 'Scadenza';

// Servizi
export interface Servizio {
  id: string;
  nome: string;
  cliente: string;
  commessa: string;
  tipoServizio: TipoServizio;
  dataInizio: string;
  dataFine: string;
  luogo: string;
  stato: StatoServizio;
  personeRichieste: number;
  fatturabile: boolean;
  fatturato: boolean;
  coperturaTurno: number; // percentuale 0-100
  noteOperative: string;
}

// Turni
export interface Turno {
  id: string;
  turno: string;
  servizio: string;
  dataTurno: string;
  durataOre: number;
  pausaMinuti: number;
  personeRichieste: number;
  statoTurno: StatoTurno;
  supervisore: string;
  note: string;
}

// Operatori
export interface Operatore {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  residenza: string;
  codiceFiscale: string;
  iban: string;
  lingue: string[];
  patente: string;
  tagliaDivisa: string;
  status: 'Attivo' | 'In ferie' | 'Malattia' | 'Inattivo';
  categoriaProtetta: boolean;
  noteHR: string;
}

// Timesheet
export interface Timesheet {
  id: string;
  operatore: string;
  turno: string;
  servizio: string;
  commessa: string;
  data: string;
  oreTotali: number;
  pausaMinuti: number;
  tariffaCosto: number;
  compensoTurno: number;
  approvato: boolean;
  fatturabile: boolean;
  note: string;
}

// Commesse
export interface Commessa {
  id: string;
  nome: string;
  cliente: string;
  referente: string;
  tipoCommessa: TipoCommessa;
  stato: 'Aperta' | 'In corso' | 'Chiusa' | 'Sospesa';
  dataApertura: string;
  dataChiusuraPrevista: string;
  ricavoPrevisto: number;
  costoPrevisto: number;
  marginePrevisto: number;
  margineConsuntivo: number;
}

// Fatture
export interface Fattura {
  id: string;
  numeroFattura: string;
  cliente: string;
  commessa: string;
  servizio: string;
  imponibile: number;
  iva: number;
  totale: number;
  dataEmissione: string;
  dataInvio: string;
  dataScadenza: string;
  dataIncasso?: string;
  statoPagamento: StatoPagamento;
  giorniAScadenza: number;
  note: string;
}

// Alert
export interface Alert {
  id: string;
  alert: string;
  tipoAlert: TipoAlert;
  priorita: PrioritaAlert;
  stato: 'Aperto' | 'In gestione' | 'Risolto' | 'Chiuso';
  dataTrigger: string;
  assegnatoA: string;
  cliente?: string;
  commessa?: string;
  servizio?: string;
  fattura?: string;
  operatore?: string;
  note: string;
}

// Cliente
export interface Cliente {
  id: string;
  nome: string;
  ragioneSociale: string;
  partitaIva: string;
  email: string;
  telefono: string;
  indirizzo: string;
  referente: string;
}
