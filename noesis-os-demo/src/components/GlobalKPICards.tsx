'use client';

import { useRouter } from 'next/navigation';
import { KPICard } from './KPICard';
import { Clock, DollarSign, Users, Briefcase } from 'lucide-react';
import { servizi, turni, fatture, operatori } from '@/lib/mock-data';

export function GlobalKPICards() {
  const router = useRouter();

  // Calcoli KPI globali
  const turniDaCoprire = turni.filter(t => t.statoTurno === 'Da coprire' || t.statoTurno === 'Parziale').length;
  const fattureInScadenza = fatture.filter(f =>
    f.statoPagamento === 'In scadenza' || f.statoPagamento === 'Sollecitata'
  ).length;
  const operatoriAttivi = operatori.filter(o => o.status === 'Attivo').length;
  const serviziInCorso = servizi.filter(s => s.stato === 'In corso').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div onClick={() => router.push('/turni')} className="cursor-pointer transform transition-transform hover:scale-105">
        <KPICard
          title="Turni da Coprire"
          value={turniDaCoprire}
          icon={Clock}
          description="Turni scoperti o parziali"
          variant={turniDaCoprire > 0 ? 'warning' : 'success'}
        />
      </div>
      <div onClick={() => router.push('/amministrazione')} className="cursor-pointer transform transition-transform hover:scale-105">
        <KPICard
          title="Fatture in Scadenza"
          value={fattureInScadenza}
          icon={DollarSign}
          description="Entro 30 giorni"
          variant={fattureInScadenza > 3 ? 'warning' : 'default'}
        />
      </div>
      <div onClick={() => router.push('/operatori')} className="cursor-pointer transform transition-transform hover:scale-105">
        <KPICard
          title="Operatori Attivi"
          value={operatoriAttivi}
          icon={Users}
          description="Personale disponibile"
          variant="success"
        />
      </div>
      <div onClick={() => router.push('/servizi')} className="cursor-pointer transform transition-transform hover:scale-105">
        <KPICard
          title="Servizi in Corso"
          value={serviziInCorso}
          icon={Briefcase}
          description="Progetti attivi"
          variant="default"
        />
      </div>
    </div>
  );
}
