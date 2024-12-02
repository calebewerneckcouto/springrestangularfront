import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();
  erroMensagem: string = '';  // Variável para armazenar a mensagem de erro

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.getStudent(id).subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (error) => {
          console.error("Erro ao buscar usuário", error);
          this.erroMensagem = "Erro ao carregar dados do usuário. Tente novamente."; // Exibe a mensagem de erro
        }
      });
    }
  }

  salvarUser() {
    // Limpa a mensagem de erro antes de tentar salvar
    this.erroMensagem = '';

    if (this.usuario.id != null && this.usuario.id.toString().trim() !== "") {
      this.userService.updateUsuario(this.usuario).subscribe({
        next: (data) => {
          this.novo();
          console.info("Atualização realizada com sucesso");
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    } else {
      this.userService.salvarUsuario(this.usuario).subscribe({
        next: (data) => {
          this.novo();
          console.info("Usuário salvo com sucesso");
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    }
  }

  novo() {
    this.usuario = new User();
    this.erroMensagem = '';  // Limpa a mensagem de erro ao criar um novo usuário
  }

  // Função para tratar erros de forma genérica
  private handleError(error: any) {
    if (error.status === 400) {
      // Se a resposta for 400 (Bad Request), exibe a mensagem de erro retornada pelo backend
      this.erroMensagem = `Erro ao salvar usuário: ${error.error}`;
    } else {
      // Caso contrário, exibe um erro genérico
      console.error("Erro ao salvar usuário", error);
      this.erroMensagem = `Erro ao salvar usuário: ${error.message || 'Erro desconhecido'}`;
    }
  }

}
