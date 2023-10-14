import { Component, Input } from '@angular/core';
import { IPost } from 'src/app/common/models/postModel.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post: IPost = {
    id: 0,
    userId: 0,
    title: '',
    body: '',
  }

}
