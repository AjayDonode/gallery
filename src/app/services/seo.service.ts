import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) {}

  addTwitterCard(title, description, img) {
    // Set HTML Document Title
    this.title.setTitle(title);

    // Add Twitter Card Metatags
    this.meta.updateTag({ name: 'og:title', content: title });
    this.meta.updateTag({ name: 'og:description', content: description });
    this.meta.updateTag({ name: 'og:image', content: img });
    this.meta.updateTag({ name: 'twitter:card', content: description });
    this.meta.updateTag({ name: 'twitter:site', content: title });
    this.meta.updateTag({ name: 'og:image:alt', content: title });
  }
}