import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers:[PostService,UserService,CategoryService]
})
export class PostEditComponent implements OnInit {
	public id;
	public post;
	public url;
	public categories:Object;
	public identity;
	public options;
	public status;
	public page_title;
	public page_info;
	public message;
	public afuConfig;
	public token;

  constructor(
  	private _postService:PostService,
  	private _route:ActivatedRoute,
  	private _router:Router,
  	private _userService:UserService,
  	private _categoryService:CategoryService
  	) {
  	this.page_title = "Editar el Post";
  	this.page_info = "Completa los campos con los nuevos datos";
  	this.url = global.url_api;
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	this.post = new Post(1,1,1,"","","","");
  	this.options = {
      charCounterCount: true,
      language: 'es',
      toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
	};

	this.afuConfig = {
        multiple: false,
        formatsAllowed: ".jpg,.png,.jpeg,.gif",
        maxSize: "20",
        uploadAPI:  {
          url: global.url_api+"upload_image",
          method:"POST",
          headers: {
         "Authorization" : this._userService.getToken()  
          }
        },
        theme: "attachPin",
        hideProgressBar: false,
        hideResetBtn: false,
        hideSelectBtn: false,
        replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Sube una Imagen',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !'
        }
      }

  }

  ngOnInit() {
  	if(this.identity == null){
      this._router.navigate(['/home']);
    }
  	this._route.params.subscribe(
  		params => {
  			this.id = params.id;
  			//Petición ajax para sacar los datos del post
  			this._postService.getPost(this.id).subscribe(
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
  	this.getCategory();
  }

  getCategory(){
  	this._categoryService.getCategories().subscribe(
	response => {
		this.categories = response.categories;
	}, 
	error => {
		console.log(error);
	}); 
  }

  updatePost(form){
  	delete this.post.category;
  	delete this.post.user;
  	this._postService.updatePost(this.token,this.post,this.post.id).subscribe(
  		response => {
  			if(response.status == "success"){
  				this.status = "success";
  				this.message = "Post Actualizado correctamente";
  				window.scroll(0,0);

  			}else{
  				this.status = "error";
  				this.message = "Ha ocurrido un error al acutalizar el POST";
  				window.scroll(0,0);
  			}
  		},
  		error => {
  			this.status = "error";
  			this.message = "Ha ocurrido un error al acutalizar el POST";
  			console.log(error);
  			window.scroll(0,0);
  		});

  }
  imageUpload(apiResponse){
  	
    let currentPost = JSON.parse(apiResponse.response);
    this.post.image = currentPost.image;
    console.log(this.post);
  }

}
