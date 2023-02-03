import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Comment } from 'src/app/modals/Comment';
import { User } from 'src/app/modals/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'add-comment-modal',
  templateUrl: './modal-comment.component.html',
  styleUrls: ['./modal-comment.component.scss'],
})

//selector: 'create-gallery-modal-page',
export class ModalCommentComponent {
  comment: Comment = {
    articleId: null,
    userId: null,
    userAvatar: null,
    content: null,
    createdAt: Date.now()
  };
  //mycomment : string;
  galleryid;
  comments :any;
  currentUser: User;
 

  constructor(private modalCtrl: ModalController, 
    private feedBackService: FeedbackService,
    private authService: AuthenticationService) {}

  ngOnInit() {
    this.feedBackService.getComments(this.galleryid).subscribe(res => {
      this.comments = res;
    });
    
   this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
 
  saveAndClose() {
    console.log(this.comment.content );
    this.comment.articleId = this.galleryid;
    this.comment.userId = this.currentUser.displayName;
    this.comment.userAvatar = this.currentUser.photoURL;
    this.comment.createdAt =  Date.now();
    this.feedBackService.addComment(this.comment);
    return this.modalCtrl.dismiss(this.comment, 'confirm');
  }
}