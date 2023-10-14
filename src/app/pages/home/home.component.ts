import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/common/models/userModel.model';
import { UserService } from 'src/app/common/services/user/user.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list: IUser[] = [];
  currentUser: string = '';
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.get()
      .subscribe((users: IUser[]) => this.list = users);
    
    this.currentUser = this.authService.get();
  }

  signUp() {
    this.authService.signUp();
  }
}
