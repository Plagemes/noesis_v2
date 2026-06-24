'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { KPICard } from '@/components/KPICard';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { DollarSign, FileText, AlertCircle, TrendingUp } from 'lucide-react';
import { fatture } from '@/lib/mock-data';
import type { Fattura } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

export default function AmministrazionePage() {
  const [selectedFattura, setSelectedFattura] = useState<Fattura | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const fattureEmesse = fatture.length;
  const inScadenza = fatture.filter(f =>
    f.statoPagamento === 'In scadenza' || f.statoPagamento === 'Sollecitata'
  ).length;
  const scadute = fatture.filter(f => f.statoPagamento === 'Scaduta').length;
  const totaleIncassato = fatture
    .filter(f => f.statoPagamento === 'Pagata')
    .reduce((acc, f) => acc + f.totale, 0);

  const handleRowClick = (fattura: Fattura) => {
    setSelectedFattura(fattura);
    setShowDialog(true);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="Amministrazione"
        description="Gestione fatture e pagamenti"
        icon={DollarSign}
        action={{
          label: 'Nuova Fattura',
          onClick: () => alert('Funzionalità in sviluppo')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Fatture Emesse"
          value={fattureEmesse}
          icon={FileText}
          description="Totale fatture periodo"
          variant="default"
        />
        <KPICard
          title="In Scadenza"
          value={inScadenza}
          icon={AlertCircle}
          description="Fatture da monitorare"
          variant={inScadenza > 3 ? 'warning' : 'default'}
        />
        <KPICard
          title="Scadute"
          value={scadute}
          icon={AlertCircle}
          description="Richiedono sollecito"
          variant={scadute > 0 ? 'danger' : 'success'}
        />
        <KPICard
          title="Totale Incassato"
          value={`€ ${totaleIncassato.toLocaleString()}`}
          icon={TrendingUp}
          description="Fatture pagate"
          variant="success"
        />
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Elenco Fatture</h2>
        <DataTable
          data={fatture}
          columns={[
            {
              key: 'numeroFattura',
              label: 'N. Fattura',
              render: (item) => (
                <div>
                  <div className="font-medium">{item.numeroFattura}</div>
                  <div className="text-xs text-muted-foreground">{item.cliente}</div>
                </div>
              )
            },
            {
              key: 'servizio',
              label: 'Servizio',
            },
            {
              key: 'dataEmissione',
              label: 'Emissione',
            },
            {
              key: 'dataScadenza',
              label: 'Scadenza',
              render: (item) => (
                <div>
                  <div>{item.dataScadenza}</div>
                  {item.giorniAScadenza !== 0 && (
                    <div className={`text-xs ${item.giorniAScadenza < 0 ? 'text-red-400' : 'text-muted-foreground'}`}>
                      {item.giorniAScadenza > 0 ? `tra ${item.giorniAScadenza}gg` : `scaduta da ${Math.abs(item.giorniAScadenza)}gg`}
                    </div>
                  )}
                </div>
              )
            },
            {
              key: 'totale',
              label: 'Totale',
              render: (item) => `€ ${item.totale.toLocaleString()}`
            },
            {
              key: 'statoPagamento',
              label: 'Stato',
              render: (item) => <StatusBadge status={item.statoPagamento} type="pagamento" />
            },
          ]}
          onRowClick={handleRowClick}
        />
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Fattura {selectedFattura?.numeroFattura}</DialogTitle>
            <DialogDescription>Dettagli completi fattura</DialogDescription>
          </DialogHeader>

          {selectedFattura && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedFattura.statoPagamento} type="pagamento" />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{selectedFattura.cliente}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Commessa</p>
                  <p className="font-medium">{selectedFattura.commessa}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Servizio</p>
                  <p className="font-medium">{selectedFattura.servizio}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Emissione</p>
                  <p className="font-medium">{selectedFattura.dataEmissione}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Scadenza</p>
                  <p className="font-medium">{selectedFattura.dataScadenza}</p>
                </div>
                {selectedFattura.dataIncasso && (
                  <div>
                    <p className="text-sm text-muted-foreground">Data Incasso</p>
                    <p className="font-medium">{selectedFattura.dataIncasso}</p>
                  </div>
                )}
              </div>
              <Separator />
              <div className="space-y-2 bg-secondary/20 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Imponibile</span>
                  <span className="font-medium">€ {selectedFattura.imponibile.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IVA (22%)</span>
                  <span className="font-medium">€ {selectedFattura.iva.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Totale</span>
                  <span className="font-bold">€ {selectedFattura.totale.toLocaleString()}</span>
                </div>
              </div>
              {selectedFattura.note && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Note</p>
                    <p className="text-sm">{selectedFattura.note}</p>
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
