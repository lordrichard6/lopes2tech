import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { BlogService, BlogPost } from '../../services/blog.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-blog-post',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './blog-post.component.html',
    styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
    post$: Observable<BlogPost | undefined>;

    constructor(
        private route: ActivatedRoute,
        private blogService: BlogService,
        private meta: Meta,
        private title: Title,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.post$ = this.route.paramMap.pipe(
            switchMap(params => {
                const slug = params.get('slug');
                return this.blogService.getPostBySlug(slug || '');
            }),
            tap(post => {
                if (post) {
                    this.updateSEO(post);
                }
            })
        );
    }

    ngOnInit(): void { }

    private updateSEO(post: BlogPost): void {
        this.title.setTitle(`${post.title} - Lopes2Tech Insights`);

        this.meta.updateTag({ name: 'description', content: post.excerpt });

        // Open Graph
        this.meta.updateTag({ property: 'og:title', content: post.title });
        this.meta.updateTag({ property: 'og:description', content: post.excerpt });
        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:image', content: `https://lopes2tech.ch${post.image}` });
        this.meta.updateTag({ property: 'og:url', content: `https://lopes2tech.ch/insights/${post.slug}` });

        // Twitter Card
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: post.title });
        this.meta.updateTag({ name: 'twitter:description', content: post.excerpt });
        this.meta.updateTag({ name: 'twitter:image', content: `https://lopes2tech.ch${post.image}` });

        // Canonical URL
        this.updateCanonicalUrl(`https://lopes2tech.ch/insights/${post.slug}`);
    }

    private updateCanonicalUrl(url: string): void {
        const head = this.document.getElementsByTagName('head')[0];
        let element: HTMLLinkElement | null = this.document.querySelector(`link[rel='canonical']`) || null;

        if (!element) {
            element = this.document.createElement('link') as HTMLLinkElement;
            head.appendChild(element);
        }

        element.setAttribute('rel', 'canonical');
        element.setAttribute('href', url);
    }
}
