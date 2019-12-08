import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/services/database.service';
import { ImageData } from '../addgallery/ImageData';

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {
  gallery: ImageData[] = [];
  loaded = false;
  constructor(private storage: AngularFireStorage, private imageDBService: DatabaseService) {
    // this.imageDBService = imageDBService;
  }
  ngOnInit() {
     this.imageDBService.getImages().subscribe(res => {
      this.gallery = res;
    });
  }
}
