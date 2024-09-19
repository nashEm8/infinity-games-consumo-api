// Importa os módulos necessários do Angular e RxJS
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from './models/Noticia.model';
import { map } from 'rxjs/operators';

// Define que este serviço pode ser injetado em qualquer parte da aplicação
@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  // URL base para a API de notícias
  private url = "https://5cf9ae9df26e8c00146cff8d.mockapi.io/api/v1/post";
  
  // O HttpClient é injetado via construtor para realizar requisições HTTP
  constructor(private http: HttpClient) { }

  // Método para atualizar uma notícia existente, recebe o ID da notícia e os dados atualizados
  atualizarNoticia(id: any, noticia: Noticia): Observable<Noticia[]> {
    // Monta a URL para a requisição de atualização, incluindo o ID da notícia
    const urlAtualizar = `${this.url}/${id}`;
    // Envia a requisição PUT com os dados atualizados da notícia
    return this.http.put<Noticia[]>(urlAtualizar, noticia);
  }

  // Método para obter uma notícia específica pelo ID
  getNoticia(id: any): Observable<Noticia> {
    // Monta a URL para buscar a notícia com base no ID passado como parâmetro
    const urlAtualizar = `${this.url}?id=${id}`;
    // Faz a requisição GET e utiliza o operador `map` para extrair o primeiro item da lista de notícias retornada
    return this.http.get<Noticia[]>(urlAtualizar).pipe(
      map((noticias: Noticia[]) => noticias[0]) // Retorna apenas o primeiro item (notícia)
    );
  }

  // Método para obter todas as notícias
  getNoticias(): Observable<Noticia[]> {
    // Faz uma requisição GET para retornar todas as notícias
    return this.http.get<Noticia[]>(this.url);
  }

  // Método para cadastrar uma nova notícia, enviando os dados como POST
  cadastrarNoticia(noticia: Noticia): Observable<Noticia[]> {
    // Envia os dados da nova notícia via POST para a API
    return this.http.post<Noticia[]>(this.url, noticia);
  }

  // Método para remover uma notícia específica pelo ID
  removerNoticia(id: any): Observable<Noticia[]> {
    // Monta a URL para deletar a notícia pelo ID
    const urlDeletar = `${this.url}/${id}`;
    // Faz a requisição DELETE para remover a notícia
    return this.http.delete<Noticia[]>(urlDeletar);
  }
}