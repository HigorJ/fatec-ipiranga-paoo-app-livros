import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Livro } from "./livro.model";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LivroService {
    private listaLivros = new Subject<Livro[]>();
    private URL = 'http://localhost:3000/api/livros';
    private livros: Livro[] = [];

    constructor(private httpClient: HttpClient) {}

    getLivros(): void {
        this.httpClient.get<{livros: any}>(this.URL)
            .pipe(map((dados) => {
                return dados.livros.map(livro => {
                    return {
                        id: livro._id,
                        titulo: livro.titulo,
                        autor: livro.autor,
                        numeroPaginas: livro.numeroPaginas
                    }
                })
            }))
            .subscribe(livros => {
                this.livros = livros;

                this.listaLivros.next([...this.livros]);
            });
    }

    getLivro(idLivro: string) {
        return this.httpClient.get<{ 
            id: string, 
            titulo: string, 
            autor: string, 
            numeroPaginas: number 
        }>(`${this.URL}/${idLivro}`);
    }

    adicionarLivro(titulo: string, autor: string, numeroPaginas: number): void {
        const livro = {
            id: null,
            titulo, 
            autor, 
            numeroPaginas
        }

        this.httpClient.post<{ id: string }>(this.URL, livro).subscribe(dados => {
            livro.id = dados.id;
            this.livros.push(livro);
            this.listaLivros.next([...this.livros]);
        })
    }

    atualizarLivro(id: string, titulo: string, autor: string, numeroPaginas: number) {
        const livro: Livro = {
            id,
            titulo,
            autor,
            numeroPaginas
        };

        this.httpClient.put(`${this.URL}/${id}`, livro).subscribe((res) => {
            const copia = [...this.livros];
            const indice = copia.findIndex(liv => liv.id === livro.id);

            copia[indice] = livro;
            this.livros = copia;
            this.listaLivros.next([...this.livros]);
        });
    }

    removerLivro(id: string) {
        this.httpClient.delete(`${this.URL}/${id}`).subscribe(() => {
            console.log (`Livro de id: ${id} removido`);
            this.livros = this.livros.filter((livro) => {
                return livro.id !== id;
            });

            this.listaLivros.next([...this.livros]);
        });
    }

    getListaAtualizada() {
        return this.listaLivros.asObservable();
    }
}
