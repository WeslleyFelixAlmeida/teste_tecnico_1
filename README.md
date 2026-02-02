# 🚀 Inicialização do Projeto

Este repositório contém uma aplicação **full stack** composta por dois projetos separados:

* **Backend**: Node.js (API)
* **Frontend**: React.js

Ambos são iniciados simultaneamente com um único comando (`npm run dev`) a partir da raiz do projeto.

---

## 📁 Estrutura de Pastas

A estrutura esperada do projeto é a seguinte:

```
/teste_tecnico_1
 ├─ back_end/
 │   ├─ package.json
 │   └─ src/
 ├─ front_end/
 │   ├─ package.json
 │   └─ src/
 └─ package.json   (raiz)
```

⚠️ **Importante:**

* Cada projeto (**backend** e **frontend**) deve possuir seu próprio `package.json`.
* O diretório `src` pode variar internamente, mas o `package.json` **deve estar na raiz de cada pasta**.

---

## 📦 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

* **Node.js** (versão 18 ou superior recomendada)
* **npm** (geralmente instalado junto com o Node)

Para verificar:

```bash
node -v
npm -v
```

---

## 🔧 Instalação das Dependências

### 1️⃣ Backend

```bash
cd back_end
npm install
```

### 2️⃣ Frontend

```bash
cd ../front_end
npm install
```

### 3️⃣ Dependências da raiz

Volte para a raiz do projeto:

```bash
cd ..
npm install
```

> A raiz utiliza o pacote **concurrently** para executar backend e frontend ao mesmo tempo.

---

## ▶️ Como iniciar o projeto

Na **raiz do projeto**, execute:

```bash
npm run dev
```

Este comando irá:

* Iniciar a **API Node.js** (ex: `nodemon`, `node`, etc.)
* Iniciar o **Frontend React** (ex: `Vite`, `CRA`, etc.)
* Exibir os logs de ambos no mesmo terminal

---

## 🧪 Como executar os testes do Front-end

Os testes automatizados estão configurados **apenas no front-end**.

Para executá-los:

```bash
cd front_end
npm run test
```

Este comando irá:

* Executar os testes unitários/configurados (ex: Jest)
* Exibir o resultado no terminal

---

## 🧠 Scripts utilizados

### package.json (raiz)

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix back_end\" \"npm run dev --prefix front_end\""
  }
}
```

### package.json (backend)

```json
{
  "scripts": {
    "dev": "nodemon src/index.js"
  }
}
```

### package.json (frontend)

```json
{
  "scripts": {
    "dev": "vite"
  }
}
```

---

## ❗ Possíveis erros comuns

### ❌ Erro: `Could not read package.json`

Causa:

* O caminho informado no `--prefix` não corresponde à pasta onde está o `package.json`.

Solução:

* Verifique se as pastas realmente se chamam `back_end` e `front_end`.
* Ajuste o script caso os nomes sejam diferentes.