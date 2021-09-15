import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})
export class LivroInserirComponent {
  @Output() livroAdicionado = new EventEmitter<Livro>();

  constructor(private _snackBar: MatSnackBar) { }

  onAdicionarLivro(livroForm: NgForm) {
    if(!livroForm.invalid) {
      this.abrirSnackBar(livroForm.value.titulo);

      let livro: Livro = {
        id: livroForm.value.id,
        titulo: livroForm.value.titulo,
        autor: livroForm.value.autor,
        numeroPaginas: livroForm.value.numeroPaginas
      }
  
      this.livroAdicionado.emit(livro);
      livroForm.resetForm();
    }
  }

  abrirSnackBar(titulo: string) {
    this._snackBar.open(`O livro ${titulo} foi cadastrado com sucesso!`, "OK");
  }

}
