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
import { Briefcase, CheckCircle, DollarSign, TrendingUp } from 'lucide-react';
import { servizi } from '@/lib/mock-data';
import type { Servizio } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ServiziPage() {
  const [selectedServizio, setSelectedServizio] = useState<Servizio | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const totaleServizi = servizi.length;
  const serviziInCorso = servizi.filter(s => s.stato === 'In corso').length;
  const serviziFatturati = servizi.filter(s => s.stato === 'Fatturato').length;
  const coperturaMedia = Math.round(
    servizi.reduce((acc, s) => acc + s.coperturaTurno, 0) / servizi.length
  );

  const handleRowClick = (servizio: Servizio) => {
    setSelectedServizio(servizio);
    setShowDialog(true);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <PageHeader
      <GlobalKPICards />
        title="Servizi"
      <GlobalKPICards />
        description="Gestione completa dei servizi erogati"
      <GlobalKPICards />
        icon={Briefcase}
      <GlobalKPICards />
        action={{
      <GlobalKPICards />
          label: 'Nuovo Servizio',
      <GlobalKPICards />
          onClick: () => alert('Funzionalità in sviluppo')
      <GlobalKPICards />
        }}
      <GlobalKPICards />
      />
      <GlobalKPICards />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Totale Servizi"
          value={totaleServizi}
          icon={Briefcase}
          description="Servizi totali attivi"
          variant="default"
        />
        <KPICard
          title="In Corso"
          value={serviziInCorso}
          icon={TrendingUp}
          description="Servizi attualmente attivi"
          variant="default"
        />
        <KPICard
          title="Fatturati"
          value={serviziFatturati}
          icon={DollarSign}
          description="Servizi completati e fatturati"
          variant="success"
        />
        <KPICard
          title="Copertura Media"
          value={`${coperturaMedia}%`}
          icon={CheckCircle}
          description="Copertura turni media"
          variant={coperturaMedia >= 90 ? 'success' : 'warning'}
        />
      </div>

      {/* Tabella Servizi */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Elenco Servizi</h2>
        <DataTable
          data={servizi}
          columns={[
            {
              key: 'nome',
              label: 'Nome Servizio',
              render: (item) => (
                <div>
                  <div className="font-medium">{item.nome}</div>
                  <div className="text-xs text-muted-foreground">{item.tipoServizio}</div>
                </div>
              )
            },
            {
              key: 'cliente',
              label: 'Cliente',
            },
            {
              key: 'luogo',
              label: 'Luogo',
            },
            {
              key: 'dataInizio',
              label: 'Date',
              render: (item) => (
                <div className="text-sm">
                  <div>{item.dataInizio}</div>
                  <div className="text-muted-foreground">{item.dataFine}</div>
                </div>
              )
            },
            {
              key: 'personeRichieste',
              label: 'Persone',
            },
            {
              key: 'coperturaTurno',
              label: 'Copertura',
              render: (item) => (
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">{item.coperturaTurno}%</div>
                  <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        item.coperturaTurno >= 90
                          ? 'bg-green-500'
                          : item.coperturaTurno >= 70
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${item.coperturaTurno}%` }}
                    />
                  </div>
                </div>
              )
            },
            {
              key: 'stato',
              label: 'Stato',
              render: (item) => <StatusBadge status={item.stato} type="servizio" />
            },
          ]}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Dialog Dettaglio */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedServizio?.nome}</DialogTitle>
            <DialogDescription>
              Dettagli completi del servizio
            </DialogDescription>
          </DialogHeader>

          {selectedServizio && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedServizio.stato} type="servizio" />
                <Badge variant="outline">{selectedServizio.tipoServizio}</Badge>
                {selectedServizio.fatturabile && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-400">
                    Fatturabile
                  </Badge>
                )}
                {selectedServizio.fatturato && (
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-400">
                    Fatturato
                  </Badge>
                )}
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{selectedServizio.cliente}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Commessa</p>
                  <p className="font-medium">{selectedServizio.commessa}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Luogo</p>
                  <p className="font-medium">{selectedServizio.luogo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Persone Richieste</p>
                  <p className="font-medium">{selectedServizio.personeRichieste}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Data Inizio</p>
                  <p className="font-medium">{selectedServizio.dataInizio}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Fine</p>
                  <p className="font-medium">{selectedServizio.dataFine}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Copertura Turno</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        selectedServizio.coperturaTurno >= 90
                          ? 'bg-green-500'
                          : selectedServizio.coperturaTurno >= 70
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${selectedServizio.coperturaTurno}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold">{selectedServizio.coperturaTurno}%</span>
                </div>
              </div>

              {selectedServizio.noteOperative && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Note Operative</p>
                    <p className="text-sm">{selectedServizio.noteOperative}</p>
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
