import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/* OnInit: toda vez que o componente AppComponent for iniciado 
           O que tiver no OnInit será executado */
export class AppComponent implements OnInit{
  title = 'curso-angular-rest';

  constructor(private router: Router){}

  ngOnInit(): void {
    if(localStorage.getItem('token') == null){
      this.router.navigate(['login']); // Redireciona para a tela de login
    }
  }

  public sair(){
    localStorage.clear(); // Remover o token
    this.router.navigate(['login']); // Redireciona para a tela de login
  }

  public esconderBarra(){
        /* Esconder barra de menu se estiver deslogado */
        if(localStorage.getItem('token') != null && localStorage.getItem('token').toString().trim() != null){
          return false;
        }else{
          return true;
        }
  }
}