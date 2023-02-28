# fullcycle_desafio_OrderRepository

O desafio consiste em implementar o repositório Order com as funções update, find, findAll e tratamentos de erro se necessário.

## Como testar

Para verificar todos os testes: 

```
npm test
```

Para verificar apenas o teste em Order:

```
npm test src/infrastructure/repository/order.repository.spec.ts
```

Para verificar apenas o teste em event dispatcher:

```
npm test src/domain/event/@shared/event-dispatcher.spec.ts
```

Para verificar apenas os testes unitários dos usecases:
```
npm test src/usecase/product/${nome da pasta}/{nome do arquivo}.unit.spec.ts
```
OBS: trocar os "${}" pelo nome da pasta que desejar.


Para verificar apenas os testes de integração dos usecases:
```
npm test src/usecase/product/${nome da pasta}/{nome do arquivo}.integration.spec.ts
```
OBS: trocar os "${}" pelo nome da pasta que desejar.