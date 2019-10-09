//Injectable: librería que permitirá a los componentes consumir los servicios de forma controlada,
//como providers en el propio decorador @Component
import { Injectable } from '@angular/core';
//Observable: librería que permitirá recoger los datos que nos decuelve el API
import { Observable } from 'rxjs';
//HttpClient: indicará el método HTTP a utilizar (GET POST PUT DELETE...)
//HttpHeaders: permitirá la configuración de la cabecerá para la petición ajax
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { global } from './global';

@Injectable()
export class PostService{
	public url:string;
	public identity;
	
	constructor(public _http: HttpClient){
		this.url = global.url_api;
	}

	test(){
		return this.url;
	}

	/*------- Métodos de comunicación HTTP con la API-RESTFUL -------*/

	newPost(token,post):Observable<any>{
		console.log(post);
		console.log(post.content);
		//limpiar las entities que tenga el campo
		post.content = global.htmlEntities(post.content);
		console.log(post.content);
		let json = JSON.stringify(post);
		let params = "json="+json;
		console.log(params);
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.post(this.url+'post',params,{headers: headers});							   
	}

	getPosts():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url+'post',{headers: headers});
	}

	getPost(id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url+'post/'+id,{headers: headers});
	}

	updatePost(token,post,id):Observable<any>{
		//limpiar las entities que tenga el campo
		post.content = global.htmlEntities(post.content);
		let json = JSON.stringify(post);
		let params = "json="+json;
		console.log(params);
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		console.log(headers);
		return this._http.put(this.url+'post/'+id,params,{headers: headers});
	}

	deletePost(token,id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		
		return this._http.delete(this.url+'post/'+id,{headers: headers});
	}

	getPostsByCategory(id){
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url+'post/category/'+id,{headers: headers});
	}
	getPostsByUser(id){
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url+'post/user/'+id,{headers: headers});
	}		

}
