import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

	public page_title: string;
  public page_info: string;
  public usuario: User;
  public message:string;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _router:Router
    ){ 
	/*---Dar valor a las propiedades de la clase dentro del constructor---*/
	this.page_title = "Identifícate.";
  this.page_info = "Introduce tus datos para ingresar";
  this.usuario = new User(1,"","","","","","","");

	/*---Propiedades con valor asignado, disponibles en la vista a través de interpolación---*/
  }

  ngOnInit() {}

  onSubmit(formulario){
                                //true para que devuelva el payload (datos del usuario decodificados)
    this._userService.login(this.usuario,true).subscribe(
        response =>{
          
          if(response.status == 'success'){
            this.token = response.encoded_token;
            //Persistir datos de TOKEN en el local storage
            localStorage.setItem('token', this.token);
            if(response.decoded_token){
              this.identity = response.decoded_token;
              //Persistir datos de usuario en local storage
              localStorage.setItem('identity', JSON.stringify(this.identity));
            }
            //Una vez logueado redirigir al home
            this._router.navigate(['home']);
            formulario.reset();
          }

        },
        error =>{
          
            this.token = "false";
            this.identity = "false";
            this.message = "Datos ingresados incorrectos."
            
        }
      );
  }

}
