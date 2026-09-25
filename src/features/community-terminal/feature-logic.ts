import type { LegalDocument } from './feature-types';

export const COMMUNITY_STATS = [
  { label: 'Jogadores no Discord', value: '8.450+' },
  { label: 'Membros Ativos Agora', value: '1.428', highlight: true },
  { label: 'Uptime dos Servidores', value: '99.98%' },
  { label: 'Latência Brasil (SP)', value: '14ms' },
];

export const DISCORD_FEATURED_CHANNELS = [
  { name: '#anúncios-e-rates', desc: 'Patch notes oficiais e eventos', badge: 'Oficial' },
  { name: '#builds-e-guias', desc: 'Teoria de classes e estratégias AFK', badge: 'Estratégia' },
  { name: '#mercado-guildas', desc: 'Comércio de itens e recrutamento WoE', badge: 'Comunidade' },
  { name: '#suporte-ao-vivo', desc: 'Atendimento direto com moderadores', badge: '24/7' },
];

export const LEGAL_DOCUMENTS: Record<'terms' | 'privacy' | 'fairplay', LegalDocument> = {
  terms: {
    id: 'terms',
    title: 'Termos de Serviço & Uso da Plataforma',
    subtitle: 'Diretrizes gerais de acesso, contas e uso dos ambientes de jogo Haven Games.',
    lastUpdated: 'Atualizado em Setembro de 2026',
    sections: [
      {
        heading: '1. Objeto e Natureza dos Serviços',
        content:
          'Haven Games é uma plataforma web independente focada na adaptação, emulação e preservação de clássicos retrô para navegadores modernos via tecnologias WebGL e WebAssembly. O acesso aos jogos é gratuito e destinado exclusivamente ao entretenimento comunitário.',
      },
      {
        heading: '2. Contas, Nicks e Segurança',
        content:
          'O jogador é o único responsável pela guarda de suas credenciais de acesso e integridade do seu inventário. É estritamente vedada a comercialização de contas por dinheiro real (RMT não autorizado fora das mecânicas do jogo) ou o compartilhamento de acessos visando burlar limites de conexão.',
      },
      {
        heading: '3. Integridade do Software e Exploits',
        content:
          'O uso de ferramentas automatizadas não oficiais (macros maliciosos, injeção de pacotes na camada de rede ou manipulação do código cliente no browser) que prejudiquem a experiência de outros jogadores acarretará suspensão preventiva ou banimento permanente.',
      },
      {
        heading: '4. Doações e Sustentabilidade dos Servidores',
        content:
          'Todas as eventuais contribuições e doações voluntárias destinam-se exclusivamente ao custeio de infraestrutura de nuvem, largura de banda, servidores dedicados e mitigação anti-DDoS, mantendo a operação acessível e sustentável para a comunidade.',
      },
    ],
  },
  privacy: {
    id: 'privacy',
    title: 'Política de Privacidade & Proteção de Dados',
    subtitle: 'Como tratamos suas informações com total respeito à LGPD e GDPR.',
    lastUpdated: 'Atualizado em Setembro de 2026',
    sections: [
      {
        heading: '1. Coleta Mínima Necessária (Privacy by Design)',
        content:
          'Coletamos apenas os dados essenciais para o funcionamento do jogo: identificador de conta (nick/e-mail), endereço IP temporário para controle de latência e mitigação de ataques DDoS, e dados técnicos de hardware gráfico para otimizar shaders WebGL.',
      },
      {
        heading: '2. Armazenamento Local e em Nuvem',
        content:
          'Preferências de interface, áudio e atalhos de teclado são mantidos prioritariamente no armazenamento local do seu navegador (LocalStorage / IndexedDB). O progresso do personagem e inventário são sincronizados de forma criptografada nos servidores do cluster.',
      },
      {
        heading: '3. Não Compartilhamento com Terceiros',
        content:
          'Haven Games não comercializa, não aluga e não repassa informações pessoais ou e-mails de seus usuários para redes de publicidade ou terceiros sob nenhuma hipótese.',
      },
      {
        heading: '4. Direitos do Jogador (Exclusão e Portabilidade)',
        content:
          'A qualquer momento o titular da conta pode solicitar a exclusão definitiva de seus dados e registros de progresso através dos canais de suporte no Discord oficial.',
      },
    ],
  },
  fairplay: {
    id: 'fairplay',
    title: 'Diretrizes de Fair Play & Conduta Comunitária',
    subtitle: 'Nosso compromisso com um ambiente saudável, competitivo e respeitoso.',
    lastUpdated: 'Atualizado em Setembro de 2026',
    sections: [
      {
        heading: '1. Tolerância Zero a Discriminação e Assédio',
        content:
          'Não toleramos qualquer tipo de discurso de ódio, racismo, assédio, homotransfobia, misoginia ou toxicidade deliberada nos chats públicos, canais do Discord ou nomes de clãs e personagens.',
      },
      {
        heading: '2. Espírito Competitivo Saudável',
        content:
          'Disputas de guildas (Guerra do Emperium, Castelos de Lorencia e Ligas Pokémon) devem ser decididas pela estratégia e habilidade. Conluios para burlar pontuações ou trapaças em eventos globais acarretam perda de títulos e premiações.',
      },
      {
        heading: '3. Proteção Contra Golpes e Engenharia Social',
        content:
          'Tentativas de se passar por membros da equipe (Game Masters / Moderadores) para subtrair itens ou senhas resultarão em expulsão imediata de todos os servidores e do Discord oficial.',
      },
    ],
  },
};
