# lopes2tech - Swiss IT Solutions & Automation

A modern, multilingual, SEO‑optimized website built with Angular 20 (standalone components + SSR) showcasing lopes2tech’s automation, AI, and web solutions for Swiss service businesses.

## About lopes2tech

lopes2tech is a Swiss sole proprietorship based in Zurich, founded by Paulo R. Lopes. We specialize in:

- Automation & AI agents for service businesses
- Modern websites and client portals
- Custom CRM and workflow tools
- Privacy‑focused solutions for Swiss & EU regulations (nDSG / GDPR)

## Company Information

**Paulo R. Lopes**  
lopes2tech - Sole Proprietorship 
Zurich, Switzerland  
Phone: +41 78 798 95 33

## Development

This project is built with Angular 20 (Angular CLI 20.3.x) and uses the latest Angular features, including:
- Standalone components
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Modern SCSS styling

### Development server

To start a local development server, run:

```bash
npm run start
```

The application will be available at `http://localhost:4200/` and will automatically reload when you modify source files.

### Building

To build the project for production:

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

### Additional Commands

- `npm run watch` - Build in watch mode for development
- `npm run test` - Run unit tests with Karma
- `npm run serve:ssr:lopes2tech-app` - Serve the SSR version

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/            # Navigation, language selector, theme toggle
│   │   ├── hero/              # Hero/banner with main value proposition & CTA
│   │   ├── services/          # Service cards (Services V2) + AI solutions dialog
│   │   ├── ai-solutions/      # Detailed AI services landing page
│   │   ├── about/             # About the founder & positioning
│   │   ├── portfolio/         # Project gallery / case studies
│   │   ├── contact/           # Contact form with validation
│   │   ├── ai-chat/           # Lopes2Tech Digital Assistant (chat widget)
│   │   ├── client-login/      # Client portal login page
│   │   ├── privacy/           # Privacy policy
│   │   ├── terms/             # Terms & Conditions (AGB)
│   │   ├── impressum/         # Legal notice / imprint
│   │   └── footer/            # Footer with links & social icons
│   ├── services/              # Angular services (SEO, translations, email, etc.)
│   ├── utils/                 # SEO route config, fallback responses, helpers
│   ├── app.html               # Main app template
│   ├── app.scss               # Global app layout styles
│   └── app.ts                 # Root component (layout shell + routing)
├── styles.scss                # Global styles & CSS variables (themes)
└── index.html                 # Root HTML file + meta tags & structured data
```

## Features

## Features

- **🎨 Modern design**: Clean, conversion‑oriented layout for Swiss service businesses
- **📱 Responsive**: Mobile‑first design that works across devices
- **🤖 AI Digital Assistant**: OpenAI‑backed chatbot with language‑aware responses (EN/DE/PT)
- **🔧 Modular architecture**: Standalone components and focused Angular services
- **📝 Contact & lead forms**: Reactive forms with validation and error handling
- **🌐 SEO‑ready**: SSR, structured data, canonical URLs, Open Graph & Twitter cards, sitemap/robots
- **🌍 Multilingual**: i18n with English, German, and Portuguese JSON translation files
- **🔐 Client portal ready**: Dedicated login page for secure client access & document workflows
- **🎯 Accessible**: Semantic HTML and keyboard‑friendly UI patterns

## Technologies

- **Angular 20 (standalone + SSR)**
- **TypeScript**
- **SCSS & CSS Variables**
- **RxJS**
- **Express.js** (SSR host)

## License

© 2025 lopes2tech. All rights reserved.
