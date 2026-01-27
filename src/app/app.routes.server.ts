import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'insights/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const slugs = [
        'ai-workflows-reduce-dev-time',
        'technical-seo-development-2026',
        'cost-custom-web-development-zurich',
        'programmatic-seo-scaling',
        'replacing-manual-tasks-ai-workflows',
        'high-performance-websites-convert-better',
        'integrating-ai-agents-corporate-website',
        'future-web-development-ai-coding',
        'digital-transformation-swiss-smes',
        'case-study-scalable-saas-3-weeks'
      ];
      return slugs.map(slug => ({ slug }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
