import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Lightbulb, Zap, Database } from 'lucide-react';

export default function Documentation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Documentação Educacional</CardTitle>
          <CardDescription>
            Aprenda sobre microsserviços, EDA, ODA e TMF683
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="concepts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concepts">Conceitos</TabsTrigger>
          <TabsTrigger value="oda">ODA</TabsTrigger>
          <TabsTrigger value="tmf683">TMF683</TabsTrigger>
          <TabsTrigger value="eda">EDA</TabsTrigger>
        </TabsList>

        <TabsContent value="concepts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Conceitos Fundamentais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Microsserviço</h4>
                <p className="text-sm text-slate-600">
                  Um pequeno programa que faz uma coisa muito bem. Neste caso, gerenciar interações de clientes.
                  Microsserviços são independentes, escaláveis e podem ser desenvolvidos por times diferentes.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">API REST</h4>
                <p className="text-sm text-slate-600">
                  Interface que permite que programas se comuniquem usando HTTP. Usa operações padrão:
                  GET (obter), POST (criar), PATCH (modificar), DELETE (remover).
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Event Broker</h4>
                <p className="text-sm text-slate-600">
                  Sistema central que recebe eventos de produtores e os entrega aos consumidores.
                  Desacopla componentes permitindo comunicação assíncrona.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Party Interaction</h4>
                <p className="text-sm text-slate-600">
                  Registro de uma interação entre partes (pessoas, sistemas). Pode ser um telefonema,
                  email, chat, visita a loja, etc.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="oda" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Open Digital Architecture (ODA)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                ODA é um blueprint criado pelo TM Forum para ajudar empresas de telecomunicações
                a modernizar seus sistemas de forma escalável, resiliente e segura.
              </p>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-3">Princípios Principais</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li><strong>Modularidade:</strong> Dividir em partes independentes</li>
                  <li><strong>Escalabilidade:</strong> Crescer sem quebrar</li>
                  <li><strong>Resiliência:</strong> Continuar funcionando com falhas</li>
                  <li><strong>Observabilidade:</strong> Ver o que está acontecendo</li>
                  <li><strong>Segurança:</strong> Proteger dados e acesso</li>
                </ul>
              </div>

              <p className="text-sm text-slate-600">
                TMF683 é uma <strong>API específica</strong> que implementa os princípios da ODA
                para gerenciar interações de clientes.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tmf683" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>TMF683 Party Interaction Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                TMF683 é um padrão internacional que define como registrar e gerenciar
                interações entre partes (clientes, agentes, sistemas).
              </p>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-3">Operações Disponíveis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="font-mono bg-blue-100 text-blue-900 px-2 py-1 rounded">POST</span>
                    <span className="text-slate-600">Criar nova interação</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-mono bg-green-100 text-green-900 px-2 py-1 rounded">GET</span>
                    <span className="text-slate-600">Obter ou listar interações</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-mono bg-yellow-100 text-yellow-900 px-2 py-1 rounded">PATCH</span>
                    <span className="text-slate-600">Atualizar interação</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-mono bg-red-100 text-red-900 px-2 py-1 rounded">DELETE</span>
                    <span className="text-slate-600">Remover interação</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-slate-900 mb-2">Estrutura de Dados</h4>
                <p className="text-sm text-slate-600 mb-2">Uma Party Interaction contém:</p>
                <ul className="space-y-1 text-sm text-slate-600 list-disc list-inside">
                  <li>ID único</li>
                  <li>Descrição</li>
                  <li>Tipo (inbound, outbound, internal)</li>
                  <li>Status (active, inactive, pending, completed)</li>
                  <li>Data da interação</li>
                  <li>Canal (phone, email, chat, etc)</li>
                  <li>Partes envolvidas</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eda" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Event-Driven Architecture (EDA)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                EDA é uma forma de construir sistemas onde componentes se comunicam através de eventos.
                Ao invés de chamar diretamente, um componente publica um evento que outros podem consumir.
              </p>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-3">Vantagens</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li><strong>Desacoplamento:</strong> Componentes não precisam conhecer uns aos outros</li>
                  <li><strong>Escalabilidade:</strong> Fácil adicionar novos listeners</li>
                  <li><strong>Performance:</strong> Respostas rápidas ao cliente</li>
                  <li><strong>Resiliência:</strong> Falha em um listener não afeta outros</li>
                  <li><strong>Auditoria:</strong> Histórico completo de eventos</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-slate-900 mb-3">Eventos neste Microsserviço</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li><strong>PartyInteractionCreatedEvent:</strong> Disparado quando nova interação é criada</li>
                  <li><strong>PartyInteractionUpdatedEvent:</strong> Disparado quando interação é modificada</li>
                  <li><strong>PartyInteractionDeletedEvent:</strong> Disparado quando interação é removida</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-slate-900 mb-2">Fluxo Típico</h4>
                <div className="text-sm text-slate-600 space-y-1">
                  <p>1. Cliente envia requisição POST</p>
                  <p>2. Sistema cria interação no banco</p>
                  <p>3. Evento é publicado no Event Broker</p>
                  <p>4. Resposta é enviada ao cliente (rápido!)</p>
                  <p>5. Listeners reagem ao evento (assíncrono)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
