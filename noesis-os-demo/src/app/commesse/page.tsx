'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { KPICard } from '@/components/KPICard';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { FolderKanban, TrendingUp, DollarSign, Target } from 'lucide-react';
import { commesse } from '@/lib/mock-data';
import type { Commessa } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function CommessePage() {
  const [selectedCommessa, setSelectedCommessa] = useState<Commessa | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const commesseAttive = commesse.filter(c => c.stato === 'In corso').length;
  const marginePrevisto = Math.round(
    commesse.reduce((acc, c) => acc + c.marginePrevisto, 0) / commesse.length
  );
  const margineConsuntivo = Math.round(
    commesse.filter(c => c.margineConsuntivo > 0).reduce((acc, c) => acc + c.margineConsuntivo, 0) /
    commesse.filter(c => c.margineConsuntivo > 0).length
  );
  const ricavoTotale = commesse.reduce((acc, c) => acc + c.ricavoPrevisto, 0);

  const handleRowClick = (commessa: Commessa) => {
    setSelectedCommessa(commessa);
    setShowDialog(true);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="Commesse"
        description="Gestione progetti e commesse clienti"
        icon={FolderKanban}
        action={{
          label: 'Nuova Commessa',
          onClick: () => alert('Funzionalità in sviluppo')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Commesse Attive"
          value={commesseAttive}
          icon={FolderKanban}
          description="Progetti in corso"
          variant="default"
        />
        <KPICard
          title="Margine Previsto"
          value={`${marginePrevisto}%`}
          icon={Target}
          description="Media margine previsto"
          variant={marginePrevisto >= 30 ? 'success' : 'warning'}
        />
        <KPICard
          title="Margine Consuntivo"
          value={`${margineConsuntivo}%`}
          icon={TrendingUp}
          description="Media margine effettivo"
          variant={margineConsuntivo >= marginePrevisto ? 'success' : 'warning'}
        />
        <KPICard
          title="Ricavo Totale"
          value={`€ ${(ricavoTotale / 1000).toFixed(0)}K`}
          icon={DollarSign}
          description="Ricavo previsto totale"
          variant="default"
        />
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Elenco Commesse</h2>
        <DataTable
          data={commesse}
          columns={[
            {
              key: 'nome',
              label: 'Commessa',
              render: (item) => (
                <div>
                  <div className="font-medium">{item.nome}</div>
                  <div className="text-xs text-muted-foreground">{item.tipoCommessa}</div>
                </div>
              )
            },
            {
              key: 'cliente',
              label: 'Cliente',
            },
            {
              key: 'dataApertura',
              label: 'Date',
              render: (item) => (
                <div className="text-sm">
                  <div>{item.dataApertura}</div>
                  <div className="text-muted-foreground">{item.dataChiusuraPrevista}</div>
                </div>
              )
            },
            {
              key: 'ricavoPrevisto',
              label: 'Ricavo',
              render: (item) => `€ ${item.ricavoPrevisto.toLocaleString()}`
            },
            {
              key: 'marginePrevisto',
              label: 'Margine Prev.',
              render: (item) => (
                <span className={item.marginePrevisto >= 30 ? 'text-green-400' : 'text-yellow-400'}>
                  {item.marginePrevisto}%
                </span>
              )
            },
            {
              key: 'margineConsuntivo',
              label: 'Margine Cons.',
              render: (item) => (
                item.margineConsuntivo > 0 ? (
                  <span className={
                    item.margineConsuntivo >= item.marginePrevisto
                      ? 'text-green-400'
                      : 'text-yellow-400'
                  }>
                    {item.margineConsuntivo}%
                  </span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )
              )
            },
            {
              key: 'stato',
              label: 'Stato',
              render: (item) => <StatusBadge status={item.stato} type="commessa" />
            },
          ]}
          onRowClick={handleRowClick}
        />
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCommessa?.nome}</DialogTitle>
            <DialogDescription>Dettagli completi commessa</DialogDescription>
          </DialogHeader>

          {selectedCommessa && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedCommessa.stato} type="commessa" />
                <Badge variant="outline">{selectedCommessa.tipoCommessa}</Badge>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{selectedCommessa.cliente}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Referente</p>
                  <p className="font-medium">{selectedCommessa.referente}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Apertura</p>
                  <p className="font-medium">{selectedCommessa.dataApertura}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chiusura Prevista</p>
                  <p className="font-medium">{selectedCommessa.dataChiusuraPrevista}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3 bg-secondary/20 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ricavo Previsto</span>
                  <span className="font-medium">€ {selectedCommessa.ricavoPrevisto.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Costo Previsto</span>
                  <span className="font-medium">€ {selectedCommessa.costoPrevisto.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Margine Previsto</span>
                  <span className={`font-bold ${selectedCommessa.marginePrevisto >= 30 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {selectedCommessa.marginePrevisto}%
                  </span>
                </div>
                {selectedCommessa.margineConsuntivo > 0 && (
                  <div className="flex justify-between">
                    <span className="font-semibold">Margine Consuntivo</span>
                    <span className={`font-bold ${
                      selectedCommessa.margineConsuntivo >= selectedCommessa.marginePrevisto
                        ? 'text-green-400'
                        : 'text-yellow-400'
                    }`}>
                      {selectedCommessa.margineConsuntivo}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
