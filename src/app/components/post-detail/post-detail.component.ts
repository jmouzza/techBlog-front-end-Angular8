import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers:[PostService]
})
export class PostDetailComponent implements OnInit {
	public id;
	public post;
	public url;
  constructor(
  	private _postService:PostService,
  	private _route:ActivatedRoute,
  	private _router:Router
  	) {
  	this.url = global.url_api;
  }

  ngOnInit() {
  	this.getPost();
  }

  getPost(){
  	//Recoger el id del post que viene por URL
  	this._route.params.subscribe(
  		params => {
  			let id = params.id;
  			//Petición ajax para sacar los datos del post
  			this._postService.getPost(id).subscribe(
		  		response => {
		  			if(response.status == "success"){
		  				this.post = response.post;
		  			}
		  		},
		  		error=>{
		  			//en caso de no existir el post en la base de datos, redireccionar al home
		  			this._router.navigate(['/home']);
		  		}
		  	);
  		});

  }

}
