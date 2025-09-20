# 🎲 n8n Random (Custom Node)

Custom Node para **n8n** que gera números aleatórios verdadeiros usando a **API do RANDOM.ORG**.  
Este conector personalizado foi desenvolvido como desafio técnico de processo seletivo.  

---

## 🚀 Funcionalidades

- Node chamado **Random**
- Operação: **True Random Number Generator**
- Inputs obrigatórios:
  - **Min** → número mínimo (inclusivo)
  - **Max** → número máximo (inclusivo)
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

🛠️ Pré-requisitos

Docker

Docker Compose

Node.js 22 LTS
 + npm

⚙️ Configuração da Infraestrutura

Clone este repositório:

git clone https://github.com/seu-usuario/n8n-random.git
cd n8n-random/infra


Copie o arquivo de exemplo de variáveis de ambiente e configure:

cp .env.example .env


Edite .env se necessário:

POSTGRES_USER=n8n
POSTGRES_PASSWORD=n8n
POSTGRES_DB=n8n
N8N_ENCRYPTION_KEY=sua-chave-secreta-bem-grande
N8N_PORT=5678


Suba os containers:

docker compose up -d


Acesse o n8n em: http://localhost:5678
 e crie sua conta.

🔧 Build e Instalação do Custom Node

Instale dependências e faça o build:

cd ../packages/n8n-nodes-random
npm install
npm run build


Copie os arquivos compilados para o diretório de nodes customizados:

cd ../..
mkdir dist_custom
xcopy packages\n8n-nodes-random\dist dist_custom /E /I /Y


Reinicie o n8n:

cd infra
docker compose restart n8n

▶️ Testando no n8n

Abra http://localhost:5678

Crie um New Workflow

Adicione o node Random (vai aparecer na seção Custom)

Preencha Min e Max

Clique em Execute Node

Veja o resultado no painel de saída 🎉

📂 Estrutura do Projeto
n8n-random/
├─ infra/                # Infraestrutura (Docker + Postgres + n8n)
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
├─ dist_custom/          # Saída compilada (carregada pelo n8n)
└─ README.md

🧪 Testes

Build e execução rápida:

npm run build


Testes básicos podem ser feitos rodando workflows no próprio n8n.

📝 Observações

A integração utiliza o endpoint integers do RANDOM.ORG:

https://www.random.org/integers/?num=1&min=1&max=60&col=1&base=10&format=plain&rnd=new


Validação incluída para garantir que Min ≤ Max.

Projeto testado no n8n v1.85.4.