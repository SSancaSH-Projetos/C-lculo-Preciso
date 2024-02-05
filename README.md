
<img width="479" alt="Logo03" src="https://github.com/SSancaSH-Projetos/Calculo-Preciso/assets/158601854/da4a96b3-9b85-4108-9d7d-10adb4117c1d">

# Problema: Dificuldade no cálculo de Custo de Usinagem de Peças

- **Área:** Usinagem
- **Responsável:** Grupo PrecisionTech

## 1. Escopo

O projeto tem como objetivo desenvolver um sistema de comunicação eficiente, conectando os usuários de forma indireta para otimizar a dinâmica nos cálculos de custo de usinagem. A proposta é proporcionar layouts simples, facilitando a identificação de cada usuário com o software. Além disso, visa proporcionar agilidade nas negociações e alcançar resultados satisfatórios para todos os usuários.

## 2. Objetivos do projeto

- Desenvolver um aplicativo para funcionários, gestores e clientes que permita com mais facilidade realizar cálculos de usinagem mais específicos com menos dificuldades.
- Estabelecer um sistema de notificações instantâneas para informar os supervisores, operadores e clientes sobre os resultados obtidos através dos cálculos.
- Alcançar uma redução mensurável no tempo médio gasto na conclusão de cálculos muito difíceis com implementação do sistema.
- Alcançar uma taxa de adoção das empresas no uso do software de cálculos de usinagem.

## 3. Análise de Riscos

**Risco: Erros ao salvar os dados no banco de dados**
- Estratégias de Mitigação: Realizar uma série de testes antes do lançamento final do aplicativo, implementar mecanismos de tratamento de exceções, onde eles irão capturar esses erros e mostrar informações mais detalhadas sobre os erros.
- Plano de Contingência: Adotar uma estratégia de backup que permite fazer uma cópia dos dados.

**Risco: O cliente ter acesso às informações exclusivas do gestor ou do operador.**
- Estratégias de Mitigação: Reforçar a autenticação, garantindo que cada usuário (gestor, operador e cliente) acessem suas informações. Dessa forma, cada um dos usuários terá sua própria senha de acesso.
- Plano de Contingência: Realizar vários testes para identificar possíveis erros de autenticação e corrigir possíveis brechas no sistema.

**Risco: Possíveis mudanças nos Requisitos durante o Desenvolvimento do projeto.**
- Estratégias de Mitigação: Fazer uma análise profunda e detalhada dos requisitos antes de começar o desenvolvimento do software.
- Plano de Contingência: Analisar e planejar possíveis impactos nas mudanças dos requisitos.

## 4. Cronograma

**Janeiro/2024:** Planejamento e Análise.
- Formação das equipes.
- Identificação de requisitos detalhados.

**Fevereiro/2024:** Início do desenvolvimento do escopo do projeto e documentação da ideia inicial.
- Desenvolvimento do MVP (menor produto viável).
- Codificação e validação do MVP.
- Desenvolvimento dos serviços e bancos de dados.

**Março/2024:** Desenvolvimento do protótipo do aplicativo.
- Desenvolvimento das interfaces do usuário, fluxos da aplicação.
- Desenvolvimento dos serviços e bancos de dados.
- Revisão e ajuste do protótipo com feedback da equipe.

**Abril/2024:** Início da integração com sistemas.
- Testes de integração e ajustes necessários.

**Maio/2024:** Testes finais do aplicativo e do sistema integrado.
- Monitoramento inicial de feedback e desempenho.
- Entrega do Projeto Final.

**Junho/2024:** Apresentação final.

# 5. Recursos

## Pessoal:
- Desenvolvedores de Software: Para a criação do aplicativo para funcionários, clientes e gestores de empresas de usinagem.
- Líder do Projeto: Para coordenar e supervisionar todas as atividades.

