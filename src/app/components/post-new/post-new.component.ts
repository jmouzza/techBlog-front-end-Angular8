import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [CategoryService,PostService]
})
export class PostNewComponent implements OnInit {
	public page_title:string;
	public page_info:string;
	public post: Post;
	public categories:Object;
	public options;
	public identity;
	public token;
	public status;
	public afuConfig;
	public message; 

  constructor(
  	private _categoryService:CategoryService,
  	private _postService:PostService,
  	private _userService: UserService,
    private _router:Router) { 
  	this.page_title = "Crear una nueva entrada";
  	this.page_info = "Crea un POST interesante para llegar a muchos lectores";
  	this.post = new Post(1,1,1,"","","","");
  	/*
  		public id: number,
		public user_id: number,
		public category_id: number,
		public title: string,
		public content: string,
		public image: string,
		public created_at: any
	*/
	this.options = {
          placeholderText: "Vamos, destácate con un gran POST...!!!",
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
        attachPinBtn: 'Sube una imagen',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !'
        }
  	};

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();

  }

  ngOnInit() {
    if(this.identity == null){
      this._router.navigate(['/home']);
    }
  	this.getCaterory();
  }
  getCaterory(){
  	this._categoryService.getCategories().subscribe(
	response => {
		this.categories = response.categories;
	}, 
	error => {
		console.log(error);
	}); 
  }
  metodoSubmit(newPostForm){
  	this.post.user_id = this.identity.sub;
  	this._postService.newPost(this.token, this.post).subscribe(
  		response => {
  			if(response.status == "success"){
  				this.status = "success";
  				this.message = "Felicidades, tu Post fue creado correctamente. En breves instantes será publicado.";
  				newPostForm.reset();
  			}else{
  				this.status = "error";
  				this.message = " =( Ocurrió un error al crear tu POST. Intentalo de nuevo";
  			}
        window.scroll(0,0);
  		}, 
  		error => {
        this.status = "error";
        this.message = " =( Ocurrió un error al crear tu POST. Intentalo de nuevo";
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
