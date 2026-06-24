'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { KPICard } from '@/components/KPICard';
import { DataTable } from '@/components/DataTable';
import { UsersRound, UserCheck, UserX, AlertCircle } from 'lucide-react';
import { operatori as initialOperatori } from '@/lib/mock-data';
import type { Operatore } from '@/lib/types';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function OperatoriPage() {
  const [operatori, setOperatori] = useState<Operatore[]>(initialOperatori);
  const [selectedOperatore, setSelectedOperatore] = useState<Operatore | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showNewDialog, setShowNewDialog] = useState(false);

  // Form state per nuovo operatore
  const [newOperatore, setNewOperatore] = useState<Partial<Operatore>>({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    residenza: '',
    codiceFiscale: '',
    iban: '',
    lingue: [],
    patente: '',
    tagliaDivisa: '',
    status: 'Attivo',
    categoriaProtetta: false,
    noteHR: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const operatoriAttivi = operatori.filter(o => o.status === 'Attivo').length;
  const operatoriInFerie = operatori.filter(o => o.status === 'In ferie').length;
  const operatoriMalattia = operatori.filter(o => o.status === 'Malattia').length;
  const categorieProtette = operatori.filter(o => o.categoriaProtetta).length;

  const handleRowClick = (operatore: Operatore) => {
    setSelectedOperatore(operatore);
    setShowDialog(true);
  };

  const handleOpenNewDialog = () => {
    setNewOperatore({
      nome: '',
      cognome: '',
      email: '',
      telefono: '',
      residenza: '',
      codiceFiscale: '',
      iban: '',
      lingue: [],
      patente: '',
      tagliaDivisa: '',
      status: 'Attivo',
      categoriaProtetta: false,
      noteHR: ''
    });
    setUploadedFiles([]);
    setShowNewDialog(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...files]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSaveNewOperatore = () => {
    if (!newOperatore.nome || !newOperatore.cognome || !newOperatore.email) {
      alert('Compila i campi obbligatori: Nome, Cognome, Email');
      return;
    }

    const nuovoOperatore: Operatore = {
      id: `op-${String(operatori.length + 1).padStart(3, '0')}`,
      nome: newOperatore.nome!,
      cognome: newOperatore.cognome!,
      email: newOperatore.email!,
      telefono: newOperatore.telefono || '',
      residenza: newOperatore.residenza || '',
      codiceFiscale: newOperatore.codiceFiscale || '',
      iban: newOperatore.iban || '',
      lingue: newOperatore.lingue || [],
      patente: newOperatore.patente || '',
      tagliaDivisa: newOperatore.tagliaDivisa || '',
      status: newOperatore.status as 'Attivo' | 'In ferie' | 'Malattia' | 'Inattivo' || 'Attivo',
      categoriaProtetta: newOperatore.categoriaProtetta || false,
      noteHR: newOperatore.noteHR || ''
    };

    setOperatori([...operatori, nuovoOperatore]);
    setShowNewDialog(false);

    // Simulazione upload documenti
    if (uploadedFiles.length > 0) {
      console.log('Documenti caricati:', uploadedFiles.map(f => f.name));
    }

    alert(`Operatore creato con successo!${uploadedFiles.length > 0 ? `\n${uploadedFiles.length} documento/i caricato/i.` : ''}`);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="Operatori / HR"
        description="Gestione risorse umane e personale operativo"
        icon={UsersRound}
        action={{
          label: 'Nuovo Operatore',
          onClick: handleOpenNewDialog
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Operatori Attivi"
          value={operatoriAttivi}
          icon={UserCheck}
          description="Personale disponibile"
          variant="success"
        />
        <KPICard
          title="In Ferie"
          value={operatoriInFerie}
          icon={UserX}
          description="Personale in ferie"
          variant="warning"
        />
        <KPICard
          title="In Malattia"
          value={operatoriMalattia}
          icon={AlertCircle}
          description="Personale assente"
          variant="danger"
        />
        <KPICard
          title="Categorie Protette"
          value={categorieProtette}
          icon={UsersRound}
          description="Compliance normativa"
          variant="default"
        />
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Elenco Operatori</h2>
        <DataTable
          data={operatori}
          columns={[
            {
              key: 'nome',
              label: 'Operatore',
              render: (item) => (
                <div>
                  <div className="font-medium">{item.nome} {item.cognome}</div>
                  <div className="text-xs text-muted-foreground">{item.email}</div>
                </div>
              )
            },
            {
              key: 'telefono',
              label: 'Telefono',
            },
            {
              key: 'residenza',
              label: 'Residenza',
            },
            {
              key: 'lingue',
              label: 'Lingue',
              render: (item) => item.lingue.join(', ')
            },
            {
              key: 'status',
              label: 'Status',
              render: (item) => (
                <Badge
                  variant={item.status === 'Attivo' ? 'default' : 'secondary'}
                  className={
                    item.status === 'Attivo'
                      ? 'bg-green-500/10 text-green-400 border-green-500/50'
                      : item.status === 'In ferie'
                      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50'
                      : 'bg-red-500/10 text-red-400 border-red-500/50'
                  }
                >
                  {item.status}
                </Badge>
              )
            },
          ]}
          onRowClick={handleRowClick}
        />
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedOperatore?.nome} {selectedOperatore?.cognome}
            </DialogTitle>
            <DialogDescription>Dati completi operatore</DialogDescription>
          </DialogHeader>

          {selectedOperatore && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge
                  variant={selectedOperatore.status === 'Attivo' ? 'default' : 'secondary'}
                  className={
                    selectedOperatore.status === 'Attivo'
                      ? 'bg-green-500/10 text-green-400 border-green-500/50'
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50'
                  }
                >
                  {selectedOperatore.status}
                </Badge>
                {selectedOperatore.categoriaProtetta && (
                  <Badge variant="outline">Categoria Protetta</Badge>
                )}
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedOperatore.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefono</p>
                  <p className="font-medium">{selectedOperatore.telefono}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Residenza</p>
                  <p className="font-medium">{selectedOperatore.residenza}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Codice Fiscale</p>
                  <p className="font-medium">{selectedOperatore.codiceFiscale}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">IBAN</p>
                  <p className="font-medium text-xs">{selectedOperatore.iban}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Patente</p>
                  <p className="font-medium">{selectedOperatore.patente}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taglia Divisa</p>
                  <p className="font-medium">{selectedOperatore.tagliaDivisa}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lingue</p>
                  <p className="font-medium">{selectedOperatore.lingue.join(', ')}</p>
                </div>
              </div>
              {selectedOperatore.noteHR && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Note HR</p>
                    <p className="text-sm">{selectedOperatore.noteHR}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog Nuovo Operatore */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Nuovo Operatore</DialogTitle>
            <DialogDescription>
              Inserisci i dati del nuovo operatore. I campi contrassegnati con * sono obbligatori.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Dati Anagrafici */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Dati Anagrafici</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={newOperatore.nome}
                    onChange={(e) => setNewOperatore({ ...newOperatore, nome: e.target.value })}
                    placeholder="Mario"
                  />
                </div>
                <div>
                  <Label htmlFor="cognome">Cognome *</Label>
                  <Input
                    id="cognome"
                    value={newOperatore.cognome}
                    onChange={(e) => setNewOperatore({ ...newOperatore, cognome: e.target.value })}
                    placeholder="Rossi"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newOperatore.email}
                    onChange={(e) => setNewOperatore({ ...newOperatore, email: e.target.value })}
                    placeholder="mario.rossi@noesis.it"
                  />
                </div>
                <div>
                  <Label htmlFor="telefono">Telefono</Label>
                  <Input
                    id="telefono"
                    value={newOperatore.telefono}
                    onChange={(e) => setNewOperatore({ ...newOperatore, telefono: e.target.value })}
                    placeholder="+39 333 1234567"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="residenza">Residenza</Label>
                  <Input
                    id="residenza"
                    value={newOperatore.residenza}
                    onChange={(e) => setNewOperatore({ ...newOperatore, residenza: e.target.value })}
                    placeholder="Rimini (RN)"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Dati Fiscali */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Dati Fiscali e Bancari</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="codiceFiscale">Codice Fiscale</Label>
                  <Input
                    id="codiceFiscale"
                    value={newOperatore.codiceFiscale}
                    onChange={(e) => setNewOperatore({ ...newOperatore, codiceFiscale: e.target.value.toUpperCase() })}
                    placeholder="RSSMRA85M10H294Z"
                    maxLength={16}
                  />
                </div>
                <div>
                  <Label htmlFor="iban">IBAN</Label>
                  <Input
                    id="iban"
                    value={newOperatore.iban}
                    onChange={(e) => setNewOperatore({ ...newOperatore, iban: e.target.value.toUpperCase() })}
                    placeholder="IT60X0542811101000000123456"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Competenze e Dotazioni */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Competenze e Dotazioni</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lingue">Lingue</Label>
                  <Input
                    id="lingue"
                    value={newOperatore.lingue?.join(', ')}
                    onChange={(e) => setNewOperatore({
                      ...newOperatore,
                      lingue: e.target.value.split(',').map(l => l.trim()).filter(Boolean)
                    })}
                    placeholder="Italiano, Inglese, Tedesco"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Separa le lingue con virgola</p>
                </div>
                <div>
                  <Label htmlFor="patente">Patente</Label>
                  <Input
                    id="patente"
                    value={newOperatore.patente}
                    onChange={(e) => setNewOperatore({ ...newOperatore, patente: e.target.value.toUpperCase() })}
                    placeholder="B"
                  />
                </div>
                <div>
                  <Label htmlFor="tagliaDivisa">Taglia Divisa</Label>
                  <Select
                    value={newOperatore.tagliaDivisa || undefined}
                    onValueChange={(value) => setNewOperatore({ ...newOperatore, tagliaDivisa: value || '' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona taglia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XS">XS</SelectItem>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                      <SelectItem value="XXL">XXL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newOperatore.status}
                    onValueChange={(value) => setNewOperatore({ ...newOperatore, status: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Attivo">Attivo</SelectItem>
                      <SelectItem value="In ferie">In ferie</SelectItem>
                      <SelectItem value="Malattia">Malattia</SelectItem>
                      <SelectItem value="Inattivo">Inattivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* HR e Note */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Informazioni HR</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="categoriaProtetta"
                    checked={newOperatore.categoriaProtetta}
                    onCheckedChange={(checked) => setNewOperatore({ ...newOperatore, categoriaProtetta: checked })}
                  />
                  <Label htmlFor="categoriaProtetta" className="cursor-pointer">
                    Categoria Protetta
                  </Label>
                </div>
                <div>
                  <Label htmlFor="noteHR">Note HR</Label>
                  <Textarea
                    id="noteHR"
                    value={newOperatore.noteHR}
                    onChange={(e) => setNewOperatore({ ...newOperatore, noteHR: e.target.value })}
                    placeholder="Inserisci note, certificazioni, qualifiche speciali..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Caricamento Documenti */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Documenti</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="documenti">Carica Documenti</Label>
                  <Input
                    id="documenti"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Formati supportati: PDF, JPG, PNG, DOC, DOCX (max 5MB per file)
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Documenti Caricati ({uploadedFiles.length})</Label>
                    <div className="border rounded-md p-3 space-y-2 max-h-40 overflow-y-auto">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-secondary/50 p-2 rounded"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <svg
                              className="h-4 w-4 text-muted-foreground flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <span className="text-sm truncate">{file.name}</span>
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              ({(file.size / 1024).toFixed(0)} KB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFile(index)}
                            className="flex-shrink-0 h-6 w-6 p-0"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-blue-500/10 border border-blue-500/50 rounded-md p-3">
                  <p className="text-sm text-blue-400">
                    <strong>Suggerimento:</strong> Puoi caricare certificazioni, documenti di identità,
                    contratti, attestati di formazione, visite mediche, etc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowNewDialog(false)}>
              Annulla
            </Button>
            <Button onClick={handleSaveNewOperatore}>
              Salva Operatore
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
