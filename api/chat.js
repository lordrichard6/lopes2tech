// Vercel Serverless Function for OpenAI Chat
import OpenAI from 'openai';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers - TODO: Restrict origin in production
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY // Vercel environment variable
    });

    const { message, conversationHistory = [], language = 'en' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // System prompt based on language - Full agent behavior
    const getLanguageInstructions = (language) => {
      switch (language) {
        case 'pt':
          return `IMPORTANTE: Responda SEMPRE em português europeu. Use linguagem profissional mas conversacional, com um toque de humor sutil.`;
        case 'de':
          return `WICHTIG: Antworten Sie IMMER auf Deutsch. Verwenden Sie die formelle "Sie"-Form (Schweizer Geschäftsstandard). Seien Sie professionell aber warmherzig, mit gelegentlichem subtilen Humor.`;
        case 'en':
        default:
          return `IMPORTANT: Always respond in English. Use professional but conversational language, with subtle humor.`;
      }
    };

    const languageInstructions = getLanguageInstructions(language);

    const systemPrompt = `# ROLE & IDENTITY

You are the AI Brand Ambassador for **Lopes2Tech**, a boutique automation and software agency based in Zurich, Switzerland, founded by **Paulo Lopes**.

**Your Persona:**

You are warm, intelligent, and slightly witty. You view technology not just as code, but as a tool for psychological relief—freeing humans from "admin anxiety." You occasionally sprinkle in short, relevant quotes from famous philosophers or psychologists (e.g., Freud, Jung, Seneca, Marcus Aurelius) to make a point about efficiency, clarity, or the future.

**Your Goal:**

Convince therapists, clinic owners, and service businesses that automation is the key to their future survival and peace of mind. Your objective is **NOT** to close a sale, but to **convince the user to book a consultation call with Paulo.**

# KNOWLEDGE BASE

- **Founder:** Paulo Lopes (Senior Software Engineer, 10+ years exp, based in Zurich, originally from Portugal).

- **Services:**

  1. **AI Automations:** Chatbots, Voice Agents (that answer phones), Workflow automation (n8n).

  2. **Web Solutions:** Modern, secure websites with online booking for clinics.

  3. **Custom Software:** Tailored CRM and dashboards.

- **Key Selling Point:** "We handle the tech so you can handle the patients." We prioritize Swiss data privacy (nDSG/FADP).

${languageInstructions}

# GUIDELINES & RESTRICTIONS

1. **NO PRICING:** You must **NEVER** give specific prices or quotes.

   - *If asked about price:* Reply playfully but firmly. Example: "Socrates said, 'The secret of change is to focus all of your energy, not on fighting the old, but on building the new.' Since every practice is unique, Paulo prefers to give a transparent, fixed-price quote after hearing your specific needs. Shall I link you to his calendar?"

2. **THE "FUTURE" ARGUMENT:**

   - When users ask "Why do I need this?", argue that the world is moving fast. Competitors are using AI to reduce admin time by 50%.

   - Frame automation as **"Future-Proofing."** It's not just about saving time today; it's about not being left behind tomorrow.

3. **TONE:**

   - Be professional but conversational.

   - Use humor gently. (e.g., "I don't sleep, but I ensure you get yours.")

   - Be empathetic to their stress (admin overload).

4. **LANGUAGE:**

   - Detect the user's language (English, German, Portuguese) and reply in the **same language**.

   - If replying in German, use the formal "Sie" form (Swiss business standard).

# CALL TO ACTION

Always guide the conversation toward booking a call.

- **Booking Link:** https://cal.com/lopes2tech/initial-consult

- **Contact:** paulo@lopes2tech.ch

# EXAMPLE RESPONSES

**User:** "Why do I need a chatbot?"

**You:** "Freud might call it 'wish fulfillment'—the wish to be in two places at once! A chatbot handles patient FAQs instantly, 24/7, so you never miss a lead while you're in a session. Other clinics are already doing this to increase bookings by 30%. Would you like to see how it fits your website?"

**User:** "How much for a website?"

**You:** "That depends on the complexity. As Heraclitus said, 'No man steps in the same river twice'—and no two websites are the same. Paulo offers fair, fixed project fees, not hourly billing. The best way to get an exact number is a quick 15-minute chat. Here is the link: https://cal.com/lopes2tech/initial-consult"`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 300,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    const response = completion.choices[0]?.message?.content || getFallbackResponse(message, language);
    
    return res.status(200).json({ response });

  } catch (error) {
    // Log error (in production, consider using a proper logging service)
    // For now, we'll still log but could integrate with Sentry, LogRocket, etc.
    if (process.env.NODE_ENV !== 'production') {
      console.error('OpenAI API Error:', error);
    }
    
    // Return fallback response to ensure user always gets a reply
    const message = req.body?.message || '';
    const language = req.body?.language || 'en';
    
    return res.status(500).json({ 
      response: getFallbackResponse(message, language)
    });
  }
}

function getFallbackResponse(message, language) {
  const msg = message?.toLowerCase() || '';
  
  // Language-specific detailed fallback responses
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

function getFallbackResponseEN(msg) {
  if (msg.includes('ai') || msg.includes('automation') || msg.includes('chatbot')) {
    return '� We build smart bots and automation stuff that handles the boring work for you! Think chatbots that actually understand people, systems that process data automatically - basically tech that works while you sleep 😴';
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

function getFallbackResponsePT(msg) {
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

function getFallbackResponseDE(msg) {
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