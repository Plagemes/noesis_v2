'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { FileStack, Plus, Search, Filter, Download, Eye, Trash2, FileText, FileImage, FileSpreadsheet, Folder, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockDocumenti = [
  {
    id: 1,
    nome: 'Contratto_Acme_2026.pdf',
    tipo: 'pdf',
    categoria: 'Contratti',
    dimensione: '2.4 MB',
    creato: '2026-01-15',
    modificato: '2026-06-10',
    proprietario: 'Mario Rossi',
    tags: ['contratto', 'acme', 'attivo']
  },
  {
    id: 2,
    nome: 'Report_Q2_2026.xlsx',
    tipo: 'excel',
    categoria: 'Report',
    dimensione: '1.8 MB',
    creato: '2026-04-01',
    modificato: '2026-06-23',
    proprietario: 'Laura Bianchi',
    tags: ['report', 'q2', 'finanza']
  },
  {
    id: 3,
    nome: 'Presentazione_Clienti.pptx',
    tipo: 'powerpoint',
    categoria: 'Marketing',
    dimensione: '5.2 MB',
    creato: '2026-03-10',
    modificato: '2026-06-20',
    proprietario: 'Giuseppe Verdi',
    tags: ['presentazione', 'marketing']
  },
  {
    id: 4,
    nome: 'Policy_Sicurezza_2026.pdf',
    tipo: 'pdf',
    categoria: 'Compliance',
    dimensione: '890 KB',
    creato: '2026-02-01',
    modificato: '2026-02-15',
    proprietario: 'Anna Conti',
    tags: ['policy', 'sicurezza', 'gdpr']
  },
  {
    id: 5,
    nome: 'Fattura_2026_001.pdf',
    tipo: 'pdf',
    categoria: 'Amministrazione',
    dimensione: '340 KB',
    creato: '2026-01-31',
    modificato: '2026-01-31',
    proprietario: 'Mario Rossi',
    tags: ['fattura', 'pagata']
  },
  {
    id: 6,
    nome: 'Manuale_Operatori.docx',
    tipo: 'word',
    categoria: 'HR',
    dimensione: '1.2 MB',
    creato: '2025-12-01',
    modificato: '2026-06-15',
    proprietario: 'Laura Bianchi',
    tags: ['manuale', 'formazione', 'hr']
  }
];

const mockCartelle = [
  { nome: 'Contratti', documenti: 12, dimensione: '28.5 MB' },
  { nome: 'Report', documenti: 24, dimensione: '45.2 MB' },
  { nome: 'Marketing', documenti: 8, dimensione: '62.1 MB' },
  { nome: 'Compliance', documenti: 15, dimensione: '12.8 MB' },
  { nome: 'Amministrazione', documenti: 45, dimensione: '18.9 MB' },
  { nome: 'HR', documenti: 18, dimensione: '22.4 MB' }
];

const getFileIcon = (tipo: string) => {
  switch (tipo) {
    case 'pdf':
      return <FileText className="h-5 w-5 text-red-500" />;
    case 'excel':
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    case 'word':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'powerpoint':
      return <FileImage className="h-5 w-5 text-orange-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

export default function DocumentiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('tutti');

  const documentiFiltrati = mockDocumenti.filter(doc => {
    const matchSearch = doc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       doc.tags.some(tag => tag.includes(searchTerm.toLowerCase()));
    const matchCategoria = filtroCategoria === 'tutti' || doc.categoria === filtroCategoria;
    return matchSearch && matchCategoria;
  });

  const totaleDocumenti = mockDocumenti.length;
  const totaleCartelle = mockCartelle.length;
  const spazioUsato = mockCartelle.reduce((acc, c) => acc + parseFloat(c.dimensione), 0).toFixed(1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documenti"
        description="Gestione documentale aziendale e archivio"
        icon={FileStack}
        action={{
          label: 'Carica Documento',
          icon: Plus,
          onClick: () => alert('Apertura upload documento')
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Totale Documenti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totaleDocumenti}</div>
            <p className="text-xs text-muted-foreground mt-1">
              In {totaleCartelle} cartelle
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Spazio Utilizzato</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{spazioUsato} MB</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-yellow-500">68%</span> di 250 MB
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Documenti Recenti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Ultimi 7 giorni
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Condivisi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              Con team e clienti
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="documenti" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documenti">Documenti</TabsTrigger>
          <TabsTrigger value="cartelle">Cartelle</TabsTrigger>
          <TabsTrigger value="recenti">Recenti</TabsTrigger>
        </TabsList>

        {/* Tab Documenti */}
        <TabsContent value="documenti" className="space-y-4">
          {/* Filtri */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cerca documenti o tag..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  <Button
                    variant={filtroCategoria === 'tutti' ? 'default' : 'outline'}
                    onClick={() => setFiltroCategoria('tutti')}
                    size="sm"
                  >
                    Tutti
                  </Button>
                  {['Contratti', 'Report', 'Marketing', 'Compliance', 'Amministrazione', 'HR'].map(cat => (
                    <Button
                      key={cat}
                      variant={filtroCategoria === cat ? 'default' : 'outline'}
                      onClick={() => setFiltroCategoria(cat)}
                      size="sm"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista Documenti */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                {documentiFiltrati.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {getFileIcon(doc.tipo)}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{doc.nome}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                          <Badge variant="outline">{doc.categoria}</Badge>
                          <span>{doc.dimensione}</span>
                          <span>•</span>
                          <span>{doc.proprietario}</span>
                          <span>•</span>
                          <span>Mod: {doc.modificato}</span>
                        </div>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {doc.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="ghost" size="icon" title="Visualizza">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Scarica">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Elimina">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Cartelle */}
        <TabsContent value="cartelle" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCartelle.map((cartella, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Folder className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 truncate">{cartella.nome}</h3>
                      <div className="text-sm text-muted-foreground">
                        <div>{cartella.documenti} documenti</div>
                        <div>{cartella.dimensione}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab Recenti */}
        <TabsContent value="recenti" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attività Recente</CardTitle>
              <CardDescription>Ultimi documenti modificati</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDocumenti
                  .sort((a, b) => new Date(b.modificato).getTime() - new Date(a.modificato).getTime())
                  .slice(0, 5)
                  .map((doc) => (
                    <div key={doc.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      {getFileIcon(doc.tipo)}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{doc.nome}</div>
                        <div className="text-sm text-muted-foreground">
                          {doc.proprietario} • {doc.modificato}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Apri
                      </Button>
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
