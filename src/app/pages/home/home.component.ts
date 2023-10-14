import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/common/models/userModel.model';
import { UserService } from 'src/app/common/services/user/user.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list: IUser[] = [];
  currentUser: string = '';
  users$: Observable<IUser[]> = of([]);
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.get();
    
    this.currentUser = this.authService.get();
  }

  signUp() {
    this.authService.signUp();
  }

  userById(index: number, user: IUser) {
    return user.id
  }
}
