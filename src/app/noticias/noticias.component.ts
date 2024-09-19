// Importa os módulos necessários do Angular e outros serviços
import { Component, OnInit } from '@angular/core';
import { Noticia } from '../models/Noticia.model'; // Importa o modelo Noticia
import { NoticiaService } from '../noticia.service'; // Importa o serviço NoticiaService para interagir com a API de notícias
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; // Importa BreakpointObserver e Breakpoints para lidar com responsividade

// Define o componente e suas propriedades
@Component({
  selector: 'app-noticias', // Seletor do componente
  templateUrl: './noticias.component.html', // Template associado ao componente
  styleUrls: ['./noticias.component.css'] // Arquivo de estilos CSS associado ao componente
})
export class NoticiasComponent implements OnInit {

  // Variável que define o número de colunas para a exibição das notícias
  cols = 2;
  // Array público de notícias para armazenar os dados recebidos do serviço
  public noticias: Noticia[] = [];

  // O construtor injeta os serviços NoticiaService e BreakpointObserver
  constructor(private _noticiaService: NoticiaService, private breakpointObserver: BreakpointObserver) {}

  // O método ngOnInit é chamado quando o componente é inicializado
  ngOnInit(): void {
    // Chama o método para listar as notícias
    this.listarProdutos();

    // Observa as mudanças de layout (breakpoints) para definir o número de colunas em modo paisagem (landscape)
    this.breakpointObserver.observe([Breakpoints.HandsetLandscape])
      .subscribe(result => {
        // Se o layout corresponder a um dispositivo móvel em landscape, ajusta para 1 coluna, senão mantém 2
        this.cols = result.matches ? 1 : 2;
      });

    // Observa as mudanças de layout (breakpoints) para dispositivos móveis em modo retrato (portrait)
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait])
      .subscribe(result => {
        // Ajusta para 1 coluna em modo retrato ou 2 colunas caso contrário
        this.cols = result.matches ? 1 : 2;
      });
  }

  // Método responsável por listar os produtos (notícias) chamando o serviço de notícias
  listarProdutos(): void {
    // Chama o serviço para obter as notícias e se inscreve no retorno dos dados (assincrônico)
    this._noticiaService.getNoticias().subscribe(
      // Função de callback que recebe as notícias retornadas pela API
      retornaNoticia => {
        console.log(retornaNoticia); // Log para verificação dos dados no console
        // Mapeia os dados retornados e cria instâncias da classe Noticia
        this.noticias = retornaNoticia.map(
          item => {
            // Retorna uma nova instância de Noticia com os dados recebidos
            return new Noticia(
              item.id,
              item.image,
              item.title,
              item.body
            );
          }
        )
      }
    )
  }
}
