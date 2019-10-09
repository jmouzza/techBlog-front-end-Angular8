import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [CategoryService,UserService]
})
export class CategoryNewComponent implements OnInit {
	public page_title: string;
	public page_info:string;
	public category: Category;
	public message:string;
	public status:string;
	public token = null;

  constructor(
    private _categoryService:CategoryService,
    private _userService:UserService,
    private _router:Router) { 
  	this.category = new Category(1,"");
  	this.page_title = "Crear nueva categoría";
    this.page_info = "Crea una nueva categoría para el blog";
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    if(this.token == null){
      this._router.navigate(['/home']);
    }
  }

  onSubmit(form){
    if(this.token == null){
      this.status = 'error';
      this.message = 'Ocurrió un error al crear la categoría';
    }else{
      this._categoryService.newCategory(this.token,this.category).subscribe(
      response =>{
        if(response.status == 'success'){
          this.status = 'success';
          this.message = 'La categoría fue creada correctamente';
          form.reset();
        }else{
          this.status = 'error';
          this.message = 'Ocurrió un error al crear la categoría';
        }
      },
      error =>{
        if(error.error.error['name'] == 'The name has already been taken.'){
          this.status = 'error';
          this.message = 'La categoría ya existe en la base de datos';  
        }else{
          this.status = 'error';
          this.message = 'Ocurrió un error al crear la categoría';
        }
      });
    }
  	
  }

}
