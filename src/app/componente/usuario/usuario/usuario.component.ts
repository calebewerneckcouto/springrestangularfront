import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  students: Observable<User[]>;
  nome: String;

  constructor(private usuarioService: UsuarioService) { }

  /* Toda vez que o componente UsuarioComponent for iniciado o que tiver no OnInit será executado */
  ngOnInit() {
    // Lista Usuário
    this.usuarioService.getStudentList().subscribe(data => {
      this.students = data;
    });
  }

  /* Deletando usuario */
  deleteUsuario(id: Number) {
    if (confirm('Deseja mesmo remover?')) {
      this.usuarioService.deletarUsuario(id).subscribe(data => {
        console.log("Retorno do método delete: " + data);

        // Atualiza a lista de usuários
        this.usuarioService.getStudentList().subscribe(data => {
          this.students = data;
        });
      });
    }
  }

  /* Consulta usuario por nome */
  consultarUser(){
    this.usuarioService.consultarUser(this.nome).subscribe(data => {
      this.students = data;
    });
  }

}