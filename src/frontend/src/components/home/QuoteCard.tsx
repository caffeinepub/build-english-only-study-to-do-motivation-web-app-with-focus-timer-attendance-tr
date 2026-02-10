import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useDailyQuote } from '../../hooks/useDailyQuote';

export default function QuoteCard() {
  const { quote, refreshQuote } = useDailyQuote();

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 shadow-soft">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-lg font-quote text-foreground leading-relaxed">
              "{quote}"
            </p>
            <p className="text-sm text-muted-foreground mt-3 font-medium">
              — Chotu
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={refreshQuote}
            className="shrink-0 rounded-full hover:bg-primary/20"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
