import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EventMonitor() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Monitor de Eventos em Tempo Real</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Veja todos os eventos publicados pelo microsservico aqui.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
