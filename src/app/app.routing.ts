/*Archivo que contendrá la informaciómn de rutas de la aplicación de angular*/

//1. Importando módulos y clases necesarios para el funcionamiento de rutas
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//2. Importando de componentes ("controladores")
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent} from './components/post-edit/post-edit.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { ProfileComponent } from './components/profile/profile.component';

/* 3.
 * Definir las rutas dentro de una constante de tipo Routes (importado en este fichero) y será
 * completado con un array de Json
 */
const appRoutes:Routes = [
	//   {URL, Componente que se cargará}
	{path: "", component: HomeComponent},
	{path: "home", component: HomeComponent},
	{path: "login", component: LoginComponent},
	{path: "logout", component: LogoutComponent},
	{path: "register", component: RegisterComponent},
	{path: "registro", component: RegisterComponent},
	{path: "ajustes", component: UserEditComponent},
	{path: "category-new", component: CategoryNewComponent},
	{path: "post-new", component: PostNewComponent},
	{path: "post-detail/:id", component: PostDetailComponent },
	{path: "post-edit/:id", component: PostEditComponent },
	{path: "post-category/:id", component: PostCategoryComponent},
	{path: "profile/:id", component: ProfileComponent},		
	{path:"**", component: ErrorComponent}
	//la ruta ** índica ruta no encontrada, cargar componente error
];

/* 4. 
 * Exportar la configuración de rutas para el reconocimiento de ellas en el framework
 * este será incluído en el fichero app.module.ts
 */
export const appRoutingProviders:any[] = [];
 
 /* constante "routing", será el módulo con el router configurado 
  * que será incluido en el fichero app.module.ts
  * 
  * Módulo de rutas -> método de rutas principales (parámetro: rutas configuradas)
  */
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);