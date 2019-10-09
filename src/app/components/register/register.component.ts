import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
	public page_title:string;
	public page_info:string;
  public user: User;
  public status:string;
  public message:string;

  constructor(
    private _userService: UserService,
    private _router:Router) {
  	this.page_title = "Regístrate";
  	this.page_info = "Regístrate en nuestro blog y crea entradas interesantes de tecnología";
    this.user = new User(1,"","","ROLE_USER","","","","");
  }

  ngOnInit() {
    console.log(this._userService.test());
  }

  metodoSubmit(formulario){
    //al realizar submit el componente se encargará de pedirle al servicio que haga la peticion ajax
    // "subscribe" es un método del observable que recogerá la respuesta del API
    this._userService.register(this.user).subscribe(
      response => {
        
        if(response.status == 'success'){
          this.status = 'success';
          this.message = 'El registro se ha completado correctamente!';
          formulario.reset();
        }else{
          this.status = "error";
          this.message = 'Ha ocurrido un error al registrarte, vuelve a intentarlo';
        }
      
      },
      error => {
        if(error.error.errors["name"]){
          this.status = 'error';
          this.message = "El nombre utilizado es inválido";
        }else if(error.error.errors["surname"]){
          this.status = 'error';
          this.message = "El apellido utilizado es inválido";
        }else if(error.error.errors["email"]){
          this.status = 'error';
          this.message = "El email ya fue tomado por otro usuario";
        }else if(error.error.errors["password"]){
          this.status = 'error';
          this.message = "Tu password no puede estar vacía";
        }
      }
    );
  }
}
