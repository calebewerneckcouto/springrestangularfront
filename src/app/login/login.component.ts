import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  usuario = {login: '', senha:''};

  constructor(private loginService: LoginServiceService, private router: Router){}

  /* Pegar os dados do formulário */
  public login(){
    this.loginService.login(this.usuario);
  }

  /* Executado toda vez que o componente é chamado */
  ngOnInit(){
    /* Se o token não for nulo redireciona para a tela home, não vai para o login */
    if(localStorage.getItem('token') != null && localStorage.getItem('token').toString().trim() != null){
      this.router.navigate(['home']);
    }
  }
}