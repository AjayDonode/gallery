import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss'],
})
export class GridListComponent implements OnInit {
  @Input() data: any;
  @Input() label = '';
  @Output() itemClicked = new EventEmitter();
  isGrid = false;
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

}
