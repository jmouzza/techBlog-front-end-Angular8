import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [UserService, PostService]
})

export class PostListComponent implements OnInit {
	public token;
	@Input()posts;
	@Input()url;
	@Input()userID;
  constructor(
  	private _postService:PostService,
  	private _userService:UserService,
  	private _router:Router) { }

  ngOnInit() {

  }

  deletePost(id){
  	this.token = this._userService.getToken();
  	 this._postService.deletePost(this.token,id).subscribe(
      response => {
        if(response.status == "success"){
          this._router.navigate(['/home']);
        }else{

        }
      },
      error => {

      });
  }

}
