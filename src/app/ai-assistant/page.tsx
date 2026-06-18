'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Bot, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const mockResponses: Record<string, string> = {
  'turni': 'Ci sono 3 turni scoperti o parzialmente coperti oggi: \n- Notte Rosa - Turno Notturno 04/07 (mancano 3 persone)\n- Congresso Medico - Giorno 1 (da coprire completamente)\n- Capodanno - Sera 31/12 (coperto 18/30)',
  'fatture': 'Hai 5 fatture in scadenza entro 30 giorni:\n- Fattura 2026/0145 (€34.160) - Fiera di Rimini - scade tra 17 giorni\n- Fattura 2026/0120 (€26.840) - Fiera di Rimini - scaduta da 4 giorni\n- Fattura 2026/0098 (€6.344) - Riviera Congress - scaduta da 55 giorni',
  'commesse': 'La commessa "Evento Riviera" ha un margine previsto del 32%, ma il margine consuntivo attuale è del 28%. La differenza è dovuta a costi straordinari imprevisti per personale aggiuntivo.',
  'operatori': 'L\'operatore Giuseppe Romano ha la certificazione antincendio livello 2 in scadenza il 30/07/2026. È attualmente in ferie fino al 30/06.',
  'margine': 'Il margine medio delle commesse attive è del 30.2%. Le commesse con margine superiore al target sono: \n- Appalto Fiera 2026: 31%\n- Servizio continuativo GH: 29%',
  'default': 'Posso aiutarti con informazioni su:\n- Turni scoperti e copertura\n- Fatture in scadenza e incassi\n- Margini commesse e analisi finanziarie\n- Certificazioni operatori in scadenza\n- Alert e notifiche prioritarie\n\nCosa vuoi sapere?'
};

function getMockResponse(input: string): string {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes('turni') || lowerInput.includes('scoperti') || lowerInput.includes('copertura')) {
    return mockResponses['turni'];
  }
  if (lowerInput.includes('fatture') || lowerInput.includes('scadenza') || lowerInput.includes('pagamenti')) {
    return mockResponses['fatture'];
  }
  if (lowerInput.includes('commessa') || lowerInput.includes('margine') || lowerInput.includes('riviera')) {
    return mockResponses['commesse'];
  }
  if (lowerInput.includes('operatore') || lowerInput.includes('certificazione') || lowerInput.includes('romano')) {
    return mockResponses['operatori'];
  }
  if (lowerInput.includes('margine')) {
    return mockResponses['margine'];
  }

  return mockResponses['default'];
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Ciao! Sono l\'assistente AI di NOESIS OS. Posso aiutarti a monitorare turni, fatture, commesse e operatori. Cosa vuoi sapere?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getMockResponse(input);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    'Ci sono turni scoperti oggi?',
    'Quante fatture in scadenza?',
    'Margine commessa Evento Riviera',
    'Certificazioni in scadenza'
  ];

  return (
    <div className="p-8 max-w-[1200px] mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <PageHeader
        title="AI Assistant"
        description="Assistente intelligente per il centro operativo"
        icon={Bot}
      />

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 flex flex-col p-6">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs font-medium">NOESIS AI</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString('it-IT', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground rounded-lg p-4 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <span className="text-xs font-medium">NOESIS AI</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Domande rapide:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => {
                      setInput(question);
                      setTimeout(() => handleSend(), 100);
                    }}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Chiedi qualcosa all'AI assistant..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isTyping}
            />
            <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
