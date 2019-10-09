//Injectable: librería que permitirá a los componentes consumir los servicios de forma controlada,
//como providers en el propio decorador @Component
import { Injectable } from '@angular/core';
//Observable: librería que permitirá recoger los datos que nos decuelve el API
import { Observable } from 'rxjs';
//HttpClient: indicará el método HTTP a utilizar (GET POST PUT DELETE...)
//HttpHeaders: permitirá la configuración de la cabecerá para la petición ajax
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService{
	public url:string;
	public token;
	public identity;

	constructor(public _http: HttpClient){
		this.url = global.url_api;
	}

	test(){
		return this.url;
	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token && token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}
		
		return this.token; 	
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity && identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}
	
	/*------- Métodos de comunicación HTTP con la API-RESTFUL -------*/

	register(user):Observable<any>{
		/*---Pasos para configurar el método que realizará la petición ajax a la API.---*/
		
		//1. Armar el string con los datos del usuario que viajarán en la petición
		let json = JSON.stringify(user);
		let params = 'json='+json;
		
		//2.Configurar la cabecera, indicando el tipo de contenido que se enviará
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		
		//3. Construír la cabecerá utilizando la url de la API, enviando la 
		//cabecera con los parámetros a procesar por la API
		return this._http.post(this.url+'register',params,{headers: headers});
	}

	login(user, getToken=null):Observable<any>{
		/*---Pasos para configurar el método que realizará la petición ajax a la API.---*/
		
		/*Alternativa depurando información del objeto user, que no deberá viajar en la petición
		let email= user.email;
		let password= user.password;
		let params = 'json={"email":"'+email+'","password":"'+password+'"}';*/

		if(getToken != null){
			user.getToken = true
		}
		//1. Armar el string con los datos del usuario que viajarán en la petición
		let json = JSON.stringify(user);
		let params = 'json='+json;

		//2.Configurar la cabecera, indicando el tipo de contenido que se enviará
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		
		//3. Construír la cabecerá utilizando la url de la API, enviando la 
		//cabecera con los parámetros a procesar por la API
		return this._http.post(this.url+'login',params,{headers: headers});
	}

	update(token, user):Observable<any>{
		/*---Pasos para actualizar datos de usuario.---*/
		//limpiar las entities que tenga el campo 
		user.description = global.htmlEntities(user.description);
		//1. Armar el string con los datos del usuario que viajarán en la petición
		let json = JSON.stringify(user);
		let params = 'json='+json;
		console.log(params);
		//2.Configurar la cabecera, indicando el tipo de contenido que se enviará
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization',token);
		//3. Construír la cabecerá utilizando la url de la API, enviando la 
		//cabecera con los parámetros a procesar por la API
		return this._http.put(this.url+'update',params,{headers: headers});
	}

	
}
