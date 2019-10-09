import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[PostService,UserService]
})
export class ProfileComponent implements OnInit {
	public id;
	public posts;
	public url;
	public userID;
	public identity;
	public token;
	public profile_data;
  constructor(
  	private _postService:PostService,
  	private _userService:UserService,
  	private _route:ActivatedRoute,
  	private _router:Router
  	) {
  	this.url = global.url_api;
  	this.userID = null;
  	this.token = this._userService.getToken();
  }

  ngOnInit() {
  	this.getIdentity();
  	this.getPosts();
  }

  getIdentity(){
  	this.identity = this._userService.getIdentity();
  	if(this.identity){
  		this.userID = this.identity.sub;	
  	}
  	
  }

  getPosts(){
  	//Recoger el id del usuario autor del post que viene por URL
  	this._route.params.subscribe(
  		params => {
  			let id = params.id;
  			//Petición ajax para sacar los datos del post
  			this._postService.getPostsByUser(id).subscribe(
		  		response => {
		  			if(response['status'] == "success"){
		  				this.posts = response['posts'];
		  				this.profile_data = this.posts[0].user;
						console.log(this.profile_data);
		  			}else{
              alert(response['message']);
              this._router.navigate(['/home']);
            }
		  		},
		  		error=>{
		  			//en caso de no existir el post en la base de datos, redireccionar al home
		  			this._router.navigate(['/home']);
		  		}
		  	);
  		});

  }
   deletePost(id){
    
    this._postService.deletePost(this.token,id).subscribe(
      response => {
        if(response.status == "success"){
          this.getPosts();
        }else{

        }
      },
      error => {

      });
  }

}
