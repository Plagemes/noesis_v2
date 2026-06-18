'use client';

import { PageHeader } from '@/components/PageHeader';
import { GlobalKPICards } from '@/components/GlobalKPICards';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import {
  LayoutDashboard,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { alerts, turni } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const alertsRecenti = alerts.filter(a => a.stato === 'Aperto').slice(0, 5);
  const prossimTurni = turni.slice(0, 5);

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="Dashboard"
        description="Panoramica generale del centro operativo"
        icon={LayoutDashboard}
      />

      <GlobalKPICards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Recenti */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alert Recenti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={alertsRecenti}
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
                  key: 'assegnatoA',
                  label: 'Assegnato',
                },
              ]}
              itemsPerPage={5}
            />
          </CardContent>
        </Card>

        {/* Prossimi Turni */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Prossimi Turni
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={prossimTurni}
              columns={[
                {
                  key: 'turno',
                  label: 'Turno',
                  render: (item) => (
                    <div>
                      <div className="font-medium">{item.turno}</div>
                      <div className="text-xs text-muted-foreground">{item.dataTurno}</div>
                    </div>
                  )
                },
                {
                  key: 'statoTurno',
                  label: 'Stato',
                  render: (item) => <StatusBadge status={item.statoTurno} type="turno" />
                },
                {
                  key: 'personeRichieste',
                  label: 'Persone',
                },
              ]}
              itemsPerPage={5}
            />
          </CardContent>
        </Card>
      </div>

      {/* Statistiche Rapide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Margini Commesse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30.2%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Media margine previsto su commesse attive
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Fatturato Mese
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ 142.840</div>
            <p className="text-xs text-muted-foreground mt-1">
              Giugno 2026 - in crescita
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Copertura Servizi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Media copertura turni su servizi attivi
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
