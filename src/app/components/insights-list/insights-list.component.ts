import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogService, BlogPost } from '../../services/blog.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-insights-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './insights-list.component.html',
    styleUrls: ['./insights-list.component.scss']
})
export class InsightsListComponent implements OnInit {
    posts$: Observable<BlogPost[]>;

    constructor(
        private blogService: BlogService,
        private meta: Meta,
        private title: Title
    ) {
        this.posts$ = this.blogService.getPosts();
    }

    ngOnInit(): void {
        this.title.setTitle('Insights - Lopes2Tech | AI Workflows & SEO Development');
        this.meta.updateTag({ name: 'description', content: 'Explore our latest insights on AI workflows, high-performance website development, and programmatic SEO. Learn how we speed up delivery by 10x.' });
    }
}
