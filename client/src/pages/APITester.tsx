import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function APITester() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Testador de API REST</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Use a aba de documentacao para aprender como testar os endpoints da API.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
