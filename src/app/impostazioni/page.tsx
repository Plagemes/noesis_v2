'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Settings, Save, User, Bell, Shield, Palette, Database, Mail, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ImpostazioniPage() {
  const [notificheEmail, setNotificheEmail] = useState(true);
  const [notifichePush, setNotifichePush] = useState(true);
  const [autenticazioneDueFattori, setAutenticazioneDueFattori] = useState(false);
  const [backupAutomatico, setBackupAutomatico] = useState(true);
  const [tema, setTema] = useState('dark');

  const handleSalva = () => {
    alert('Impostazioni salvate con successo!');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Impostazioni"
        description="Configurazione sistema e preferenze utente"
        icon={Settings}
      />

      <Tabs defaultValue="profilo" className="space-y-4">
        <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full">
          <TabsTrigger value="profilo">Profilo</TabsTrigger>
          <TabsTrigger value="notifiche">Notifiche</TabsTrigger>
          <TabsTrigger value="sicurezza">Sicurezza</TabsTrigger>
          <TabsTrigger value="aspetto">Aspetto</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>

        {/* Tab Profilo */}
        <TabsContent value="profilo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Profilo</CardTitle>
              <CardDescription>Gestisci i tuoi dati personali e contatti</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <Button variant="outline">Carica Foto</Button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" defaultValue="Mario" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cognome">Cognome</Label>
                  <Input id="cognome" defaultValue="Rossi" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="mario.rossi@noesis.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Telefono</Label>
                <Input id="telefono" type="tel" defaultValue="+39 333 1234567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ruolo">Ruolo</Label>
                <Select defaultValue="admin">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Amministratore</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="operator">Operatore</SelectItem>
                    <SelectItem value="viewer">Visualizzatore</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button onClick={handleSalva}>
                  <Save className="h-4 w-4 mr-2" />
                  Salva Modifiche
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Notifiche */}
        <TabsContent value="notifiche" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferenze Notifiche</CardTitle>
              <CardDescription>Configura come e quando ricevere le notifiche</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="notifiche-email">Notifiche Email</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ricevi notifiche via email per eventi importanti
                  </p>
                </div>
                <Switch
                  id="notifiche-email"
                  checked={notificheEmail}
                  onCheckedChange={setNotificheEmail}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="notifiche-push">Notifiche Push</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ricevi notifiche push sul browser
                  </p>
                </div>
                <Switch
                  id="notifiche-push"
                  checked={notifichePush}
                  onCheckedChange={setNotifichePush}
                />
              </div>

              <div className="space-y-2">
                <Label>Tipologie di Notifiche</Label>
                <div className="space-y-3 pl-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notif-alert" className="font-normal">Alert e Urgenze</Label>
                    <Switch id="notif-alert" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notif-commesse" className="font-normal">Nuove Commesse</Label>
                    <Switch id="notif-commesse" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notif-turni" className="font-normal">Modifiche Turni</Label>
                    <Switch id="notif-turni" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notif-fatture" className="font-normal">Fatture e Pagamenti</Label>
                    <Switch id="notif-fatture" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notif-report" className="font-normal">Report Periodici</Label>
                    <Switch id="notif-report" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSalva}>
                  <Save className="h-4 w-4 mr-2" />
                  Salva Preferenze
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Sicurezza */}
        <TabsContent value="sicurezza" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sicurezza Account</CardTitle>
              <CardDescription>Proteggi il tuo account e i tuoi dati</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password-attuale">Password Attuale</Label>
                <Input id="password-attuale" type="password" placeholder="••••••••" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nuova-password">Nuova Password</Label>
                <Input id="nuova-password" type="password" placeholder="••••••••" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conferma-password">Conferma Password</Label>
                <Input id="conferma-password" type="password" placeholder="••••••••" />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="2fa">Autenticazione a Due Fattori (2FA)</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Aumenta la sicurezza richiedendo un codice aggiuntivo
                  </p>
                </div>
                <Switch
                  id="2fa"
                  checked={autenticazioneDueFattori}
                  onCheckedChange={setAutenticazioneDueFattori}
                />
              </div>

              <div className="space-y-2">
                <Label>Sessioni Attive</Label>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Chrome su Windows</div>
                        <div className="text-sm text-muted-foreground">Milano, Italia • Attiva ora</div>
                      </div>
                      <Button variant="outline" size="sm">Disconnetti</Button>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Safari su iPhone</div>
                        <div className="text-sm text-muted-foreground">Milano, Italia • 2 ore fa</div>
                      </div>
                      <Button variant="outline" size="sm">Disconnetti</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSalva}>
                  <Save className="h-4 w-4 mr-2" />
                  Aggiorna Sicurezza
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Aspetto */}
        <TabsContent value="aspetto" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalizzazione Interfaccia</CardTitle>
              <CardDescription>Modifica l'aspetto dell'applicazione</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tema</Label>
                <Select value={tema} onValueChange={setTema}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Chiaro</SelectItem>
                    <SelectItem value="dark">Scuro</SelectItem>
                    <SelectItem value="auto">Automatico (Sistema)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Colore Primario</Label>
                <div className="flex gap-2">
                  <button className="h-10 w-10 rounded-full bg-blue-600 border-2 border-primary" />
                  <button className="h-10 w-10 rounded-full bg-green-600 border-2 border-transparent hover:border-muted" />
                  <button className="h-10 w-10 rounded-full bg-purple-600 border-2 border-transparent hover:border-muted" />
                  <button className="h-10 w-10 rounded-full bg-orange-600 border-2 border-transparent hover:border-muted" />
                  <button className="h-10 w-10 rounded-full bg-red-600 border-2 border-transparent hover:border-muted" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Dimensione Font</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Piccolo</SelectItem>
                    <SelectItem value="medium">Medio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sidebar Compatta</Label>
                  <p className="text-sm text-muted-foreground">
                    Riduci la larghezza della barra laterale
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Animazioni</Label>
                  <p className="text-sm text-muted-foreground">
                    Abilita transizioni e animazioni UI
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="pt-4">
                <Button onClick={handleSalva}>
                  <Save className="h-4 w-4 mr-2" />
                  Salva Aspetto
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Sistema */}
        <TabsContent value="sistema" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurazione Sistema</CardTitle>
              <CardDescription>Impostazioni avanzate e manutenzione</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Lingua</Label>
                <Select defaultValue="it">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">Italiano</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fuso Orario</Label>
                <Select defaultValue="europe-rome">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-rome">Europa/Roma (GMT+1)</SelectItem>
                    <SelectItem value="europe-london">Europa/Londra (GMT+0)</SelectItem>
                    <SelectItem value="america-new-york">America/New York (GMT-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <Label>Backup Automatico</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Backup giornaliero dei dati alle 02:00
                  </p>
                </div>
                <Switch
                  checked={backupAutomatico}
                  onCheckedChange={setBackupAutomatico}
                />
              </div>

              <div className="space-y-2">
                <Label>Gestione Dati</Label>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    Esporta Tutti i Dati
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    Importa Dati
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Elimina Tutti i Dati
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Informazioni Sistema</Label>
                <div className="p-4 bg-muted/30 rounded-lg space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Versione:</span>
                    <span className="font-medium">NOESIS OS v2.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ultimo Aggiornamento:</span>
                    <span className="font-medium">2026-06-20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Database:</span>
                    <span className="font-medium">PostgreSQL 15.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Spazio Usato:</span>
                    <span className="font-medium">2.4 GB / 10 GB</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSalva}>
                  <Save className="h-4 w-4 mr-2" />
                  Salva Configurazione
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
