'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { GlobalKPICards } from '@/components/GlobalKPICards';
import { StatusBadge } from '@/components/StatusBadge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { turni } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

// Helper per ottenere i giorni del mese
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTHS = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

const DAYS = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // Luglio 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Filtra turni per data selezionata
  const getTurniForDate = (dateStr: string) => {
    return turni.filter(t => t.dataTurno === dateStr);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const turniGiorno = getTurniForDate(dateStr);
    if (turniGiorno.length > 0) {
      setSelectedDate(dateStr);
      setShowDialog(true);
    }
  };

  // Genera giorni del calendario
  const calendarDays = [];

  // Giorni vuoti prima del primo giorno del mese
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-24 border border-border/50" />);
  }

  // Giorni del mese
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const turniGiorno = getTurniForDate(dateStr);
    const hasturni = turniGiorno.length > 0;

    calendarDays.push(
      <div
        key={day}
        onClick={() => handleDayClick(day)}
        className={`h-24 border border-border/50 p-2 ${
          hasturni ? 'cursor-pointer hover:bg-secondary/50' : ''
        } transition-colors`}
      >
        <div className="text-sm font-medium mb-1">{day}</div>
        {hasturni && (
          <div className="space-y-1">
            {turniGiorno.slice(0, 2).map((turno, idx) => (
              <div
                key={idx}
                className={`text-xs p-1 rounded truncate ${
                  turno.statoTurno === 'Da coprire'
                    ? 'bg-red-500/20 text-red-400'
                    : turno.statoTurno === 'Parziale'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : turno.statoTurno === 'Coperto'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}
              >
                {turno.servizio.substring(0, 20)}...
              </div>
            ))}
            {turniGiorno.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{turniGiorno.length - 2} altro/i
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  const selectedTurni = selectedDate ? getTurniForDate(selectedDate) : [];

  return (
    <div className="p-8 max-w-[1800px] mx-auto">
      <PageHeader
        title="Calendario Turni"
        description="Vista calendario di tutti i turni assegnati"
        icon={CalendarIcon}
      />

      <GlobalKPICards />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              {MONTHS[month]} {year}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date(2026, 6, 1))}
              >
                Oggi
              </Button>
              <Button variant="outline" size="sm" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Legenda */}
          <div className="flex gap-4 mb-4 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/50" />
              <span className="text-muted-foreground">Da coprire</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500/20 border border-yellow-500/50" />
              <span className="text-muted-foreground">Parziale</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/50" />
              <span className="text-muted-foreground">Coperto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500/50" />
              <span className="text-muted-foreground">Svolto</span>
            </div>
          </div>

          {/* Header giorni della settimana */}
          <div className="grid grid-cols-7 gap-0 mb-2">
            {DAYS.map(day => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Griglia calendario */}
          <div className="grid grid-cols-7 gap-0 border-t border-l border-border/50">
            {calendarDays}
          </div>
        </CardContent>
      </Card>

      {/* Dialog Dettaglio Giornata */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Turni del {selectedDate && new Date(selectedDate + 'T00:00:00').toLocaleDateString('it-IT', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </DialogTitle>
            <DialogDescription>
              {selectedTurni.length} turno/i programmato/i per questa giornata
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedTurni.map((turno, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{turno.turno}</h3>
                        <p className="text-sm text-muted-foreground">{turno.servizio}</p>
                      </div>
                      <StatusBadge status={turno.statoTurno} type="turno" />
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Durata</p>
                        <p className="font-medium">{turno.durataOre} ore</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pausa</p>
                        <p className="font-medium">{turno.pausaMinuti} minuti</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Persone Richieste</p>
                        <p className="font-medium">{turno.personeRichieste}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Supervisore</p>
                        <p className="font-medium">{turno.supervisore}</p>
                      </div>
                    </div>

                    {turno.note && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Note</p>
                          <p className="text-sm">{turno.note}</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
