import { Badge } from '@/components/ui/badge';
import type {
  StatoServizio,
  StatoTurno,
  StatoPagamento,
  PrioritaAlert
} from '@/lib/types';

type StatusType = StatoServizio | StatoTurno | StatoPagamento | PrioritaAlert | string;

interface StatusBadgeProps {
  status: StatusType;
  type?: 'servizio' | 'turno' | 'pagamento' | 'alert' | 'commessa';
}

export function StatusBadge({ status, type = 'servizio' }: StatusBadgeProps) {
  const getVariant = () => {
    if (type === 'servizio') {
      const statusMap: Record<string, string> = {
        'Bozza': 'secondary',
        'Confermato': 'default',
        'In corso': 'default',
        'Concluso': 'secondary',
        'Fatturato': 'default',
        'Annullato': 'destructive'
      };
      return statusMap[status] || 'secondary';
    }

    if (type === 'turno') {
      const statusMap: Record<string, string> = {
        'Da coprire': 'destructive',
        'Parziale': 'secondary',
        'Coperto': 'default',
        'Svolto': 'default',
        'Annullato': 'destructive'
      };
      return statusMap[status] || 'secondary';
    }

    if (type === 'pagamento') {
      const statusMap: Record<string, string> = {
        'Bozza': 'secondary',
        'Emessa': 'default',
        'In scadenza': 'secondary',
        'Sollecitata': 'secondary',
        'Scaduta': 'destructive',
        'Pagata': 'default'
      };
      return statusMap[status] || 'secondary';
    }

    if (type === 'alert') {
      const statusMap: Record<string, string> = {
        'Bassa': 'secondary',
        'Media': 'default',
        'Alta': 'secondary',
        'URGENTE': 'destructive'
      };
      return statusMap[status] || 'secondary';
    }

    if (type === 'commessa') {
      const statusMap: Record<string, string> = {
        'Aperta': 'secondary',
        'In corso': 'default',
        'Chiusa': 'secondary',
        'Sospesa': 'destructive'
      };
      return statusMap[status] || 'secondary';
    }

    return 'secondary';
  };

  const getColorClass = () => {
    if (type === 'servizio') {
      const colorMap: Record<string, string> = {
        'Confermato': 'bg-blue-500/10 text-blue-400 border-blue-500/50',
        'In corso': 'bg-green-500/10 text-green-400 border-green-500/50',
        'Fatturato': 'bg-purple-500/10 text-purple-400 border-purple-500/50',
        'Annullato': 'bg-red-500/10 text-red-400 border-red-500/50'
      };
      return colorMap[status] || '';
    }

    if (type === 'turno') {
      const colorMap: Record<string, string> = {
        'Da coprire': 'bg-red-500/10 text-red-400 border-red-500/50',
        'Parziale': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50',
        'Coperto': 'bg-green-500/10 text-green-400 border-green-500/50',
        'Svolto': 'bg-blue-500/10 text-blue-400 border-blue-500/50'
      };
      return colorMap[status] || '';
    }

    if (type === 'pagamento') {
      const colorMap: Record<string, string> = {
        'Emessa': 'bg-blue-500/10 text-blue-400 border-blue-500/50',
        'In scadenza': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50',
        'Sollecitata': 'bg-orange-500/10 text-orange-400 border-orange-500/50',
        'Scaduta': 'bg-red-500/10 text-red-400 border-red-500/50',
        'Pagata': 'bg-green-500/10 text-green-400 border-green-500/50'
      };
      return colorMap[status] || '';
    }

    if (type === 'alert') {
      const colorMap: Record<string, string> = {
        'Bassa': 'bg-gray-500/10 text-gray-400 border-gray-500/50',
        'Media': 'bg-blue-500/10 text-blue-400 border-blue-500/50',
        'Alta': 'bg-orange-500/10 text-orange-400 border-orange-500/50',
        'URGENTE': 'bg-red-500/10 text-red-400 border-red-500/50 animate-pulse'
      };
      return colorMap[status] || '';
    }

    if (type === 'commessa') {
      const colorMap: Record<string, string> = {
        'Aperta': 'bg-gray-500/10 text-gray-400 border-gray-500/50',
        'In corso': 'bg-blue-500/10 text-blue-400 border-blue-500/50',
        'Chiusa': 'bg-green-500/10 text-green-400 border-green-500/50',
        'Sospesa': 'bg-red-500/10 text-red-400 border-red-500/50'
      };
      return colorMap[status] || '';
    }

    return '';
  };

  return (
    <Badge variant={getVariant() as any} className={`${getColorClass()} border`}>
      {status}
    </Badge>
  );
}
