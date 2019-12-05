import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  gallerylist: any;
  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.galleryService.getGalleryList().subscribe(res => {
     this.gallerylist = res;
   });
 }
 
 createNewGallery() {
   console.log("Create Gallery");
 }


}
