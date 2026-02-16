import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const glossaryTerms = [
  {
    term: 'API (Application Programming Interface)',
    definition: 'Interface que permite que programas se comuniquem. Neste caso, usamos REST API via HTTP.',
  },
  {
    term: 'EDA (Event-Driven Architecture)',
    definition: 'Arquitetura onde componentes se comunicam atraves de eventos, nao diretamente.',
  },
  {
    term: 'Event Broker',
    definition: 'Sistema central que recebe eventos de produtores e os entrega aos consumidores.',
  },
  {
    term: 'Microsservico',
    definition: 'Pequeno programa que faz uma coisa muito bem. Independente e escalavel.',
  },
  {
    term: 'ODA (Open Digital Architecture)',
    definition: 'Blueprint do TM Forum para modernizar sistemas de telecomunicacoes.',
  },
  {
    term: 'Party Interaction',
    definition: 'Registro de uma interacao entre partes (pessoas, sistemas).',
  },
  {
    term: 'Pub/Sub (Publish-Subscribe)',
    definition: 'Padrao de comunicacao onde produtores publicam mensagens e consumidores se inscrevem.',
  },
  {
    term: 'REST (Representational State Transfer)',
    definition: 'Padrao para criar APIs usando HTTP com operacoes GET, POST, PATCH, DELETE.',
  },
  {
    term: 'TMF683',
    definition: 'Especificacao do TM Forum para Party Interaction Management.',
  },
];

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Glossario Tecnico</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Buscar termo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6"
          />

          <div className="space-y-4">
            {filteredTerms.map((item, index) => (
              <div key={index} className="border-l-4 border-l-blue-500 pl-4 py-2">
                <h4 className="font-semibold text-slate-900">{item.term}</h4>
                <p className="text-sm text-slate-600 mt-1">{item.definition}</p>
              </div>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <p className="text-center text-slate-500 py-8">
              Nenhum termo encontrado para "{searchTerm}"
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
