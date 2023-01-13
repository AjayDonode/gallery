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

  // Comments
  async addComment(comment: Comment) {
    return this.commentsCollection.add(comment);
  }

  async updateComment(commentId: string, comment: Comment) {
    return this.commentsCollection.doc(commentId).update(comment);
  }

  async deleteComment(commentId: string) {
    return this.commentsCollection.doc(commentId).delete();
  }

  getLikeCount(articleId: string) {
    return this.afs.collection<Like>('likes', ref => ref.where('articleId', '==', articleId)).valueChanges().pipe(
      map(likes => likes.length)
    );
  }
}
