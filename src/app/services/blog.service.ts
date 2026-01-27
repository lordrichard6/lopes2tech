import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    image: string;
    tags: string[];
    content: string;
    author?: string;
    authorRole?: string;
}

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private dataUrl = '/assets/content/blog-posts.json';
    private posts$: Observable<BlogPost[]> | null = null;

    constructor(private http: HttpClient) { }

    getPosts(): Observable<BlogPost[]> {
        if (!this.posts$) {
            this.posts$ = this.http.get<BlogPost[]>(this.dataUrl).pipe(
                shareReplay(1)
            );
        }
        return this.posts$;
    }

    getPostBySlug(slug: string): Observable<BlogPost | undefined> {
        return this.getPosts().pipe(
            map(posts => posts.find(post => post.slug === slug))
        );
    }
}
