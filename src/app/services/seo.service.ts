import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class SeoService {
  _url :any; 
  constructor(private title: Title, private metaService: Meta) {}

  addTwitterCard(title, description, img) {
    // Set HTML Document Title
    this._url  =  window.location;
    this.title.setTitle(title);
    console.log("Name {} , description {} image {}", title, description , img)
    this.metaService.addTags([
      { name: 'keywords',content: title},
      { property: 'og:type', content: "article" },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: this._url },
      { property: 'og:image', content: img},
      { name: 'twitter:card', content: "summary" },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:site', content: "@Bing Bong" },
      { name: 'twitter:creator', content: "@Bing Bong" },
      { name: 'twitter:image', content: img},
      { name: 'twitter:url', content: this._url }
    ]);

  }
}