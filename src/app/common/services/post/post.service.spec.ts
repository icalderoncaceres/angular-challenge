import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { IPost } from '../../models/postModel.model';
import { POSTS } from '../../mocks/posts.mock';
import { environment } from 'src/environments/environment';

describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PostService
      ]
    });
    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return 10 posts', () => {
    service.get().subscribe((posts: IPost[]) => {
      expect(posts).toBeTruthy();
      expect(posts.length).toBe(10);
    });

    const req = httpTestingController.expectOne(environment.postServiceUrl);

    expect(req.request.method).toEqual("GET");

    req.flush(POSTS);
  });
});
