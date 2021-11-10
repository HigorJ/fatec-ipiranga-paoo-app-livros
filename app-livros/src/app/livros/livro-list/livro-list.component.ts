import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-list',
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.css']
})
export class LivroListComponent implements OnInit, OnDestroy {
  private livroSubscription: Subscription;
  livros: Livro[] = [];

  constructor(private livroService: LivroService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.livroService.getLivros();

    this.livroSubscription = this.livroService.getListaAtualizada().subscribe((livros: Livro[]) => {
      this.livros = livros;
    });
  }

  ngOnDestroy(): void {
    this.livroSubscription.unsubscribe();
  }

  onDelete(id: string, titulo: string) {
    this.livroService.removerLivro(id);

    this.abrirSnackBar(titulo);
  }

  abrirSnackBar(titulo: string) {
    this._snackBar.open(`O livro "${titulo}" foi removido!`, "OK");
  }
}
