import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/common/models/userModel.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user: IUser = {
    id: 0,
    userId: 0,
    title: '',
    body: '',
  }

}
