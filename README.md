# Operação TAF

Projeto informativo para localizar concursos públicos que podem exigir Teste de Aptidão Física (TAF) e acessar os canais oficiais dos órgãos.

## Como abrir

Abra `index.html` no navegador. O projeto usa HTML, CSS e JavaScript sem dependências ou etapa de build.

## Banco de dados local

É necessário ter Python 3 instalado. Na pasta do projeto, execute:

```powershell
python database.py
```

O comando cria `data/operacao_taf.db` com tabelas para usuários, concursos e inscrições, incluindo os seis concursos iniciais. O SQLite já vem incluído no Python; não é necessário instalar pacotes.

O arquivo do banco é local e está excluído do Git para não publicar dados pessoais. O campo de senha é destinado a um hash gerado no servidor, nunca a uma senha em texto puro. O site ainda não está conectado ao banco: cadastro, login e inscrição continuam sem persistência até que um backend seguro seja implementado.

## Funcionalidades atuais

- Lista concursos e permite buscar pelo nome.
- Abre uma página de inscrição com o concurso escolhido e campos para dados pessoais.
- Usa validações básicas de formulário no navegador.
- Informa quando cadastro, login e inscrição ainda não podem ser enviados. Os dados pessoais preenchidos não são enviados nem salvos.

O banco inicial contém somente dados de referência dos concursos; não contém usuários nem inscrições. Confirme editais e informações dos concursos nos canais oficiais.
