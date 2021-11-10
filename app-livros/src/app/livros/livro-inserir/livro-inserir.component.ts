import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})
export class LivroInserirComponent {

  constructor(private _snackBar: MatSnackBar, private livroService: LivroService) { }

  onAdicionarLivro(livroForm: NgForm) {
    if(livroForm.invalid) return;

    this.abrirSnackBar(livroForm.value.titulo);

    this.livroService.adicionarLivro(
      livroForm.value.titulo, 
      livroForm.value.autor, 
      livroForm.value.numeroPaginas
    );
    
    livroForm.resetForm();
  }

  abrirSnackBar(titulo: string) {
    this._snackBar.open(`O livro "${titulo}" foi cadastrado com sucesso!`, "OK");
  }

}
