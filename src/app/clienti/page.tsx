'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Users, Plus, Search, Mail, Phone, MapPin, Building2, Calendar, DollarSign, TrendingUp, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockClienti = [
  {
    id: 1,
    nome: 'Acme Corporation',
    tipo: 'Enterprise',
    referente: 'Mario Rossi',
    email: 'mario.rossi@acme.com',
    telefono: '+39 02 1234567',
    indirizzo: 'Via Roma 123, Milano',
    contratti: 3,
    valore: '€ 250.000',
    stato: 'Attivo',
    ultimoContatto: '2026-06-20',
    sla: '99.9%',
    soddisfazione: 4.8
  },
  {
    id: 2,
    nome: 'TechStart Srl',
    tipo: 'PMI',
    referente: 'Laura Bianchi',
    email: 'l.bianchi@techstart.it',
    telefono: '+39 06 9876543',
    indirizzo: 'Viale Europa 45, Roma',
    contratti: 2,
    valore: '€ 120.000',
    stato: 'Attivo',
    ultimoContatto: '2026-06-22',
    sla: '99.5%',
    soddisfazione: 4.6
  },
  {
    id: 3,
    nome: 'Global Industries',
    tipo: 'Enterprise',
    referente: 'Giuseppe Verdi',
    email: 'g.verdi@globalind.com',
    telefono: '+39 011 5554321',
    indirizzo: 'Corso Italia 89, Torino',
    contratti: 5,
    valore: '€ 480.000',
    stato: 'Attivo',
    ultimoContatto: '2026-06-23',
    sla: '99.8%',
    soddisfazione: 4.9
  },
  {
    id: 4,
    nome: 'Retail Express',
    tipo: 'PMI',
    referente: 'Anna Conti',
    email: 'a.conti@retailex.it',
    telefono: '+39 051 2223344',
    indirizzo: 'Via Indipendenza 12, Bologna',
    contratti: 1,
    valore: '€ 65.000',
    stato: 'Trial',
    ultimoContatto: '2026-06-18',
    sla: '98.5%',
    soddisfazione: 4.2
  }
];

const mockContratti = [
  { cliente: 'Acme Corporation', tipo: 'Manutenzione', valore: '€ 80.000/anno', scadenza: '2027-12-31', stato: 'Attivo' },
  { cliente: 'Global Industries', tipo: 'Sviluppo', valore: '€ 150.000', scadenza: '2026-09-30', stato: 'In corso' },
  { cliente: 'TechStart Srl', tipo: 'Consulenza', valore: '€ 45.000', scadenza: '2026-12-31', stato: 'Attivo' },
  { cliente: 'Retail Express', tipo: 'Trial', valore: '€ 5.000', scadenza: '2026-07-31', stato: 'Trial' }
];

export default function ClientiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStato, setFiltroStato] = useState<string>('tutti');

  const clientiFiltrati = mockClienti.filter(cliente => {
    const matchSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       cliente.referente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStato = filtroStato === 'tutti' || cliente.stato === filtroStato;
    return matchSearch && matchStato;
  });

  const totaleClienti = mockClienti.length;
  const clientiAttivi = mockClienti.filter(c => c.stato === 'Attivo').length;
  const valorePortafoglio = mockClienti.reduce((acc, c) => acc + parseInt(c.valore.replace(/[€.,\s]/g, '')), 0);
  const mediasoddisfazione = (mockClienti.reduce((acc, c) => acc + c.soddisfazione, 0) / mockClienti.length).toFixed(1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clienti"
        description="Gestione clienti, contratti e relazioni commerciali"
        icon={Users}
        action={{
          label: 'Nuovo Cliente',
          onClick: () => alert('Apertura form nuovo cliente')
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Clienti Totali</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totaleClienti}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+2</span> questo mese
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Clienti Attivi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{clientiAttivi}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((clientiAttivi / totaleClienti) * 100).toFixed(0)}% del totale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Valore Portafoglio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">€ {(valorePortafoglio / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+12%</span> YoY
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Soddisfazione Media</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mediasoddisfazione} / 5</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+0.3</span> vs trimestre scorso
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="clienti" className="space-y-4">
        <TabsList>
          <TabsTrigger value="clienti">Anagrafica Clienti</TabsTrigger>
          <TabsTrigger value="contratti">Contratti</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Tab Clienti */}
        <TabsContent value="clienti" className="space-y-4">
          {/* Filtri */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cerca cliente o referente..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filtroStato === 'tutti' ? 'default' : 'outline'}
                    onClick={() => setFiltroStato('tutti')}
                  >
                    Tutti
                  </Button>
                  <Button
                    variant={filtroStato === 'Attivo' ? 'default' : 'outline'}
                    onClick={() => setFiltroStato('Attivo')}
                  >
                    Attivi
                  </Button>
                  <Button
                    variant={filtroStato === 'Trial' ? 'default' : 'outline'}
                    onClick={() => setFiltroStato('Trial')}
                  >
                    Trial
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista Clienti */}
          <div className="grid grid-cols-1 gap-4">
            {clientiFiltrati.map((cliente) => (
              <Card key={cliente.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{cliente.nome}</h3>
                          <Badge variant={cliente.stato === 'Attivo' ? 'default' : 'secondary'}>
                            {cliente.stato}
                          </Badge>
                          <Badge variant="outline">{cliente.tipo}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{cliente.referente}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{cliente.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{cliente.telefono}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Contratti</div>
                        <div className="text-lg font-bold">{cliente.contratti}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Valore</div>
                        <div className="text-lg font-bold">{cliente.valore}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">SLA</div>
                        <div className="text-lg font-bold text-green-500">{cliente.sla}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Soddisf.</div>
                        <div className="text-lg font-bold">{cliente.soddisfazione}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Contatta
                      </Button>
                      <Button variant="outline" size="sm">
                        Dettagli
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab Contratti */}
        <TabsContent value="contratti" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contratti Attivi</CardTitle>
              <CardDescription>
                Panoramica contratti e scadenze
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockContratti.map((contratto, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{contratto.cliente}</div>
                        <div className="text-sm text-muted-foreground">{contratto.tipo}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-semibold">{contratto.valore}</div>
                        <div className="text-xs text-muted-foreground">Scad: {contratto.scadenza}</div>
                      </div>
                      <Badge variant={contratto.stato === 'Attivo' ? 'default' : 'secondary'}>
                        {contratto.stato}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribuzione per Tipo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enterprise</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/2" />
                      </div>
                      <span className="text-sm font-medium">50%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">PMI</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-1/2" />
                      </div>
                      <span className="text-sm font-medium">50%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trend Acquisizione</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-500">+24%</div>
                    <div className="text-sm text-muted-foreground">Nuovi clienti Q2 2026</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
