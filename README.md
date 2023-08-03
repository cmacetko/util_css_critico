# util_css_critico

>  util_css_critico é uma API, que roda em Nodejs que gera o Css Critico de um site

![Language](https://img.shields.io/badge/language-nodejs-orange)
![Platforms](https://img.shields.io/badge/platforms-Windows%2C%20macOS%20and%20Linux-blue)
![License](https://img.shields.io/github/license/cmacetko/util_css_critico)
[![HitCount](http://hits.dwyl.com/cmacetko/util_css_critico.svg)](http://hits.dwyl.com/cmacetko/util_css_critico)

## Porta

A aplicação roda na porta **9091**

## Requisição

Para gerar o Css Critico, é necessário enviar um **POST** para **http://127.0.0.1:9000/gerar**.

No corpo da requisição, envie um Json semelhante ao Json abaixo:
```json
{
  "url": "https://www.meusite.com.br/",
  "css": "https://www.meusite.com.br/css.css",
  "device": "Desktop"
}
```

Nesta requisição precisamos preencher os campos:
- **url:** A url completa do site
- **css:** O link do arquivo de css completo (Aqui já presumo que todos os arquivos de css estão mimifiados em um arquivo único)
- **device:** Informe "Desktop" ou "Mobile", isto ira controlar as dimensões da janela e o navegador

Em caso de **Falha** será retornado a causa na váriavel **Msg** com HttpCode **500**:
```json
{
"Msg": "Url nao informada"
}
```

Em caso de **Sucesso** será retornado o Css na váriavel **Arquivo** com HttpCode **200**:
```json
{
"Arquivo": "html{font-family:sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}"
}
```

# Contato

**Paloma Macetko**
- cmacetko@gmail.com
- https://github.com/cmacetko/
- https://www.npmjs.com/~cmacetko
- https://cmacetko.medium.com
- https://www.facebook.com/cmacetko
- https://www.instagram.com/cmacetko/
- https://twitter.com/cmacetko