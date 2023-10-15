import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/common/models/postModel.model';
import { PostService } from 'src/app/common/services/post/post.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list: IPost[] = [];
  currentUser: string = '';
  posts$: Observable<IPost[]> = of([]);
  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postService.get();
    
    this.currentUser = this.authService.get();
  }

  signOut() {
    this.authService.signOut();
  }

  postById(index: number, post: IPost) {
    return post.id
  }
}