## Tecnologia:
- Ambiente de Desenvolvimento Integrado (IDE): Ferramentas adequadas para o desenvolvimento do aplicativo e do painel de supervisão.
- Sistemas de versionamento de código: git e github para manter o código versionado e sempre atualizado.
- Ferramentas de Teste de Software: Para garantir a qualidade e a confiabilidade do aplicativo e do sistema.

## Equipamentos:
- Computadores e Notebooks: Para desenvolvimento, teste e gerenciamento de projeto.
- Dispositivos Móveis: Para testes e treinamento do aplicativo em condições reais.

## Comunicação:
- Ferramentas de Comunicação Online: Para facilitar a colaboração entre a equipe, como e-mails, mensagens instantâneas e videoconferências.

# 6. Custos

## Pessoal:
- Desenvolvedores de Software:
  - 5 desenvolvedores trabalhando por 3 dias na semana.
- Líder do Projeto:
  - 1 líder do projeto.

## Tecnologia:
- Ambiente de Desenvolvimento Integrado (IDE):
  - Custo total (considerando licenças): $0
- Sistemas de versionamento de código:
  - Custo total (considerando licenças): $0
- Banco de Dados:
  - Custo total (considerando serviços): $0
- Ferramentas de Teste de Software:
  - Custo total (considerando licenças): $0
- Bibliotecas e Frameworks:
  - Custo total (considerando licenças): $0
- Ferramenta de Design Gráfico:
  - Custo Total: $0

## Equipamentos:
- Computadores:
  - 5 notebooks:
    - Custo Total: $0
- Dispositivos de Entrada:
  - Teclados
  - Mouses
    - Custo Total: $0
- Conexão com Rede:
  - Custo Total: $0

## Total Geral:
- Pessoal: $0
- Tecnologia: $0
- Equipamentos: $0

**Custo Total do Projeto: $0**

# 7. Documentação

## Requisitos Funcionais

### Como um cliente eu quero garantir que a minha solicitação de peça seja registrada.
- **Critérios de Aceitação:** Deve ser possível verificar se minha solicitação foi registrada com sucesso.

### Como um cliente eu quero poder fazer mais de um pedido.
- **Critérios de Aceitação:** O aplicativo deve disponibilizar uma forma de fazer múltiplas requisições.

### Como operador eu quero saber quero que meus envios sejam registrados com sucesso.
- **Critérios de Aceitação:** O aplicativo deve ser possível conferir se os envios foram registrados.

### Como operador eu quero que o software possua a função de fazer envios dos relatórios para que o meu Gestor Veja.
- **Critérios de Aceitação:** O aplicativo deve ter um campo para o download de relatórios.

### Como um Gestor eu quero que os dados sejam limitados apenas para gestores.
- **Critérios de Aceitação:** O aplicativo possui limitações por meio de senhas para gestores e operadores.

### Como Gestor eu quero receber o valor líquido da peça para que eu possa enviar o valor final para o cliente.
- **Critérios de Aceitação:** O aplicativo fará o cálculo com base nas informações recebidas do cliente e operador e entregará o valor líquido para o gestor.

# 8. Avaliação do Projeto

## Eficiência Operacional:
- **Objetivo:** Trará melhorias no quesito de gastos com eltricidade e sobra de cavaco, poupando custos e tempo.

## Satisfação do Usuário:
- **Objetivo:** Alcançar uma pontuação de satisfação do usuário de pelo menos 4,5 em 5, com base em pesquisas de satisfação.
- **Métrica:** Resultados de pesquisas de satisfação realizadas com gestores, clientes e operadores.

## Integridade dos Dados:
- **Objetivo:** Alcançar uma precisão de pelo menos 98% na integridade dos dados registrados pelo sistema.

## Disponibilidade do Sistema:
- **Objetivo:** Garantir uma disponibilidade do sistema de pelo menos 99,5% ao longo do tempo.
- **Métrica:** Tempo total de operação sem interrupções.

## Tempo de Implementação:
- **Objetivo:** Cumprir o cronograma estabelecido, realizando a implementação e lançamento até a data prevista.

