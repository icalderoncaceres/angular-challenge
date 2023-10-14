import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPost } from 'src/app/common/models/postModel.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }
  
  get(): Observable<IPost[]> {
    return this.http.get<IPost[]>(environment.postServiceUrl);
  }
}
