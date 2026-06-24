'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BarChart3, Plus, Download, Calendar, TrendingUp, DollarSign, Users, Clock, FileText, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const mockReportDisponibili = [
  {
    id: 1,
    nome: 'Report Finanziario Q2 2026',
    tipo: 'Finanziario',
    periodo: 'Q2 2026',
    creato: '2026-06-23',
    dimensione: '2.4 MB',
    formato: 'PDF'
  },
  {
    id: 2,
    nome: 'Analisi Produttività Giugno',
    tipo: 'Operativo',
    periodo: 'Giugno 2026',
    creato: '2026-06-20',
    dimensione: '1.8 MB',
    formato: 'Excel'
  },
  {
    id: 3,
    nome: 'KPI Dashboard - Semestre 1',
    tipo: 'KPI',
    periodo: 'H1 2026',
    creato: '2026-06-15',
    dimensione: '890 KB',
    formato: 'PDF'
  },
  {
    id: 4,
    nome: 'Report Risorse Umane',
    tipo: 'HR',
    periodo: 'Giugno 2026',
    creato: '2026-06-18',
    dimensione: '1.2 MB',
    formato: 'PDF'
  }
];

const mockKPITrend = [
  { metric: 'Fatturato', attuale: '€ 245K', precedente: '€ 220K', variazione: '+11%', trend: 'up' },
  { metric: 'Margine Operativo', attuale: '32%', precedente: '28%', variazione: '+4pp', trend: 'up' },
  { metric: 'Ore Fatturabili', attuale: '1.240h', precedente: '1.180h', variazione: '+5%', trend: 'up' },
  { metric: 'Efficienza', attuale: '87%', precedente: '92%', variazione: '-5%', trend: 'down' },
  { metric: 'Soddisfazione Clienti', attuale: '4.6/5', precedente: '4.4/5', variazione: '+0.2', trend: 'up' },
  { metric: 'Turnover Personale', attuale: '8%', precedente: '12%', variazione: '-4%', trend: 'up' }
];

const mockDashboardWidgets = [
  { titolo: 'Revenue per Cliente', valore: '€ 28.5K', descrizione: 'Media mensile', icona: DollarSign },
  { titolo: 'Ore Lavorate', valore: '1.456h', descrizione: 'Questo mese', icona: Clock },
  { titolo: 'Progetti Attivi', valore: '12', descrizione: '+3 vs mese scorso', icona: BarChart3 },
  { titolo: 'Team Size', valore: '24', descrizione: 'Operatori attivi', icona: Users }
];

export default function ReportPage() {
  const [filtroTipo, setFiltroTipo] = useState<string>('tutti');

  const reportFiltrati = mockReportDisponibili.filter(report => {
    if (filtroTipo === 'tutti') return true;
    return report.tipo === filtroTipo;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Report & Analytics"
        description="Dashboard analytics, KPI e report aziendali"
        icon={BarChart3}
        action={{
          label: 'Genera Report',
          icon: Plus,
          onClick: () => alert('Generazione nuovo report')
        }}
      />

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {mockDashboardWidgets.map((widget, idx) => {
          const Icon = widget.icona;
          return (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{widget.titolo}</CardDescription>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{widget.valore}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {widget.descrizione}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard KPI</TabsTrigger>
          <TabsTrigger value="report">Report Generati</TabsTrigger>
          <TabsTrigger value="scheduled">Report Programmati</TabsTrigger>
        </TabsList>

        {/* Tab Dashboard */}
        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trend Metriche Chiave</CardTitle>
              <CardDescription>Confronto mensile delle performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockKPITrend.map((kpi, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{kpi.metric}</span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={kpi.trend === 'up' ? 'default' : 'destructive'}
                          className="flex items-center gap-1"
                        >
                          <TrendingUp className={`h-3 w-3 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                          {kpi.variazione}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Attuale</div>
                        <div className="text-2xl font-bold text-primary">{kpi.attuale}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Precedente</div>
                        <div className="text-xl font-semibold">{kpi.precedente}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Grafici Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Ultimi 6 mesi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Grafico Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuzione Progetti</CardTitle>
                <CardDescription>Per stato</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>In Corso</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Completati</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Pianificati</span>
                      <span className="font-medium">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Report Generati */}
        <TabsContent value="report" className="space-y-4">
          {/* Filtri */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button
                  variant={filtroTipo === 'tutti' ? 'default' : 'outline'}
                  onClick={() => setFiltroTipo('tutti')}
                  size="sm"
                >
                  Tutti
                </Button>
                {['Finanziario', 'Operativo', 'KPI', 'HR'].map(tipo => (
                  <Button
                    key={tipo}
                    variant={filtroTipo === tipo ? 'default' : 'outline'}
                    onClick={() => setFiltroTipo(tipo)}
                    size="sm"
                  >
                    {tipo}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lista Report */}
          <Card>
            <CardHeader>
              <CardTitle>Report Disponibili</CardTitle>
              <CardDescription>Archivio report generati</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {reportFiltrati.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{report.nome}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                          <Badge variant="outline">{report.tipo}</Badge>
                          <span>•</span>
                          <Calendar className="h-3 w-3" />
                          <span>{report.periodo}</span>
                          <span>•</span>
                          <span>{report.dimensione}</span>
                          <span>•</span>
                          <span>{report.formato}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Scarica
                      </Button>
                      <Button variant="outline" size="sm">
                        Visualizza
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Report Programmati */}
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Automatici</CardTitle>
              <CardDescription>Report generati automaticamente a intervalli regolari</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium">Report Mensile KPI</span>
                    </div>
                    <Badge variant="default">Attivo</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Frequenza: Ogni 1° del mese • Prossima esecuzione: 01/07/2026
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium">Report Settimanale Operativo</span>
                    </div>
                    <Badge variant="default">Attivo</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Frequenza: Ogni lunedì • Prossima esecuzione: 30/06/2026
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium">Report Trimestrale Finanziario</span>
                    </div>
                    <Badge variant="default">Attivo</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Frequenza: Ogni trimestre • Prossima esecuzione: 01/10/2026
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
