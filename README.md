# 🎲 n8n Random (Desafio Custom Node)
 
Desenvolvimento de um conector personalizado para a plataforma de automação n8n como desafio técnico parte de um processo seletivo. 
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

## 🛠️ Pré-requisitos

[Docker](https://docs.docker.com/get-docker/)

[Docker Compose](https://docs.docker.com/compose/install/)

[Node.js 22 LTS](https://nodejs.org/en)
[+ npm](https://www.npmjs.com/)

## 📦 Instalar dependências

Após clonar o repositório:

```
cd packages/n8n-nodes-random
npm install
npm run build
```

Isso vai compilar o código TypeScript e gerar a pasta `dist/` com o node pronto para ser usado no n8n.

## 🐳 Executar o serviço localmente (Docker)

1. Vá até a pasta de infraestrutura:
```
cd infra
```

2. Copie o arquivo de variáveis de ambiente:
```
cp .env.example .env
```
3. Suba os containers:
```
docker compose up -d
```

4. Acesse o n8n em:
[n8n](http://localhost:5678)

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

1. Compile e copie o node para a pasta de extensões:
```
cd ../..
mkdir dist_custom
cp -r packages/n8n-nodes-random/dist/* dist_custom/
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

No momento há apenas um teste placeholder. Para rodar:
```
cd packages/n8n-nodes-random
npm test
```

Ou faça testes práticos direto no n8n criando workflows.

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
https://www.random.org/integers/?num=1&min=1&max=60&col=1&base=10&format=plain&rnd=new
```

Há validação para garantir que Min ≤ Max.
Testado no n8n v1.85.4.
Se o node não aparecer no n8n:
- Verifique se a pasta `dist_custom` foi criada e copiada corretamente.
- Reinicie o container `n8n`.
