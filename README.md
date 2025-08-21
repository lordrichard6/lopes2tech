# lopes2tech - Swiss IT Solutions & Automation

A modern, responsive website built with Angular 20+ showcasing lopes2tech's IT services, process automation, and digital solutions.

## About lopes2tech

lopes2tech is a Swiss Sole Proprietorship company based in Zurich, founded by Paulo R. Lopes. We specialize in:

- Process Automation
- Web Development
- App Development (macOS, iPad, iOS)
- Custom Tools & Solutions

## Company Information

**Paulo R. Lopes**  
lopes2tech - Sole Proprietorship 
Zurich, Switzerland  
Phone: +41 78 798 95 33

## Development

This project was built using Angular CLI version 20.1.5 with the latest Angular features including:
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
│   │   ├── header/           # Fixed navigation component
│   │   │   ├── header.html
│   │   │   ├── header.scss
│   │   │   └── header.ts
│   │   ├── hero/             # Hero/banner section
│   │   │   ├── hero.html
│   │   │   ├── hero.scss
│   │   │   └── hero.ts
│   │   ├── services/         # Services showcase
│   │   │   ├── services.html
│   │   │   ├── services.scss
│   │   │   └── services.ts
│   │   ├── about/            # About/company info
│   │   │   ├── about.html
│   │   │   ├── about.scss
│   │   │   └── about.ts
│   │   ├── contact/          # Contact form with validation
│   │   │   ├── contact.html
│   │   │   ├── contact.scss
│   │   │   └── contact.ts
│   │   └── footer/           # Site footer
│   │       ├── footer.html
│   │       ├── footer.scss
│   │       └── footer.ts
│   ├── services/             # Angular services
│   │   └── business-info.ts  # Business data service
│   ├── app.html              # Main app template
│   ├── app.scss              # Global app styles
│   └── app.ts                # Root component
├── styles.scss               # Global styles & CSS variables
└── index.html                # Main HTML file
```

## Features

- **🎨 Modern Design**: Clean, professional layout inspired by lopes.solutions
- **📱 Responsive**: Mobile-first design that works on all devices
- **⚡ Performance**: Angular 20+ with SSR/SSG enabled for optimal loading
- **🔧 Modular Architecture**: Well-organized component structure for maintainability
- **📝 Contact Form**: Reactive forms with validation and error handling
- **🌐 SEO Ready**: Server-side rendering for better search engine visibility
- **💼 Business Focused**: Tailored for service-based companies
- **🎯 Accessible**: WCAG compliant design with proper semantic HTML

## Technologies

- **Angular 20+**: Latest Angular with standalone components
- **TypeScript**: Full type safety and modern JavaScript features
- **SCSS**: Component-scoped styling with CSS variables
- **Reactive Forms**: Form validation and state management
- **Angular SSR**: Server-side rendering for better performance
- **CSS Grid & Flexbox**: Modern layout techniques

## Technologies Used

- Angular 20+
- TypeScript
- SCSS
- Express.js (for SSR)
- RxJS

## License

© 2025 lopes2tech. All rights reserved.
