import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Architecture() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Arquitetura C4 Model</CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="context" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="context">Context</TabsTrigger>
          <TabsTrigger value="container">Container</TabsTrigger>
          <TabsTrigger value="component">Component</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="context" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Context Diagram (Nivel 1)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-600 mb-4">
                  Mostra o sistema no contexto de usuarios e sistemas externos.
                </p>
                <div className="text-center">
                  <p className="text-sm font-mono text-slate-700">
                    Usuario HTTP &lt;-&gt; TMF683 Service &lt;-&gt; Event Broker &lt;-&gt; Sistemas Externos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="container" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Container Diagram (Nivel 2)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-600 mb-4">
                  Mostra os containers principais do sistema.
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>REST API Gateway (Express.js)</li>
                  <li>Business Logic Service</li>
                  <li>Database (MySQL/TiDB)</li>
                  <li>Event Broker (Redis Pub/Sub)</li>
                  <li>Event Listeners</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="component" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Component Diagram (Nivel 3)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-600 mb-4">
                  Mostra os componentes internos de cada container.
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>Route Handler</li>
                  <li>Validator (Zod)</li>
                  <li>Middleware (Auth, CORS)</li>
                  <li>PartyInteraction Service</li>
                  <li>Event Emitter</li>
                  <li>Repository Pattern</li>
                  <li>Drizzle ORM</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Code Diagram (Nivel 4)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-600 mb-4">
                  Mostra estruturas de dados e fluxos de codigo.
                </p>
                <div className="text-xs font-mono text-slate-700 space-y-2">
                  <p>PartyInteraction {'{}'}</p>
                  <p>  id: string</p>
                  <p>  description: string</p>
                  <p>  type: enum</p>
                  <p>  status: enum</p>
                  <p>  involvedParties: RelatedParty[]</p>
                  <p>  channelName: string</p>
                  <p>{'}'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
