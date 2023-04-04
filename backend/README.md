
# Passo a passo de construção

1. `npm init -y` para inicar o npm
2. `npm install cors express sqlite3`
3. `npm install --save-dev nodemon` Para instalar como dependência de desenvolvimento
4. Adicionar no package.json o seguinte script:

```
  "scripts": {
    "start": "nodemon ./src/server.js",
  },
```