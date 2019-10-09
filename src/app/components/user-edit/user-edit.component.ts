import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title:string;
  public page_info:string;
  public user:User;
  public identity;
  public token;
  public message:string;
  public status:string;
  public options: Object;
  public afuConfig; 
  public url;
  public valueDescription;

  constructor(private _userService:UserService,
    private _router:Router) { 
  	this.page_title = "Editar usuario";
  	this.page_info = "Modifica tus datos personales de usuario";
  	//this.user = new User(1,"","","","","","","");
    this.url = global.url_api;
  	this.identity = this._userService.getIdentity(); //recoger los datos del usuario del localStorage
  	this.token = this._userService.getToken();
  	//this.user = this.identity;//Asignar al objeto usuario los datos del localStorage
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      "",
      this.identity.description,
      this.identity.image);
    this.valueDescription = this.user.description;
    
    /* Condición para darle un valor al campo descripción y 
    asignarle propiedades a la librería froala */

    if(this.user.description == null || this.user.description == ""){ // el usuario no tiene una descripción en la bbdd
      this.options = {
          placeholderText: "Ingresa una breve descripción o biografía",
          charCounterCount: true,
          language: 'es',
          toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
          toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
          toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
          toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
        };
    }else{
      this.options = {
          charCounterCount: true,
          toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
          toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
          toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
          toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
        };
    }
    
    if(this.user.image == null){
      this.afuConfig = {
        multiple: false,
        formatsAllowed: ".jpg,.png,.jpeg,.gif",
        maxSize: "20",
        uploadAPI:  {
          url: global.url_api+"upload_avatar",
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
        attachPinBtn: 'Sube tu Avatar',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !'
        }
      };
    }else{
      this.afuConfig = {
        multiple: false,
        formatsAllowed: ".jpg,.png,.jpeg,.gif",
        maxSize: "20",
        uploadAPI:  {
          url: global.url_api+"upload_avatar",
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
        attachPinBtn: 'Cambia tu avatar',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !'
        }
      };
    }
    
  }

  ngOnInit() {
  	console.log(this.user.image);

    
  }

  onSubmit(userEditForm){ 

    this._userService.update(this.token, this.user).subscribe(
      response => {
        if(response.status == 'success'){
          this.user = response.user;
          this.message = 'El usuario se ha actualizado correctamente';
          this.status = "success";
          //Persistir datos actualizados de usuario en local storage
          localStorage.setItem('identity', JSON.stringify(this.user));
            
        }else{
          this.message = 'Ha ocurrido un error al actualizar tus datos';
          this.status = "error";
        }
        window.scroll(0,0);
      }, error => {
        
        if(error.error.errors["name"]){
          this.status = 'error';
          this.message = "El nombre utilizado es inválido";
        }else if(error.error.errors["surname"]){
          this.status = 'error';
          this.message = "El apellido utilizado es inválido";
        }else if(error.error.errors["email"]){
          this.status = 'error';
          this.message = "El email ya fue tomado por otro usuario";
        }
        window.scroll(0,0);

      }
    );  	
  }

  avatarUpload(apiResponse){
    let avatar = JSON.parse(apiResponse.response);
    this.user.image = avatar.image;
  }

}
