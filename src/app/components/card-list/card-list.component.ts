import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gallery } from 'src/app/gallery/addgallery/Gallery';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input() data: any;
  @Input() label = '';
  @Output() itemClicked = new EventEmitter();
  isGrid = false;
  

  slideOptions = {
    initialSlide: 0,
    slidesPerView: 2,
    autoplay: true
  };

  
  constructor() { }

  ngOnInit() {
  }

  toggleIcon() {
    if (this.isGrid) {
      this.isGrid = false;
    } else { this.isGrid = true; }
  }

  clickLink(id) {
    this.itemClicked.emit(id);
  }

  getThumbImage(gallery:Gallery){
    var imageUrl = gallery.filepath;
    if(imageUrl == undefined){
      if (gallery.images.length > 0) imageUrl = gallery.images[0].filepath;
      else imageUrl = "/assets/dummy.jpeg";
    }
    return imageUrl;
  }
  
}
