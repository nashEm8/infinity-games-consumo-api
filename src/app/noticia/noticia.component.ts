// Importa os módulos necessários do Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importa o ActivatedRoute para acessar parâmetros de rota
import { NoticiaService } from '../noticia.service'; // Importa o serviço NoticiaService para interagir com a API de notícias
import { Noticia } from '../models/Noticia.model'; // Importa o modelo Noticia

// Define o componente e suas propriedades
@Component({
  selector: 'app-noticia', // Seletor do componente
  templateUrl: './noticia.component.html', // Template associado ao componente
  styleUrls: ['./noticia.component.css'] // Estilos CSS do componente
})
export class NoticiaComponent implements OnInit {

  // Propriedade pública que irá armazenar os dados de uma notícia. Pode ser do tipo Noticia ou indefinida até que seja carregada
  public noticia: Noticia | undefined;

  // Construtor que injeta o ActivatedRoute e o NoticiaService
  constructor(
    private route: ActivatedRoute, // Para acessar o ID da notícia na URL
    private _noticiaService: NoticiaService // Serviço para buscar os dados da API
  ) {}

  // O método ngOnInit é executado quando o componente é inicializado
  ngOnInit(): void {
    // Chama o método para buscar a notícia específica
    this.listarProduto();
  }

  // Método que busca uma notícia específica com base no ID passado pela URL
  listarProduto(): void {
    // Obtém o ID da notícia diretamente da URL usando ActivatedRoute
    const id = this.route.snapshot.paramMap.get('id');
    
    // Verifica se o ID foi encontrado na rota
    if (id) {
      // Chama o serviço para buscar a notícia pelo ID e se inscreve no retorno
      this._noticiaService.getNoticia(id).subscribe(
        (retornaNoticia: Noticia) => {
          // Loga os dados retornados para verificação
          console.log('Dados retornados pela API:', retornaNoticia);
          // Atribui os dados retornados à propriedade noticia
          this.noticia = retornaNoticia;
        },
        // Em caso de erro na requisição, loga o erro no console
        error => {
          console.error('Erro ao buscar a notícia:', error);
        }
      );
    }
  }
}
