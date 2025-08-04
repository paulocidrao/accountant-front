# Moeda Certa

O Moeda Certa é uma ferramenta prática e intuitiva projetada para registrar
vendas e calcular automaticamente o montante total de dinheiro em reais, com
base na quantidade de notas e moedas inseridas. O sistema permite que o usuário
insira a quantidade de cada denominação (notas e moedas) e, em poucos cliques,
obtenha o valor total acumulado, facilitando o controle financeiro de
transações. Com uma interface simples, o projeto elimina erros manuais e agiliza
o processo de conferência de caixa.

## Público-Alvo:

- Pequenos comerciantes e lojistas: Para gerenciar o fluxo de caixa diário de
  forma eficiente.
- Autônomos e vendedores informais: Como feirantes ou prestadores de serviços
  que lidam com dinheiro físico.
- Caixas e operadores de PDV: Que precisam fazer conferências rápidas e precisas
  no fechamento do caixa.
- Qualquer pessoa que gerencia transações em dinheiro: Ideal para quem busca
  organização e praticidade no controle de valores recebidos.

## Stack Tecnológica

O **Moeda Certa** utiliza uma stack moderna para garantir desempenho,
escalabilidade e uma experiência de usuário fluida. Abaixo estão as tecnologias
empregadas no front-end e back-end:

### Front-end

- **React**: Biblioteca para interfaces dinâmicas e componentizadas.
- **TypeScript**: Tipagem estática para maior robustez e manutenção.
- **TailwindCSS**: Estilização rápida e responsiva com classes utilitárias.
- **Zod**: Validação de schemas para dados seguros e consistentes.
- **TanStack Query**: Gerenciamento eficiente de requisições e estados
  assíncronos.
- **React Router**: Navegação fluida com rotas dinâmicas.
- **Shadcn/UI**: Componentes UI acessíveis e personalizáveis.
- **React Hook Form**: Gerenciamento de formulários com validações
  performáticas.

### Back-end

- **Node.js**: Ambiente server-side para alta performance.
- **Fastify**: Framework leve para APIs RESTful rápidas.
- **TypeScript**: Tipagem estática para maior confiabilidade.
- **PostgreSQL**: Banco relacional para armazenamento seguro.
- **Drizzle ORM**: ORM type-safe para queries simplificadas.
- **JWT**: Autenticação segura baseada em tokens.
- **Zod**: Validação de dados para integridade nas requisições.

Essa stack garante que o **Moeda Certa** seja confiável, escalável e fácil de
usar, otimizando o controle financeiro de vendas.# 📦 Instalação e Execução

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js**: versão 22.15.0 ou superior
- **Gerenciador de pacotes**:
  - **PNPM**: versão 9.15.3 ou superior (recomendado)
  - **NPM**: versão 10.9.2 ou superior

### Verificando as versões instaladas

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do NPM
npm --version

# Verificar versão do PNPM (se instalado)
pnpm --version
```

## ⚡ Instalação do PNPM (opcional)

Se você não tem o PNPM instalado, pode instalá-lo globalmente:

```bash
npm install -g pnpm
```

## 🚀 Configuração do Projeto

### 1. Configuração do Backend

**⚠️ IMPORTANTE:** Este front-end depende do backend rodando na porta `8081`.

**[Clique aqui para baixar o backend](https://github.com/paulocidrao/accountant/archive/refs/heads/main.zip)**

Certifique-se de que o repositório do backend esteja:

- Clonado e configurado
- Executando na porta `8081`
- Acessível em `http://localhost:8081`

### 2. Instalação das Dependências

No diretório do projeto front-end, execute um dos comandos abaixo:

```bash
# Usando PNPM (recomendado)
pnpm install

# OU usando NPM
npm install
```

### 3. Executando a Aplicação

Após a instalação das dependências, inicie o servidor de desenvolvimento:

```bash
# Usando PNPM
pnpm run dev

# OU usando NPM
npm run dev
```

### 4. Acessando a Aplicação

Após executar o comando acima, a aplicação estará disponível em:

🌐 **http://localhost:3000**

## 📋 Resumo dos Comandos

```bash
# 1. Verificar pré-requisitos
node --version && npm --version

# 2. Instalar dependências
pnpm install  # ou npm install

# 3. Executar aplicação
pnpm run dev  # ou npm run dev

# 4. Acessar no navegador
# http://localhost:3000
```

## 🔍 Solução de Problemas

### Backend não está rodando

- Verifique se o backend está executando na porta 8081
- Teste o acesso: `curl http://localhost:8081` ou acesse pelo navegador

### Erro de porta em uso

- A porta 3000 pode estar sendo usada por outro processo
- O comando `dev` geralmente oferece uma porta alternativa automaticamente

### Problemas com dependências

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json  # ou pnpm-lock.yaml
pnpm install  # ou npm install
```

## 📞 Suporte

Se você encontrar problemas durante a instalação ou execução, verifique:

1. As versões dos pré-requisitos
2. Se o backend está rodando corretamente
3. Os logs de erro no terminal para mais detalhes

## 💻 Fale comigo

Interessado na aplicação ou precisa de suporte? Entre em contato:

**[Linkedin](https://www.linkedin.com/in/paulocidrao-devfull-stack/)** <br/>
**Email: paulocdrao.123@gmail.com**
