import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.livroService.getLivros();

    this.livroSubscription = this.livroService.getListaAtualizada().subscribe((livros: Livro[]) => {
      this.livros = livros;
    });
  }

  ngOnDestroy(): void {
    this.livroSubscription.unsubscribe();
  }
}
