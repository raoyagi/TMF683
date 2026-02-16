import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Database, MessageSquare, BookOpen, Code2, BarChart3 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import Documentation from './Documentation';
import APITester from './APITester';
import EventMonitor from './EventMonitor';
import Architecture from './Architecture';
import Glossary from './Glossary';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                TMF683 Party Interaction Management
              </h1>
              <p className="mt-2 text-lg text-slate-600">
                Microsserviço com Arquitetura Orientada a Eventos (EDA)
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-sm">
                <Zap className="mr-1 h-4 w-4" />
                Event-Driven
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Database className="mr-1 h-4 w-4" />
                REST API
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Visão Geral</span>
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              <span className="hidden sm:inline">Arquitetura</span>
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Documentação</span>
            </TabsTrigger>
            <TabsTrigger value="api-tester" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">API Tester</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Eventos</span>
            </TabsTrigger>
            <TabsTrigger value="glossary" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Glossário</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bem-vindo ao TMF683 Party Interaction Management</CardTitle>
                <CardDescription>
                  Um microsserviço moderno para gerenciar interações de clientes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-slate-700">
                    Este projeto implementa a especificação <strong>TMF683 Party Interaction Management</strong> do TM Forum,
                    seguindo os princípios da <strong>Open Digital Architecture (ODA)</strong> e utilizando
                    uma <strong>Arquitetura Orientada a Eventos (EDA)</strong>.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Database className="h-5 w-5 text-blue-600" />
                        REST API
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">
                      Operações CRUD completas para gerenciar Party Interactions seguindo o padrão TMF683
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50 border-purple-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Zap className="h-5 w-5 text-purple-600" />
                        Event Broker
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">
                      Sistema Pub/Sub para publicar e consumir eventos em tempo real
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-green-600" />
                        Observabilidade
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">
                      Histórico completo de eventos e estatísticas em tempo real
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-4">Funcionalidades Principais</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Criar, ler, atualizar e deletar Party Interactions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Publicar eventos quando interações são criadas, atualizadas ou deletadas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Registrar eventos em banco de dados para auditoria</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Monitorar eventos em tempo real</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Testar endpoints REST interativamente</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-slate-900 mb-2">Próximos Passos</h3>
                  <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside">
                    <li>Leia a <strong>Documentação</strong> para entender os conceitos</li>
                    <li>Explore a <strong>Arquitetura</strong> com diagramas C4 Model</li>
                    <li>Use o <strong>API Tester</strong> para testar endpoints</li>
                    <li>Monitore <strong>Eventos</strong> em tempo real</li>
                    <li>Consulte o <strong>Glossário</strong> para termos técnicos</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Architecture Tab */}
          <TabsContent value="architecture">
            <Architecture />
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="documentation">
            <Documentation />
          </TabsContent>

          {/* API Tester Tab */}
          <TabsContent value="api-tester">
            <APITester />
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <EventMonitor />
          </TabsContent>

          {/* Glossary Tab */}
          <TabsContent value="glossary">
            <Glossary />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Sobre</h4>
              <p className="text-sm text-slate-600">
                Implementação educacional do TMF683 Party Interaction Management com arquitetura EDA
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Referências</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-blue-600">TM Forum ODA</a></li>
                <li><a href="#" className="hover:text-blue-600">TMF683 Specification</a></li>
                <li><a href="#" className="hover:text-blue-600">Event-Driven Architecture</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Documentação</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-blue-600">API Docs</a></li>
                <li><a href="#" className="hover:text-blue-600">Architecture Guide</a></li>
                <li><a href="#" className="hover:text-blue-600">Educational Guide</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-8 pt-8 text-center text-sm text-slate-600">
            <p>TMF683 Party Interaction Management © 2026 - Arquitetura Educacional</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
