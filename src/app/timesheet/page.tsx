import { GlobalKPICards } from '@/components/GlobalKPICards';
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { GlobalKPICards } from '@/components/GlobalKPICards';
import { GlobalKPICards } from '@/components/PageHeader';
import { GlobalKPICards } from '@/components/GlobalKPICards';
import { KPICard } from '@/components/KPICard';
import { DataTable } from '@/components/DataTable';
import { FileText, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { timesheet } from '@/lib/mock-data';
import type { Timesheet } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function TimesheetPage() {
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const oreTotali = timesheet.reduce((acc, t) => acc + t.oreTotali, 0);
  const daApprovare = timesheet.filter(t => !t.approvato).length;
  const approvati = timesheet.filter(t => t.approvato).length;
  const compensoTotale = timesheet.reduce((acc, t) => acc + t.compensoTurno, 0);

  const handleRowClick = (item: Timesheet) => {
    setSelectedTimesheet(item);
    setShowDialog(true);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <PageHeader
      <GlobalKPICards />
        title="Timesheet"
      <GlobalKPICards />
        description="Registrazione e approvazione ore lavorate"
      <GlobalKPICards />
        icon={FileText}
      <GlobalKPICards />
        action={{
      <GlobalKPICards />
          label: 'Nuovo Timesheet',
      <GlobalKPICards />
          onClick: () => alert('Funzionalità in sviluppo')
      <GlobalKPICards />
        }}
      <GlobalKPICards />
      />
      <GlobalKPICards />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Ore Totali"
          value={oreTotali}
          icon={Clock}
          description="Ore registrate nel periodo"
          variant="default"
        />
        <KPICard
          title="Da Approvare"
          value={daApprovare}
          icon={FileText}
          description="Timesheet in attesa"
          variant={daApprovare > 0 ? 'warning' : 'success'}
        />
        <KPICard
          title="Approvati"
          value={approvati}
          icon={CheckCircle}
          description="Timesheet confermati"
          variant="success"
        />
        <KPICard
          title="Compenso Totale"
          value={`€ ${compensoTotale.toFixed(2)}`}
          icon={DollarSign}
          description="Totale compensi periodo"
          variant="default"
        />
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Elenco Timesheet</h2>
        <DataTable
          data={timesheet}
          columns={[
            {
              key: 'operatore',
              label: 'Operatore',
              render: (item) => (
                <div>
                  <div className="font-medium">{item.operatore}</div>
                  <div className="text-xs text-muted-foreground">{item.servizio}</div>
                </div>
              )
            },
            {
              key: 'data',
              label: 'Data',
            },
            {
              key: 'oreTotali',
              label: 'Ore',
              render: (item) => `${item.oreTotali}h`
            },
            {
              key: 'compensoTurno',
              label: 'Compenso',
              render: (item) => `€ ${item.compensoTurno.toFixed(2)}`
            },
            {
              key: 'approvato',
              label: 'Approvato',
              render: (item) => (
                <Badge
                  variant={item.approvato ? 'default' : 'secondary'}
                  className={
                    item.approvato
                      ? 'bg-green-500/10 text-green-400 border-green-500/50'
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50'
                  }
                >
                  {item.approvato ? 'Approvato' : 'In attesa'}
                </Badge>
              )
            },
            {
              key: 'fatturabile',
              label: 'Fatturabile',
              render: (item) => (
                item.fatturabile ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <span className="text-muted-foreground">-</span>
                )
              )
            },
          ]}
          onRowClick={handleRowClick}
        />
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Timesheet - {selectedTimesheet?.operatore}</DialogTitle>
            <DialogDescription>Dettagli registrazione ore</DialogDescription>
          </DialogHeader>

          {selectedTimesheet && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge
                  variant={selectedTimesheet.approvato ? 'default' : 'secondary'}
                  className={
                    selectedTimesheet.approvato
                      ? 'bg-green-500/10 text-green-400 border-green-500/50'
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50'
                  }
                >
                  {selectedTimesheet.approvato ? 'Approvato' : 'In attesa'}
                </Badge>
                {selectedTimesheet.fatturabile && (
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400">
                    Fatturabile
                  </Badge>
                )}
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Turno</p>
                  <p className="font-medium">{selectedTimesheet.turno}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-medium">{selectedTimesheet.data}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Servizio</p>
                  <p className="font-medium">{selectedTimesheet.servizio}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Commessa</p>
                  <p className="font-medium">{selectedTimesheet.commessa}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ore Totali</p>
                  <p className="font-medium">{selectedTimesheet.oreTotali} ore</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pausa</p>
                  <p className="font-medium">{selectedTimesheet.pausaMinuti} minuti</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tariffa Costo</p>
                  <p className="font-medium">€ {selectedTimesheet.tariffaCosto.toFixed(2)}/h</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Compenso Turno</p>
                  <p className="font-medium text-lg">€ {selectedTimesheet.compensoTurno.toFixed(2)}</p>
                </div>
              </div>
              {selectedTimesheet.note && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Note</p>
                    <p className="text-sm">{selectedTimesheet.note}</p>
                  </div>
                </>
              )}
              <Separator />
              <div className="flex gap-2">
                {!selectedTimesheet.approvato ? (
                  <>
                    <Button onClick={() => {
                      alert('Timesheet approvato con successo!');
                      setShowDialog(false);
                    }}>
                      Approva Timesheet
                    </Button>
                    <Button variant="outline" onClick={() => alert('Email di richiesta modifiche inviata')}>
                      Richiedi Modifiche
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => {
                    alert('Timesheet rimosso approvazione');
                    setShowDialog(false);
                  }}>
                    Rimuovi Approvazione
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
