'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Shield, Plus, AlertTriangle, CheckCircle, Clock, FileText, Calendar, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const mockNormative = [
  {
    id: 1,
    nome: 'GDPR',
    descrizione: 'Regolamento Generale sulla Protezione dei Dati',
    stato: 'Conforme',
    conformita: 95,
    ultimaVerifica: '2026-06-15',
    prossimaVerifica: '2026-09-15',
    responsabile: 'Anna Conti',
    requisiti: 24,
    completati: 23
  },
  {
    id: 2,
    nome: 'ISO 27001',
    descrizione: 'Sicurezza delle informazioni',
    stato: 'In Corso',
    conformita: 78,
    ultimaVerifica: '2026-05-20',
    prossimaVerifica: '2026-08-20',
    responsabile: 'Giuseppe Verdi',
    requisiti: 35,
    completati: 27
  },
  {
    id: 3,
    nome: 'ISO 9001',
    descrizione: 'Gestione qualità',
    stato: 'Conforme',
    conformita: 92,
    ultimaVerifica: '2026-06-10',
    prossimaVerifica: '2026-12-10',
    responsabile: 'Laura Bianchi',
    requisiti: 18,
    completati: 17
  },
  {
    id: 4,
    nome: 'D.Lgs 231/01',
    descrizione: 'Responsabilità amministrativa enti',
    stato: 'Attenzione',
    conformita: 65,
    ultimaVerifica: '2026-04-15',
    prossimaVerifica: '2026-07-15',
    responsabile: 'Mario Rossi',
    requisiti: 28,
    completati: 18
  }
];

const mockAudit = [
  {
    id: 1,
    tipo: 'Audit Interno',
    normativa: 'GDPR',
    data: '2026-06-15',
    auditor: 'Anna Conti',
    esito: 'Positivo',
    nonConformita: 1,
    raccomandazioni: 3
  },
  {
    id: 2,
    tipo: 'Audit Esterno',
    normativa: 'ISO 27001',
    data: '2026-05-20',
    auditor: 'Ente Certificatore',
    esito: 'Positivo con riserva',
    nonConformita: 4,
    raccomandazioni: 8
  },
  {
    id: 3,
    tipo: 'Audit Interno',
    normativa: 'ISO 9001',
    data: '2026-06-10',
    auditor: 'Laura Bianchi',
    esito: 'Positivo',
    nonConformita: 0,
    raccomandazioni: 2
  }
];

const mockAzioni = [
  { azione: 'Aggiornamento policy privacy', normativa: 'GDPR', scadenza: '2026-07-01', stato: 'In Corso', priorita: 'Alta' },
  { azione: 'Revisione controlli accesso', normativa: 'ISO 27001', scadenza: '2026-07-15', stato: 'Da Iniziare', priorita: 'Alta' },
  { azione: 'Formazione personale DPO', normativa: 'GDPR', scadenza: '2026-08-01', stato: 'In Corso', priorita: 'Media' },
  { azione: 'Audit processi qualità', normativa: 'ISO 9001', scadenza: '2026-09-01', stato: 'Pianificato', priorita: 'Bassa' },
  { azione: 'Aggiornamento MOG 231', normativa: 'D.Lgs 231/01', scadenza: '2026-07-10', stato: 'Da Iniziare', priorita: 'Alta' }
];

export default function CompliancePage() {
  const [filtroStato, setFiltroStato] = useState<string>('tutti');

  const normativeFiltrate = mockNormative.filter(norm => {
    if (filtroStato === 'tutti') return true;
    return norm.stato === filtroStato;
  });

  const conformitaMedia = (mockNormative.reduce((acc, n) => acc + n.conformita, 0) / mockNormative.length).toFixed(0);
  const azioniAperte = mockAzioni.filter(a => a.stato !== 'Completato').length;
  const auditPositivi = mockAudit.filter(a => a.esito.includes('Positivo')).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compliance"
        description="Gestione normative, audit e conformità aziendale"
        icon={Shield}
        action={{
          label: 'Nuovo Audit',
          onClick: () => alert('Pianificazione nuovo audit')
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conformità Media</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{conformitaMedia}%</div>
            <Progress value={parseInt(conformitaMedia)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Normative Monitorate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockNormative.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">{mockNormative.filter(n => n.stato === 'Conforme').length} conformi</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Azioni Aperte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{azioniAperte}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockAzioni.filter(a => a.priorita === 'Alta').length} priorità alta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Audit Superati</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{auditPositivi}/{mockAudit.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((auditPositivi / mockAudit.length) * 100).toFixed(0)}% success rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="normative" className="space-y-4">
        <TabsList>
          <TabsTrigger value="normative">Normative</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
          <TabsTrigger value="azioni">Azioni Correttive</TabsTrigger>
        </TabsList>

        {/* Tab Normative */}
        <TabsContent value="normative" className="space-y-4">
          {/* Filtri */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button
                  variant={filtroStato === 'tutti' ? 'default' : 'outline'}
                  onClick={() => setFiltroStato('tutti')}
                >
                  Tutte
                </Button>
                <Button
                  variant={filtroStato === 'Conforme' ? 'default' : 'outline'}
                  onClick={() => setFiltroStato('Conforme')}
                >
                  Conformi
                </Button>
                <Button
                  variant={filtroStato === 'In Corso' ? 'default' : 'outline'}
                  onClick={() => setFiltroStato('In Corso')}
                >
                  In Corso
                </Button>
                <Button
                  variant={filtroStato === 'Attenzione' ? 'default' : 'outline'}
                  onClick={() => setFiltroStato('Attenzione')}
                >
                  Attenzione
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista Normative */}
          <div className="grid grid-cols-1 gap-4">
            {normativeFiltrate.map((norm) => (
              <Card key={norm.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{norm.nome}</h3>
                            <Badge
                              variant={
                                norm.stato === 'Conforme'
                                  ? 'default'
                                  : norm.stato === 'Attenzione'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                            >
                              {norm.stato}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{norm.descrizione}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{norm.responsabile}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Prossima verifica: {norm.prossimaVerifica}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">{norm.conformita}%</div>
                        <div className="text-xs text-muted-foreground">Conformità</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Requisiti completati</span>
                        <span className="font-medium">{norm.completati}/{norm.requisiti}</span>
                      </div>
                      <Progress value={(norm.completati / norm.requisiti) * 100} />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Documenti
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Storico Audit
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

        {/* Tab Audit */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Storico Audit</CardTitle>
              <CardDescription>Audit interni ed esterni effettuati</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAudit.map((audit) => (
                  <div key={audit.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{audit.tipo}</h4>
                          <Badge variant="outline">{audit.normativa}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {audit.data} • {audit.auditor}
                        </div>
                      </div>
                      <Badge variant={audit.esito.includes('Positivo') ? 'default' : 'destructive'}>
                        {audit.esito}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span>{audit.nonConformita} non conformità</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span>{audit.raccomandazioni} raccomandazioni</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Azioni */}
        <TabsContent value="azioni" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Azioni Correttive e Preventive</CardTitle>
              <CardDescription>Piano di miglioramento continuo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockAzioni.map((azione, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{azione.azione}</span>
                        <Badge variant="outline">{azione.normativa}</Badge>
                        <Badge
                          variant={
                            azione.priorita === 'Alta'
                              ? 'destructive'
                              : azione.priorita === 'Media'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {azione.priorita}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Scadenza: {azione.scadenza}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          azione.stato === 'In Corso'
                            ? 'default'
                            : azione.stato === 'Da Iniziare'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {azione.stato}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Dettagli
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
