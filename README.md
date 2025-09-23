# 🎲 n8n Random (Desafio Custom Node)
 
Este repositório contém o desenvolvimento de um Custom Node para o n8n, criado como parte de um desafio técnico de processo seletivo.

O conector Random do **n8n** recebe um input de mínimo e máximo que aceita apenas números e retorna um número aleatório usando a **API do RANDOM.ORG**. 

---

## 🚀 Funcionalidades

- Node chamado **Random**
- Operação: **True Random Number Generator**
- Inputs obrigatórios (apenas números):
  - **Min** → número mínimo
  - **Max** → número máximo
- Output: objeto JSON com `{ min, max, value, source }`
- Integração direta com o endpoint oficial do [RANDOM.ORG](https://www.random.org/integers/)

Exemplo de saída:

```json
{
  "min": 1,
  "max": 80,
  "value": 43,
  "source": "random.org"
}
```

## 🛠️ Pré-requisitos Técnicos
+ Node.js + TypeScript na versão 22 (LTS)

+ Docker compose para subir o n8n + instância Postgres para o n8n

[Docker](https://docs.docker.com/get-started/get-docker/) e
[Docker Compose](https://docs.docker.com/compose/install/)

[Node.js 22 LTS](https://nodejs.org/en) + [npm](https://www.npmjs.com/)

## 📦 Instalar dependências

Abra o Windows PowerShell, clone o repositório (confira se está usando o PowerShell e não o cmd):

```
git clone https://github.com/camilahl/n8n-random-challenge.git
cd n8n-random-challenge
cd packages/n8n-nodes-random
npm install
npm run build
```

Isso vai compilar o código TypeScript e gerar a pasta `dist/` com o node pronto para ser usado no n8n.

## 🐳 Executar o serviço localmente (Docker)

1. Vá até a pasta de infraestrutura:
```
cd ..\..
cd infra
```

2. Copie o arquivo de variáveis de ambiente:
```
# Linux/macOS/Git Bash
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

3. Suba os containers:

⚠️ Confira se o Docker Desktop eatá aberto e em Running antes de rodar o seguinte comando:
```
docker compose up -d
```

4. Acesse o n8n em:
[http://localhost:5678](http://localhost:5678)

## ⚙️ Configurar o ambiente
Variáveis de ambiente (`.env`)
```
POSTGRES_USER=n8n
POSTGRES_PASSWORD=n8n
POSTGRES_DB=n8n
N8N_ENCRYPTION_KEY=sua-chave-secreta-bem-grande
N8N_PORT=5678
```
- Banco de dados: PostgreSQL é iniciado automaticamente via Docker (imagem oficial `postgres:16`)
  
- n8n: roda em `docker.n8n.io/n8nio/n8n:1.85.4` com os dados persistidos em volume local

## ▶️ Usando o Custom Node

1. Após rodar `npm run build`, copie o resultado para a pasta de extensões:
```
cd ../..

# Linux/macOS/Git Bash
mkdir dist_custom
cp -r packages/n8n-nodes-random/dist/* dist_custom/

# Windows PowerShell
mkdir dist_custom -ErrorAction SilentlyContinue
xcopy .\packages\n8n-nodes-random\dist .\dist_custom /E /I /Y

```

2. Reinicie o n8n:
```
cd infra
docker compose restart n8n
```

3. No n8n:
- Crie um New Workflow
  
- Adicione o node Random (vai aparecer na seção Custom)
  
- Defina Min e Max
  
- Clique em Execute Node

## 🧪 Executar os testes

Este repositório **não inclui testes automatizados**. 
Para validar o conector, use testes **manuais** no n8n:

1) Abra [http://localhost:5678](http://localhost:5678)
   
3) Crie um workflow com o node **Random**
   
5) Execute com diferentes pares (Min, Max), incluindo casos-limite:
   - Min = 1, Max = 1 (limite que min não pode ser igual ao max)
     
   - Min > Max (limite que min não pode ser maior que max)
     
   - Valores grandes (ex.: 1..10_000)
     
   - Inputs não inteiros (a UI normaliza para inteiro)


## 📂 Estrutura do projeto
```
n8n-random/
├─ infra/                # Infra (Docker + Postgres + n8n)
│  ├─ .env.example
│  └─ docker-compose.yml
├─ packages/
│  └─ n8n-nodes-random/  # Código do custom node
│     ├─ src/
│     │  ├─ index.ts
│     │  └─ nodes/Random/
│     │     ├─ Random.node.ts
│     │     └─ random.svg
│     ├─ package.json
│     └─ tsconfig.json
├─ dist_custom/          # Node compilado (copiado para o n8n)
└─ README.md
```

## 💡 Informações adicionais

O endpoint utilizado é:
```
https://www.random.org/integers/
```

Há validação para garantir que Min ≤ Max.

Buildado/testado com Node.js v22.9.0 + npm 10.8.3.

Se o node não aparecer no n8n:

- Verifique se a pasta `dist_custom` foi criada e copiada corretamente.
  
- Reinicie o container `n8n`.
