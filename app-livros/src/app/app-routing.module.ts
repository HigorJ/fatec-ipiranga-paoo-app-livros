import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from '@angular/router';
import { LivroInserirComponent } from "./livros/livro-inserir/livro-inserir.component";
import { LivroListComponent } from "./livros/livro-list/livro-list.component";

const routes: Routes = [
    {
        path: '',
        component: LivroListComponent
    },
    {
        path: 'criar',
        component: LivroInserirComponent
    },
    {
        path: 'editar/:idLivro',
        component: LivroInserirComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}