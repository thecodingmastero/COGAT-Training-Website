# CogAT AI-Powered Trainer (Qwen/OpenRouter Edition)

This is a fullstack deployable app for AI-powered cognitive ability training, using OpenRouter's Qwen3.6 Plus model.

## Features

- Pure frontend UI (React-free, minimal JS)
- AI question/explanation: Secure backend proxy (NO API key in browser)
- Easy deploy to Render/etc.

## Usage

1. Clone this repo.
2. Edit `backend/.env` and add your OpenRouter API key:
    ```
    OPENROUTER_API_KEY=sk-...your-key-here...
    ```
3. Install backend:
    ```
    cd backend
    npm install
    ```
4. Run app (from `backend`)
    ```
    npm start
    ```
   Serves frontend at `http://localhost:3001`

5. Deploy backend/ to Render as a Node server, with a build command of `npm install` and start command `npm start`, and add your secret as an ENV variable.

## Tips

- **Never leak your OpenRouter key**. Only ever store it in backend `.env` or host env.
- If you change the AI model, update `OPENROUTER_MODEL` in `server.js`.

---

## Project Structure

- `frontend/`: Single `index.html` file, all logic, **no API key prompts/input**.
- `backend/`: Express Node.js proxy for OpenRouter API.
