import { Button } from '@/components/ui/button';
import { EyeOff, Eye } from 'lucide-react';

interface DistractionMuteToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function DistractionMuteToggle({ enabled, onToggle }: DistractionMuteToggleProps) {
  return (
    <Button
      variant={enabled ? 'default' : 'outline'}
      size="sm"
      onClick={onToggle}
      className="gap-2"
    >
      {enabled ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      {enabled ? 'Exit Distraction Reduction' : 'Distraction Reduction'}
    </Button>
  );
}
