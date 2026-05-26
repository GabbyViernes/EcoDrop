# EcoDrop Web Frontend

The web-based administration and user dashboard for the EcoDrop waste management system.

## 🚀 Deployment to Render

This frontend is a React application. To deploy it to Render as a **Static Site**:

1. **Push to GitHub**:
   Ensure all latest changes (including API configurations) are pushed to your repository.

2. **Create New Static Site**:
   - Go to [dashboard.render.com](https://dashboard.render.com).
   - Click **New +** and select **Static Site**.
   - Connect your GitHub repository.

3. **Configure Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`

4. **Add Environment Variables** (Optional but recommended):
   If you want to use different API URLs without changing code, you can use `process.env.REACT_APP_API_URL` in `src/api/config.js`.

---

## 🛠️ Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm start
   ```

3. **Configure Backend**:
   By default, this frontend connects to the **Live Render Backend**. To test with a local backend, uncomment the local URL in `src/api/config.js`.

---

## 📂 Key Files
- `src/api/config.js`: Centralized API configuration.
- `src/context/AuthContext.js`: Global login state.
- `src/context/BinContext.js`: Global bin data management.
