import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flower2, Plus } from 'lucide-react';
import { FOR_MALEEHA_PRESETS } from '../../constants/forMaleehaPresets';

interface ForMaleehaQuickAddProps {
  onAddPreset: (title: string) => void;
}

export default function ForMaleehaQuickAdd({ onAddPreset }: ForMaleehaQuickAddProps) {
  return (
    <Card className="border-maleeha/30 bg-maleeha/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-maleeha">
          <Flower2 className="h-5 w-5" />
          For Maleeha 🌸
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {FOR_MALEEHA_PRESETS.map((preset) => (
          <Button
            key={preset}
            variant="outline"
            size="sm"
            onClick={() => onAddPreset(preset)}
            className="w-full justify-start border-maleeha/30 hover:bg-maleeha/10 hover:border-maleeha/50"
          >
            <Plus className="h-4 w-4 mr-2" />
            {preset}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
