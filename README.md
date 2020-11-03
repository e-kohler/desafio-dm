# Desafio Delivery Much

Para rodar a API:
Executar o seguinte comando no diretório do projeto
```
docker build -t <nome_de_usuario>/desafio-dm .
```
A flag -t permite tagear a imagem para que seja mais fácil criar o container e executar comandos

Para subir o container da aplicação:
```
docker run -p <porta_externa>:<porta_do_container> -d <nome_de_usuario>/desafio-dm
```
A flag -d sobe o container no modo "detached".
A flag -p mapeia uma porta pública para uma porta privada dentro do container:
 - porta_externa: Porta pela qual a aplicação será acessada externamente
 - porta_do_container: Porta pela qual a aplicação é acessada dentro do container, ou seja, a porta definida no arquivo de configuração .env

Após a execução dos comandos, a API deve estar disponível em
```
http://{host}:{porta_externa}
```
respeitando chamadas do tipo:
```
http://{host}:{porta_externa}/recipes/?i={ingredient_1},{ingredient_2}
http://{host}:{porta_externa}/recipes/?i={ingredient_1},{ingredient_2}&p=2
```
Para rodas os testes:
```
docker run <nome_de_usuario>/desafio-dm npm run test
```
O arquivo de configuração .env contém os seguintes parâmetros:
 - GIPHY_API_KEY: Chave necessária para a utilização da API do Giphy
 - RECIPE_PUPPY_URL= URL base da API do Recipe Puppy
 - GIPHY_URL= URL base da API do Giphy
 - PORT= Porta pela qual a aplicação é acessada dentro do container