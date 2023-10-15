import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { PostService } from 'src/app/common/services/post/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule} from '@angular/material/toolbar';
import { PostCardComponent } from 'src/app/components/post-card/post-card.component';
import { POSTS } from 'src/app/common/mocks/posts.mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['get', 'signOut']);
    const postServiceSpy = jasmine.createSpyObj('PostService', ['get']);
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        PostCardComponent
      ],
      imports: [
        HttpClientTestingModule,
        MatToolbarModule,
        BrowserModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: PostService, useValue: postServiceSpy },
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should close the session', () => {
    component.signOut();
    expect(component).toBeTruthy();
  });

  it('Should return ', () => {
    const result = component.postById(2, POSTS[2]);
    expect(result).toBe(POSTS[2].id);
  });
});
