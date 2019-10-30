# PWA TV Catalog APP

O projeto consiste em um exemplo de aplicação PWA para catalogo de séries e filmes com informações e images.

## Instalação e dependencias do projeto
- **GulpJS** [Mais informações sobre como instalar](https://gulpjs.com/docs/en/getting-started/quick-start)
  - npm install gulp-cli -g
  - npm install gulp -D
- **NodeJS**: v12.13.0

## Rodando ambiente de desenvolvimento e produção
- Desenvolvimento: **gulp** ou **gulp watch** no terminal
- Build de produção: **gulp build** no terminal

## Features e tecnologias do projeto
- GulpJS 4
  - Servidor para desenvolvimento/prod com **BrowserSync**
  - Tratamento para garantia de compatibilidade com **Babel** e **Rollup**
  - Minificação de JS com **Terser**
  - Minificação de imagens com **Imagemin**
  - Adaptação do HTML para bundles e minificação com **Htmlreplace** e **Htmlmin**
  - Tratamento do css para compatibilidade e minificação/redundancia com **Autoprefixer** e **Cssnano**
  - Inserção de técnica para evitar FOUC na App e CSS crítico de borda com **Critical**
  
- Javascript Puro (es6)
- Componentização do css usando **SASS** com métodologia **BEM** para nomenclaturas
- **Manifest** configurado com ícones e infomações
- **Service Worker** armazenamento de Cache e navegação offline
- Favicon (e icones para o Manifest) desenvolvids por mim, só para o projeto
- Auxilio para configuração de rotas utilizando **route.js** dos helpers da equipe do Polymer
- App dispónivel no **GitHub Pages** para acesso e verificação de desempenho com **Lighthouse** no console
