import { Injectable     }  from  '@angular/core';
import { Headers, Http  }  from  '@angular/http';
import { RequestOptions }  from  '@angular/http';

import { Post           }  from  './post';

import  'rxjs/add/operator/toPromise';

@Injectable()
export class PostService {
  browsePosts = "/browsePosts";
  newPosts    = "/newPosts";
  topPosts    = "/topPosts";
  myPosts     = "/myPosts";
  postId      = "/postById";

  constructor(private http: Http){  }

  getBrowsePosts(): Promise<Post[]>{
    return this.http.get(this.browsePosts)
    .toPromise()
    .then(response => this.filterPosts(response.json() as Post[]))
    .catch(this.handleError);
  }

  getNewPosts(): Promise<Post[]>{
    return this.http.get(this.newPosts)
    .toPromise()
    .then(response => this.filterPosts(response.json() as Post[]))
    .catch(this.handleError);
  }

  getTopPosts(): Promise<Post[]>{
    return this.http.get(this.topPosts)
    .toPromise()
    .then(response => this.filterPosts(response.json() as Post[]))
    .catch(this.handleError);
  }

  getMyPosts(): Promise<Post[]>{
    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.myPosts, {"uid": localStorage.getItem("UID")}, options)
    .toPromise()
    .then(response => response.json() as Post[])
    .catch(this.handleError);
  }

  getPostById(pid: string): Promise<Post[]> {
    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.postId, {"pid": pid}, options)
    .toPromise()
    .then(response => response.json() as Post[])
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error("An error has occurred retrieving posts");
    console.error(error);
    return Promise.reject(error.message || error);
  }

  private filterPosts(posts: Post[]): Post[]{
    var hidden = JSON.parse(localStorage.getItem("hidden"));
    var likedPosts = JSON.parse(localStorage.getItem("likedPosts"));

    if (hidden === null)
      hidden = [];
    if(likedPosts === null)
      likedPosts = [];

    if(hidden.length === 0 && likedPosts.length === 0)
      return posts;

    var hiddenVisited = Array.apply(null, Array(hidden.length)).map(Number.prototype.valueOf, 0);
    var likedVisited = Array.apply(null, Array(likedPosts.length)).map(Number.prototype.valueOf, 0);

    for(var i:number = 0; i < posts.length; i++){
      var index = hidden.indexOf(posts[i].pid);
      if (index != -1){
        posts[i].pid = null;
        hiddenVisited[index] = 1;
      }

      index = likedPosts.indexOf(posts[i].pid)

      if(index != -1){
        likedVisited[index] = 1;
      }
    }

    index = hiddenVisited.indexOf(0);
    while(index != -1){
      hidden.splice(index, 1);
      hiddenVisited[index] = 1;
      index = hiddenVisited.indexOf(0);
    }

    index = likedVisited.indexOf(0);
    while(index != -1){
      likedPosts.splice(index,1);
      likedVisited[index] = 1;
      index = likedVisited.indexOf(0);
    }

    localStorage.setItem("hidden", JSON.stringify(hidden));
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));


    return posts;

  }
}
