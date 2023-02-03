import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Like } from 'src/app/modals/Like';
import { Comment } from 'src/app/modals/Comment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
 
  private likesCollection: AngularFirestoreCollection<Like>;
  private commentsCollection: AngularFirestoreCollection<Comment>;

  constructor(private afs: AngularFirestore) {
    this.likesCollection = afs.collection<Like>('likes');
    this.commentsCollection = afs.collection<Comment>('comments');
  }

  // Likes
  async addLike(like: Like) {
    return this.likesCollection.add(like);
  }

  async deleteLike(likeId: string) {
    return this.likesCollection.doc(likeId).delete();
  }

  getLikeCount(articleId: string) {
    return this.afs.collection<Like>('likes', ref => ref.where('articleId', '==', articleId)).valueChanges().pipe(
      map(likes => likes.length)
    );
  }

  // Comments

   
  getCommentCount(articleId: string) {
    return this.afs.collection<Like>('comments', ref => ref.where('articleId', '==', articleId)).valueChanges().pipe(
      map(comments => comments.length)
    );
  }

  getComments(galleryId: String) {
    console.log(galleryId)
    return this.afs.collection<Comment>('comments', ref => ref.where('articleId', '==', galleryId)).valueChanges().pipe(
      map(comments => comments)
    );
  }

  async addComment(comment: Comment) {
    return this.commentsCollection.add(comment);
  }

  async updateComment(commentId: string, comment: Comment) {
    return this.commentsCollection.doc(commentId).update(comment);
  }

  async deleteComment(commentId: string) {
    return this.commentsCollection.doc(commentId).delete();
  }
  
}
