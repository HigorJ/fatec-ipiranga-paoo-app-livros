import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})
export class LivroInserirComponent {

  id: number;
  titulo: string;
  autor: string;
  numeroPaginas: number;

  constructor(private _snackBar: MatSnackBar) { }

  onAdicionarLivro() {
    this.abrirSnackBar();

    console.log("Livro adicionado: ", {
      titulo: this.titulo,
      autor: this.autor,
      numeroPaginas: this.numeroPaginas
    });

    this.limparCampos();
  }

  abrirSnackBar() {
    this._snackBar.open(`O livro ${this.titulo} foi cadastrado com sucesso!`, "OK");
  }

  limparCampos() {
    this.titulo = "";
    this.autor = "";
    this.numeroPaginas = null;
  }

}
