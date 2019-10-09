import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css'],
  providers: [UserService,PostService]
})
export class PostCategoryComponent implements OnInit {
	public category;
	public page_info;
	public posts;
	public url;
	public identity;
	public userID;
  public token;
  public status;
  constructor(
  	private _postService:PostService,
  	private _userService:UserService,
  	private _route:ActivatedRoute,
  	private _router:Router) {
  	
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
  	this._route.params.subscribe(
  		params => {
  			let id = params.id;
  			//Petición ajax para sacar los datos del post
  			this._postService.getPostsByCategory(id).subscribe(
		  		response => {
		  			if(response['status'] == "success"){
		  				this.posts = response['posts'];
		  				this.category= this.posts[0].category.name;
		  			}else{
		  				alert(response['message']);
		  				this._router.navigate(['/home']);
		  			}
		  			/*if(response.status == "success"){
		  				this.posts = response.post;
		  			}else{
		  				console.log(response);
		  			}*/
		  		},
		  		error=>{
		  			//en caso de no existir posts con la categoria solicitada
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
