# Contexto do Projeto — Sofia-s

> **Leitura obrigatória antes de implementar qualquer mudança.**
>
> Este arquivo define o padrão operacional do projeto e deve ser respeitado por qualquer agente, modelo, pessoa ou ferramenta que proponha ou implemente alterações no repositório.

## 1. Fluxo obrigatório de trabalho

Toda alteração deve seguir esta sequência:

1. **Issue**
2. **Classificação da tarefa**
3. **Branch própria**
4. **Implementação**
5. **Validação**
6. **Pull Request**
7. **Revisão e merge**
8. **Deploy, quando aplicável**

Não implementar mudanças diretamente na branch principal.

Antes de começar, verificar Issues e Pull Requests existentes para evitar trabalho duplicado ou conflitante.

## 2. Issues

Toda tarefa deve possuir uma Issue relacionada **antes da implementação**.

Cada Issue deve ser classificada em exatamente uma destas categorias:

- **Correção** — resolve bug, erro, regressão ou comportamento incorreto.
- **Melhoria** — aprimora algo que já existe sem introduzir uma função principal inteiramente nova.
- **Nova função** — adiciona comportamento, recurso ou capacidade que ainda não existe no projeto.

Quando os labels correspondentes estiverem disponíveis no repositório, aplicar o label da categoria. Na ausência deles, manter a categoria explicitamente no título e no corpo da Issue.

A Issue deve deixar claro, sempre que aplicável:

- objetivo;
- contexto ou problema;
- escopo;
- critérios de aceite;
- dependências ou observações relevantes.

## 3. Branches

Criar uma branch própria para cada Issue.

Preferir nomes que indiquem categoria e número da Issue, por exemplo:

- `correcao/issue-12-menu-mobile`
- `melhoria/issue-18-galeria`
- `nova-funcao/issue-25-agendamento`

Não realizar implementação diretamente em `main`.

## 4. Pull Requests

Toda entrega deve passar por Pull Request antes de merge ou deploy.

O Pull Request deve mencionar a Issue relacionada. Quando o PR concluir integralmente a tarefa, usar uma referência de fechamento, como:

`Closes #<numero-da-issue>`

Todo Pull Request deve conter obrigatoriamente as seções abaixo.

### Issue relacionada

Informar o número e o vínculo com a Issue.

### O que mudou

Descrever objetivamente as alterações realizadas e o escopo afetado.

### Como foi validado

Registrar testes, verificações manuais, cenários avaliados e qualquer evidência relevante.

Nunca declarar um teste como executado se ele não tiver sido realmente realizado.

### Riscos e limitações

Registrar riscos conhecidos, comportamentos ainda não cobertos, dependências, limitações técnicas ou possíveis impactos.

Se não houver riscos conhecidos, registrar isso explicitamente.

### Próximos passos

Registrar pendências, melhorias futuras ou ações posteriores. Se não houver, registrar explicitamente que não há próximos passos previstos.

## 5. Entregas e deploys

Pull Requests são a unidade de controle das entregas.

Não realizar merge ou deploy de uma mudança sem que:

- exista Issue relacionada;
- a implementação esteja em branch própria;
- exista Pull Request;
- a validação esteja registrada;
- riscos e limitações estejam documentados.

O merge e o deploy devem ocorrer somente depois da revisão/aprovação apropriada para a mudança.

## 6. Regra para agentes e modelos

Antes de alterar código, conteúdo, configuração ou documentação, qualquer agente ou modelo deve:

1. ler este arquivo;
2. identificar ou criar a Issue da tarefa;
3. confirmar sua categoria;
4. verificar se já existe trabalho relacionado;
5. trabalhar em branch própria;
6. entregar a mudança por Pull Request seguindo o formato obrigatório acima.

Estas instruções têm precedência como padrão de colaboração do projeto. Caso uma solicitação específica exija exceção, a exceção deve ser registrada explicitamente na Issue e no Pull Request correspondente.

---

Este padrão foi introduzido pela Issue #1.
