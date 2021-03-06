import { Component       }  from  '@angular/core';
import { OnInit          }  from  '@angular/core';

import { Post            }  from  './post';
import { PostService     }  from  './post.service';
import { PersonalPostComponent }  from  './personalPost.component';

@Component({
  selector:'myposts',
  providers: [ PostService ],
  template: `
  <ul class="postsList">
    <li *ngFor='let post of posts'>
      <personalpost [post]="post"></personalpost>
    </li>
  </ul>
  `
})

export class MyPostsComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService){  } // Inject PostService

  // Get Posts on Init //
  ngOnInit(): void {
    this.getPosts();
  }

  // Get Posts from PostService //
  getPosts(): void {
    this.postService.getMyPosts().then(posts => this.posts = posts);
  }
}
