# PropertyPal Agent Chat App

This project is a **Node.js chat frontend** connected to an **n8n workflow backend**.  
The frontend allows users to send text and/or images. The backend (n8n) processes the message through an AI-powered **Issue Detection workflow** and returns a response.

---

## 🚀 Features

- Chat interface supporting:
  - Text-only  
  - Image-only  
  - Text + image  
- Session management (`sessionId` sent with every request).  
- Integrated with **n8n Webhook**.  
- AI-powered property issue detection with recommendations.  

---

## 📦 Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  
- An active [n8n](https://n8n.io/) instance with your workflow running and Webhook URL accessible.  

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
````

### 2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Configure environment variables

Create a `.env` file in the root of the project:

```env
# Your n8n production webhook URL (without -test)
N8N_WEBHOOK_URL=https://<your-domain>/webhook/<workflow-id>

# App port
PORT=3000
```

---

## ▶️ Running the app

### Development mode (with hot reload)

```bash
npm run dev
```

### Production mode

```bash
npm start
```

The app will be available at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔗 Connecting to n8n

* Ensure your workflow in n8n is **Active**.
* Use the **Production Webhook URL** from the Webhook node (format: `/webhook/<id>`).

### Example request payload sent from frontend

```json
{
  "sessionId": "user_123",
  "type": "text",
  "text": "How much notice do I need to give before vacating?"
}
```

### Example response from n8n

```json
{
  "answer": "The notice you need to give before vacating depends on local laws and your rental agreement..."
}
```

---

## 🛠️ Scripts

* `npm run dev` → Run app in development with hot reload
* `npm start` → Run in production mode

---

## 📜 License

MIT License. See LICENSE file for details.