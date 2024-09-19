// Importa os módulos necessários do Angular
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Router para navegação, NavigationEnd para detectar fim da navegação
import { filter } from 'rxjs/operators'; // Importa o operador filter do RxJS

// Define o componente e suas propriedades
@Component({
  selector: 'app-root', // Nome do seletor do componente
  templateUrl: './app.component.html', // Arquivo HTML do template do componente
  styleUrls: ['./app.component.css'] // Arquivo de estilos CSS do componente
})
export class AppComponent implements OnInit {
  // Propriedade 'title' usada no template para exibir o título
  title = 'LH Games';
  
  // Propriedade para controlar a visibilidade do menu
  mostrarMenu: boolean = true;

  // O Router é injetado através do construtor para lidar com navegação e eventos de rotas
  constructor(private router: Router) {}

  // O método ngOnInit é um ciclo de vida do Angular que é chamado quando o componente é inicializado
  ngOnInit(): void {
    // Subscrição para escutar eventos de navegação usando o Router
    this.router.events.pipe(
      // Filtra apenas os eventos de tipo NavigationEnd, que ocorrem ao final da navegação
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Quando ocorre uma mudança de rota, chama o método checkRoute para verificar a rota atual
      this.checkRoute();
    });

    // Verifica a rota inicial logo após a inicialização do componente
    this.checkRoute();
  }

  // Método privado que verifica a rota atual e define se o menu deve ser exibido
  private checkRoute(): void {
    // Obtém a URL da rota atual
    const currentRoute = this.router.url;
    
    // Se a URL atual incluir o termo 'restrito', o menu será ocultado; caso contrário, o menu será mostrado
    this.mostrarMenu = !currentRoute.includes('restrito');
  }
}
