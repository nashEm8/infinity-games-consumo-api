// Importa o módulo TestBed para configurar e inicializar o ambiente de testes
import { TestBed } from '@angular/core/testing';

// Importa o serviço que será testado
import { NoticiaService } from './noticia.service';

// Descreve o conjunto de testes para o serviço NoticiaService
describe('NoticiaService', () => {
  // Declara uma variável para armazenar uma instância do NoticiaService
  let service: NoticiaService;

  // Antes de cada teste, configura o ambiente de teste e injeta o serviço
  beforeEach(() => {
    // Configura o ambiente de testes do Angular, inicializando o módulo de testes
    TestBed.configureTestingModule({});
    // Injeta o NoticiaService usando o TestBed para ser utilizado nos testes
    service = TestBed.inject(NoticiaService);
  });

  // Testa se o serviço foi criado com sucesso
  it('should be created', () => {
    // Verifica se a instância do serviço existe (não é nula ou indefinida)
    expect(service).toBeTruthy();
  });
});
