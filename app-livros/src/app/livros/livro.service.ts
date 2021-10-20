import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Livro } from "./livro.model";

@Injectable({
    providedIn: 'root'
})
export class LivroService {
    private listaLivros = new Subject<Livro[]>();
    private URL = 'http://localhost:3000/api/livros';
    private livros: Livro[] = [];

    constructor(private httpClient: HttpClient) {}

    getLivros(): void {
        this.httpClient.get<{livros: Livro[]}>(this.URL).subscribe(response => {
            this.livros = response.livros;

            this.listaLivros.next([...this.livros]);
        });
    }

    adicionarLivro(titulo: string, autor: string, numeroPaginas: number): void {
        const livro = {
            titulo, 
            autor, 
            numeroPaginas
        }

        this.httpClient.post<{ mensagem: string }>(this.URL, livro).subscribe(dados => {
            this.livros.push(livro);
            this.listaLivros.next([...this.livros]);
        })
    }

    getListaAtualizada() {
        return this.listaLivros.asObservable();
    }
}
