# DiabetesIA 🩺

Assistente educativo sobre diabetes com IA, hospedado via Vercel.

## Estrutura do projeto

```
diabetesia/
├── api/
│   └── chat.js          ← Função serverless (backend seguro)
├── public/
│   └── index.html       ← Frontend do app
├── vercel.json          ← Configuração do Vercel
└── package.json
```

## Como fazer deploy no Vercel (passo a passo)

### 1. Criar conta no GitHub
- Acesse https://github.com e crie uma conta gratuita

### 2. Criar repositório
- Clique em "New repository"
- Nome: `diabetesia`
- Deixe como **Public**
- Clique em "Create repository"

### 3. Fazer upload dos arquivos
- Na página do repositório, clique em "uploading an existing file"
- Arraste TODA a pasta do projeto (api/, public/, vercel.json, package.json)
- Clique em "Commit changes"

### 4. Criar conta no Vercel
- Acesse https://vercel.com
- Clique em "Sign Up" → entre com sua conta do GitHub

### 5. Importar o projeto
- No painel do Vercel, clique em "Add New → Project"
- Selecione o repositório `diabetesia`
- Clique em "Import"

### 6. Configurar a variável de ambiente (IMPORTANTE!)
- Antes de clicar em Deploy, procure a seção **"Environment Variables"**
- Adicione:
  - **Name:** `ANTHROPIC_API_KEY`
  - **Value:** sua chave da API (começa com `sk-ant-...`)
- Clique em "Add"

> 💡 Onde pegar a chave? Acesse https://console.anthropic.com → API Keys → Create Key

### 7. Deploy!
- Clique em **"Deploy"**
- Aguarde ~1 minuto
- Pronto! Você receberá uma URL como: `diabetesia.vercel.app`

## Gerar QR Code
Com a URL em mãos, acesse https://qr.io ou https://qrcode-monkey.com e gere o QR Code gratuitamente.
