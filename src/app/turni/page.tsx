import { GlobalKPICards } from '@/components/GlobalKPICards';
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { GlobalKPICards } from '@/components/GlobalKPICards';
import { GlobalKPICards } from '@/components/PageHeader';
import { GlobalKPICards } from '@/components/GlobalKPICards';
import { KPICard } from '@/components/KPICard';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { Clock, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import { turni } from '@/lib/mock-data';
import type { Turno } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

export default function TurniPage() {
  const [selectedTurno, setSelectedTurno] = useState<Turno | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const turniDaCoprire = turni.filter(t => t.statoTurno === 'Da coprire').length;
  const turniParziali = turni.filter(t => t.statoTurno === 'Parziale').length;
  const turniCoperti = turni.filter(t => t.statoTurno === 'Coperto').length;
  const turniSvolti = turni.filter(t => t.statoTurno === 'Svolto').length;

  const handleRowClick = (turno: Turno) => {
    setSelectedTurno(turno);
    setShowDialog(true);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <PageHeader
      <GlobalKPICards />
        title="Turni"
      <GlobalKPICards />
        description="Pianificazione e gestione turni di lavoro"
      <GlobalKPICards />
        icon={Clock}
      <GlobalKPICards />
        action={{
      <GlobalKPICards />
          label: 'Nuovo Turno',
      <GlobalKPICards />
          onClick: () => alert('Funzionalità in sviluppo')
      <GlobalKPICards />
        }}
      <GlobalKPICards />
      />
      <GlobalKPICards />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Da Coprire"
          value={turniDaCoprire}
          icon={AlertCircle}
          description="Turni completamente scoperti"
          variant={turniDaCoprire > 0 ? 'danger' : 'success'}
        />
        <KPICard
          title="Parzialmente Coperti"
          value={turniParziali}
          icon={Calendar}
          description="Turni con copertura parziale"
          variant={turniParziali > 0 ? 'warning' : 'success'}
        />
        <KPICard
          title="Coperti"
          value={turniCoperti}
          icon={CheckCircle}
          description="Turni completamente coperti"
          variant="success"
        />
        <KPICard
          title="Svolti"
          value={turniSvolti}
          icon={Clock}
          description="Turni già completati"
          variant="default"
        />
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Elenco Turni</h2>
        <DataTable
          data={turni}
          columns={[
            {
              key: 'turno',
              label: 'Turno',
              render: (item) => (
                <div>
                  <div className="font-medium">{item.turno}</div>
                  <div className="text-xs text-muted-foreground">{item.servizio}</div>
                </div>
              )
            },
            {
              key: 'dataTurno',
              label: 'Data',
            },
            {
              key: 'durataOre',
              label: 'Durata',
              render: (item) => `${item.durataOre}h`
            },
            {
              key: 'personeRichieste',
              label: 'Persone',
            },
            {
              key: 'supervisore',
              label: 'Supervisore',
            },
            {
              key: 'statoTurno',
              label: 'Stato',
              render: (item) => <StatusBadge status={item.statoTurno} type="turno" />
            },
          ]}
          onRowClick={handleRowClick}
        />
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedTurno?.turno}</DialogTitle>
            <DialogDescription>Dettagli completi del turno</DialogDescription>
          </DialogHeader>

          {selectedTurno && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedTurno.statoTurno} type="turno" />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Servizio</p>
                  <p className="font-medium">{selectedTurno.servizio}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Turno</p>
                  <p className="font-medium">{selectedTurno.dataTurno}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Durata</p>
                  <p className="font-medium">{selectedTurno.durataOre} ore</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pausa</p>
                  <p className="font-medium">{selectedTurno.pausaMinuti} minuti</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Persone Richieste</p>
                  <p className="font-medium">{selectedTurno.personeRichieste}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Supervisore</p>
                  <p className="font-medium">{selectedTurno.supervisore}</p>
                </div>
              </div>
              {selectedTurno.note && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Note</p>
                    <p className="text-sm">{selectedTurno.note}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
