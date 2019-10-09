import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { CategoryService} from './services/category.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService,CategoryService]
})
export class AppComponent {
  public title = 'Blog';
  public identity;
  public token;
  public url;
  public categories;

  constructor(
    private _userService:UserService,
    private _categoryService:CategoryService){
  	this.loadUser();
    this.url = global.url_api;	
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getCategories();
  }

  ngDoCheck(){
    this.loadUser();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        this.categories = response.categories;
      },
      error => {
        console.log(error);
      }
    );
  }
}
