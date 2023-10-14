import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/common/models/userModel.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  
  get(): Observable<IUser[]> {
    return this.http.get<IUser[]>(environment.userServiceUrl);
  }
}
