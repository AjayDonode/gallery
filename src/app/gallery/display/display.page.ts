import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

  gallery: any = {
    id: 'article_id',
    title: 'Ganesh Temples',
    description: 'RTCSessionDescription',
    gallery: [
      {
        id: 1,
        header: 'Lalbagcha Raja',
        href: 'https://picsum.photos/500/700',
        path: 'uploads',
        description: 'Test blah , lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsomblah blah , '+
        'lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsom END'
      }, {
        id: 2,
        header: 'option1',
        href: 'https://picsum.photos/500/700',
        path: 'uploads',
        description: 'blah blah , lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsomblah blah ,'+
        ' lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsom END'
      }, {
        id: 3,
        header: 'option3',
        href: 'https://picsum.photos/500/700',
        path: 'uploads',
        description: 'blah blah , lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsomblah blah ,'+
        '  lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsom END'
      }, {
        id: 4,
        header: 'option4',
        href: 'https://picsum.photos/500/700',
        path: 'uploads',
        description: 'blah blah , lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsomblah blah , '+
        ' lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsomblah blah , lorem ipsom END'
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }
}
