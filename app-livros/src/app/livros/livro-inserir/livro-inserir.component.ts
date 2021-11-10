import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LivroService } from '../livro.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})
export class LivroInserirComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar, 
    private livroService: LivroService,
    public route: ActivatedRoute
  ) { }

  private modo: string = 'criar';
  private idLivro: string;
  public livro: Livro;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('idLivro')) {
        this.modo = 'editar';
        this.idLivro = paramMap.get('idLivro');
        this.livroService.getLivro(this.idLivro).subscribe((dadosLivro) => {
          this.livro = {
            id: dadosLivro.id,
            titulo: dadosLivro.titulo,
            autor: dadosLivro.autor,
            numeroPaginas: dadosLivro.numeroPaginas
          }
        });
      } else {
        this.modo = 'criar';
        this.idLivro = null;
      }
    });
  }

  onSalvarLivro(livroForm: NgForm) {
    if(livroForm.invalid) return;

    if(this.modo === 'criar') {
      this.livroService.adicionarLivro(
        livroForm.value.titulo, 
        livroForm.value.autor, 
        livroForm.value.numeroPaginas
      );
    } else {
      this.livroService.atualizarLivro(
        this.idLivro,
        livroForm.value.titulo, 
        livroForm.value.autor, 
        livroForm.value.numeroPaginas
      );
    }
    
    
    this.abrirSnackBar(livroForm.value.titulo);

    livroForm.resetForm();
  }

  abrirSnackBar(titulo: string) {
    this._snackBar.open(`O livro "${titulo}" foi salvo com sucesso!`, "OK");
  }

}
