import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { RegistroUsuarioComponent } from './components/usuario/registro-usuario/registro-usuario.component';
import { LoginComponent } from './components/usuario/login/login.component';


const routes: Routes = [{
  path:'', redirectTo:'usuario/registro', pathMatch:'full'},
  {path:'usuario', component: UsuarioComponent,
    children:[
      {path:'registro', component:RegistroUsuarioComponent},
      {path: 'login', component:LoginComponent}
    ]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
