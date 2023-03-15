import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
// import { Base64 } from '@ionic-native/base64/ngx';
@Injectable({
  providedIn: 'root'
})
export class SeoService {
  _url :any; 
  constructor( private title: Title, private metaService: Meta) {}

  shareData = {
    title: 'My awesome tweet',
    text: 'Check out this awesome tweet I found!',
    url: 'https://twitter.com/',
    files: [
      new File(
        ['https://example.com/image.jpg'],
        'image.jpg',
        { type: 'image/jpeg' }
      )
    ]
  };

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

  getShareData(title, description, img){
    this.shareData.title = title;
    this.shareData.text = description;
   // this.shareData.files.push(base64.img);
    return this.shareData;
  }
}