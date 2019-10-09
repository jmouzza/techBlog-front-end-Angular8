//Injectable: librería que permitirá a los componentes consumir los servicios de forma controlada,
//como providers en el propio decorador @Component
import { Injectable } from '@angular/core';
//Observable: librería que permitirá recoger los datos que nos decuelve el API
import { Observable } from 'rxjs';
//HttpClient: indicará el método HTTP a utilizar (GET POST PUT DELETE...)
//HttpHeaders: permitirá la configuración de la cabecerá para la petición ajax
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';
import { global } from './global';

@Injectable()
export class CategoryService{
	public url:string;
	public identity;
	
	constructor(public _http: HttpClient){
		this.url = global.url_api;
	}

	test(){
		return this.url;
	}

	/*------- Métodos de comunicación HTTP con la API-RESTFUL -------*/

	newCategory(token, category):Observable<any>{
		
		/*---Pasos para configurar el método que realizará la petición ajax a la API.---*/
		
		//1. Armar el string con los datos de la categoría nueva que viajá en la petición
		let json = JSON.stringify(category);
		let params = 'json='+json;
		
		//2.Configurar la cabecera, indicando el tipo de contenido que se enviará
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		console.log(params);
		console.log(headers);
		//3. Construír la cabecerá utilizando la url de la API, enviando la 
		//cabecera con los parámetros a procesar por la API
		return this._http.post(this.url+'category',params,{headers: headers});
	}

	getCategories():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url+'category',{headers: headers});
	}

}
