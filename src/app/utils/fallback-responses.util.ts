/**
 * Shared fallback response utilities
 * Used by both the frontend service and backend API
 */

export type Language = 'en' | 'pt' | 'de';

/**
 * Get fallback response based on message content and language
 */
export function getFallbackResponse(message: string, language: Language = 'en'): string {
  const msg = message?.toLowerCase() || '';
  
  switch (language) {
    case 'pt':
      return getFallbackResponsePT(msg);
    case 'de':
      return getFallbackResponseDE(msg);
    case 'en':
    default:
      return getFallbackResponseEN(msg);
  }
}

function getFallbackResponseEN(msg: string): string {
  if (msg.includes('ai') || msg.includes('automation') || msg.includes('chatbot')) {
    return '🤖 We build smart bots and automation stuff that handles the boring work for you! Think chatbots that actually understand people, systems that process data automatically - basically tech that works while you sleep 😴';
  }
  
  if (msg.includes('web') || msg.includes('website') || msg.includes('site')) {
    return '🌐 We make websites that look amazing and work perfectly on everything - phones, tablets, computers. From online stores to company sites, we build digital experiences people actually want to use!';
  }
  
  if (msg.includes('software') || msg.includes('app') || msg.includes('mobile')) {
    return '📱 Custom apps and software? That\'s our jam! Mobile apps, desktop tools, business systems - we build whatever you need to make your life easier. Modern tech, built right.';
  }
  
  if (msg.includes('price') || msg.includes('cost') || msg.includes('budget')) {
    return '💰 Pricing really depends on what you\'re looking for, but we\'re pretty reasonable! Every project\'s different, so let\'s chat about what you need and we\'ll figure it out together 😊';
  }
  
  if (msg.includes('team') || msg.includes('who') || msg.includes('owner') || msg.includes('company') || msg.includes('paulo')) {
    return '👨‍💻 lopes2tech is Paulo\'s thing - he\'s the main guy who builds everything! It\'s a lean operation, just him most of the time, but he brings in trusted collaborators when projects need extra expertise. Personal service, no corporate BS!';
  }
  
  if (msg.includes('contact') || msg.includes('hello') || msg.includes('hi')) {
    return '👋 Hey there! I\'m here to help you figure out how lopes2tech can make your tech dreams come true. We do AI automation, web stuff, and custom software. What\'s on your mind?';
  }

  return '🤔 Interesting question! I\'m here to chat about all the cool tech stuff we do - AI automation, web development, custom software. What would you like to know more about? Or just tell me what problem you\'re trying to solve!';
}

function getFallbackResponsePT(msg: string): string {
  if (msg.includes('ia') || msg.includes('inteligencia') || msg.includes('automacao') || msg.includes('chatbot')) {
    return '🤖 Fazemos bots inteligentes e automação que cuidam do trabalho aborrecido por si! Chatbots que percebem mesmo, sistemas que processam dados automaticamente - basicamente tecnologia que trabalha enquanto descansa 😴';
  }
  
  if (msg.includes('web') || msg.includes('site') || msg.includes('website')) {
    return '🌐 Criamos sites que ficam fantásticos e funcionam perfeitamente em qualquer lugar - telemóvel, tablet, computador. De lojas online a sites corporativos, fazemos experiências digitais que as pessoas realmente querem usar!';
  }
  
  if (msg.includes('software') || msg.includes('app') || msg.includes('aplicativo') || msg.includes('mobile')) {
    return '📱 Apps e software à medida? É a nossa especialidade! Apps mobile, ferramentas desktop, sistemas empresariais - desenvolvemos o que precisar para facilitar a sua vida. Tecnologia moderna, feita como deve ser.';
  }
  
  if (msg.includes('preco') || msg.includes('custo') || msg.includes('orcamento')) {
    return '💰 O preço depende mesmo do que procura, mas somos bastante justos! Cada projecto é diferente, por isso vamos conversar sobre o que precisa e descobrimos juntos 😊';
  }
  
  if (msg.includes('equipe') || msg.includes('quem') || msg.includes('dono') || msg.includes('empresa') || msg.includes('paulo')) {
    return '👨‍💻 A lopes2tech é do Paulo - ele é quem constrói tudo! É uma operação enxuta, na maior parte do tempo só ele, mas quando os projectos precisam de mais experiência, traz colaboradores de confiança. Atendimento pessoal, sem complicações corporativas!';
  }
  
  if (msg.includes('contato') || msg.includes('ola') || msg.includes('oi')) {
    return '👋 Olá! Estou aqui para o ajudar a descobrir como a lopes2tech pode realizar os seus sonhos tecnológicos. Fazemos automação com IA, desenvolvimento web e software personalizado. O que se passa?';
  }

  return '🤔 Pergunta interessante! Estou aqui para falar sobre todas as coisas fixes que fazemos - automação com IA, desenvolvimento web, software personalizado. O que gostaria de saber mais? Ou conte-me que problema está a tentar resolver!';
}

function getFallbackResponseDE(msg: string): string {
  if (msg.includes('ki') || msg.includes('automatisierung') || msg.includes('chatbot')) {
    return '🤖 Wir bauen smarte Bots und Automatisierung, die dir die langweilige Arbeit abnehmen! Chatbots die Menschen wirklich verstehen, Systeme die Daten automatisch verarbeiten - basically Tech die arbeitet während du schläfst 😴';
  }
  
  if (msg.includes('web') || msg.includes('website') || msg.includes('seite')) {
    return '🌐 Wir machen Websites die super aussehen und überall perfekt funktionieren - Handy, Tablet, Computer. Von Online-Shops bis Firmen-Websites, wir bauen digitale Erfahrungen die Leute wirklich nutzen wollen!';
  }
  
  if (msg.includes('software') || msg.includes('app') || msg.includes('anwendung') || msg.includes('mobil')) {
    return '📱 Custom Apps und Software? Das ist unser Ding! Mobile Apps, Desktop-Tools, Business-Systeme - wir bauen was auch immer du brauchst um dein Leben einfacher zu machen. Moderne Tech, richtig gemacht.';
  }
  
  if (msg.includes('preis') || msg.includes('kosten') || msg.includes('budget')) {
    return '💰 Der Preis hängt echt davon ab was du suchst, aber wir sind ziemlich fair! Jedes Projekt ist anders, also lass uns über deine Ideen quatschen und wir finden was Passendes 😊';
  }
  
  if (msg.includes('team') || msg.includes('wer') || msg.includes('inhaber') || msg.includes('firma') || msg.includes('paulo')) {
    return '👨‍💻 lopes2tech gehört Paulo - er ist der Haupttyp der alles baut! Es ist ein schlanker Betrieb, meist nur er, aber bei größeren Projekten holt er vertrauensvolle Mitarbeiter dazu. Persönlicher Service, kein Corporate-Gedöns!';
  }
  
  if (msg.includes('kontakt') || msg.includes('hallo') || msg.includes('hi')) {
    return '👋 Hey! Ich bin hier um dir zu helfen rauszufinden wie lopes2tech deine Tech-Träume wahr machen kann. Wir machen KI-Automatisierung, Web-Zeug und custom Software. Was liegt dir auf dem Herzen?';
  }

  return '🤔 Interessante Frage! Ich bin hier um über all die coolen Tech-Sachen zu quatschen die wir machen - KI-Automatisierung, Web-Entwicklung, custom Software. Was möchtest du wissen? Oder erzähl mir einfach welches Problem du lösen willst!';
}

