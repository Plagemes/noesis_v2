'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { KPICard } from '@/components/KPICard';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { Bell, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { alerts } from '@/lib/mock-data';
import type { Alert } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function AlertPage() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const alertUrgenti = alerts.filter(a => a.priorita === 'URGENTE').length;
  const alertAlta = alerts.filter(a => a.priorita === 'Alta').length;
  const alertMedia = alerts.filter(a => a.priorita === 'Media').length;
  const alertAperti = alerts.filter(a => a.stato === 'Aperto').length;

  const handleRowClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setShowDialog(true);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="Alert Center"
        description="Centro notifiche e alert di sistema"
        icon={Bell}
        action={{
          label: 'Nuovo Alert',
          onClick: () => alert('Funzionalità in sviluppo')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="URGENTE"
          value={alertUrgenti}
          icon={AlertTriangle}
          description="Richiedono azione immediata"
          variant={alertUrgenti > 0 ? 'danger' : 'success'}
        />
        <KPICard
          title="Alta Priorità"
          value={alertAlta}
          icon={AlertCircle}
          description="Da gestire rapidamente"
          variant={alertAlta > 0 ? 'warning' : 'success'}
        />
        <KPICard
          title="Media Priorità"
          value={alertMedia}
          icon={Info}
          description="Da monitorare"
          variant="default"
        />
        <KPICard
          title="Aperti"
          value={alertAperti}
          icon={Bell}
          description="Alert totali aperti"
          variant={alertAperti > 5 ? 'warning' : 'default'}
        />
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Elenco Alert</h2>
        <DataTable
          data={alerts}
          columns={[
            {
              key: 'alert',
              label: 'Alert',
              render: (item) => (
                <div>
                  <div className="font-medium">{item.alert}</div>
                  <div className="text-xs text-muted-foreground">{item.tipoAlert}</div>
                </div>
              )
            },
            {
              key: 'priorita',
              label: 'Priorità',
              render: (item) => <StatusBadge status={item.priorita} type="alert" />
            },
            {
              key: 'dataTrigger',
              label: 'Data',
            },
            {
              key: 'assegnatoA',
              label: 'Assegnato',
            },
            {
              key: 'stato',
              label: 'Stato',
              render: (item) => (
                <Badge
                  variant={item.stato === 'Risolto' || item.stato === 'Chiuso' ? 'default' : 'secondary'}
                  className={
                    item.stato === 'Risolto' || item.stato === 'Chiuso'
                      ? 'bg-green-500/10 text-green-400 border-green-500/50'
                      : item.stato === 'In gestione'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/50'
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50'
                  }
                >
                  {item.stato}
                </Badge>
              )
            },
          ]}
          onRowClick={handleRowClick}
        />
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedAlert?.alert}</DialogTitle>
            <DialogDescription>Dettagli completi alert</DialogDescription>
          </DialogHeader>

          {selectedAlert && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedAlert.priorita} type="alert" />
                <Badge variant="outline">{selectedAlert.tipoAlert}</Badge>
                <Badge
                  variant={selectedAlert.stato === 'Risolto' || selectedAlert.stato === 'Chiuso' ? 'default' : 'secondary'}
                  className={
                    selectedAlert.stato === 'Risolto' || selectedAlert.stato === 'Chiuso'
                      ? 'bg-green-500/10 text-green-400 border-green-500/50'
                      : selectedAlert.stato === 'In gestione'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/50'
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50'
                  }
                >
                  {selectedAlert.stato}
                </Badge>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Data Trigger</p>
                  <p className="font-medium">{selectedAlert.dataTrigger}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assegnato A</p>
                  <p className="font-medium">{selectedAlert.assegnatoA}</p>
                </div>
                {selectedAlert.cliente && (
                  <div>
                    <p className="text-sm text-muted-foreground">Cliente</p>
                    <p className="font-medium">{selectedAlert.cliente}</p>
                  </div>
                )}
                {selectedAlert.commessa && (
                  <div>
                    <p className="text-sm text-muted-foreground">Commessa</p>
                    <p className="font-medium">{selectedAlert.commessa}</p>
                  </div>
                )}
                {selectedAlert.servizio && (
                  <div>
                    <p className="text-sm text-muted-foreground">Servizio</p>
                    <p className="font-medium">{selectedAlert.servizio}</p>
                  </div>
                )}
                {selectedAlert.operatore && (
                  <div>
                    <p className="text-sm text-muted-foreground">Operatore</p>
                    <p className="font-medium">{selectedAlert.operatore}</p>
                  </div>
                )}
              </div>
              {selectedAlert.note && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Note</p>
                    <p className="text-sm">{selectedAlert.note}</p>
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
