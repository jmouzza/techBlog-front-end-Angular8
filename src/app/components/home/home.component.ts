import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService,UserService]
})
export class HomeComponent implements OnInit {
	public page_title:string;
	public page_info;
	public posts;
	public url;
	public identity;
	public userID;
  public token;
  constructor(
  	private _postService:PostService,
  	private _userService:UserService) {
  	this.page_title = "Bienvenido a nuestro BLOG-Angular.";
  	this.page_info = "Últimos Post publicados... esperamos disfrutes tu visita";
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
  	this._postService.getPosts().subscribe(
		response => {
			this.posts = response.posts;
      
		},
		error => {
			console.log(error);
		}
		); 
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
