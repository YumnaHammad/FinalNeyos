# Nexyos deployment guide

## Do not share Vercel tokens in chat

Use one of these instead:

1. **Vercel Dashboard** → Import GitHub repo `FinalNeyos` (easiest)
2. **Local CLI**: run `vercel login` yourself, then deploy

---

## 1. Backend (Vercel)

Deploy the `backend/` folder as its own Vercel project.

**Vercel project settings:**

| Setting          | Value              |
|------------------|--------------------|
| Root directory   | `backend`          |
| Framework preset | Other              |
| Build command    | *(leave empty)*    |
| Output directory | *(leave empty)*    |

**Environment variables** (Project → Settings → Environment Variables):

```env
MONGO_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/nexyos
```

Use your MongoDB Atlas connection string (same as local `.env`).

**Deploy via CLI:**

```bash
npm i -g vercel
vercel login

cd backend
vercel --prod
```

After deploy, note the API URL, e.g. `https://nexyos-api.vercel.app`

**Test:**

```bash
curl https://YOUR-BACKEND-URL.vercel.app/
# → {"message":"Nexyos API is running..."}
```

**Uploads on Vercel:** file uploads use ephemeral storage (`/tmp`). Images uploaded in production may not persist across requests. For persistent uploads, use cloud storage (S3, Cloudinary) later.

---

## 2. Three Vercel projects (same GitHub repo)

Create **3 separate projects** in [vercel.com](https://vercel.com):

| Project name   | Root directory | Build command   | Output |
|----------------|----------------|-----------------|--------|
| nexyos-web     | `frontend`     | `npm run build` | `dist` |
| nexyos-admin   | `admin`        | `npm run build` | `dist` |
| nexyos-vendor  | `vendor`       | `npm run build` | `dist` |

On **each** Vercel project, add:

```env
VITE_API_ORIGIN=https://YOUR-BACKEND-URL.vercel.app
```

(no trailing slash)

Redeploy after setting the variable.

---

## 3. Deploy with Vercel CLI (optional)

```bash
npm i -g vercel
vercel login

# Backend first
cd backend
vercel --prod
# Add MONGO_URI in Vercel dashboard if not set during deploy

# Then frontends (set VITE_API_ORIGIN to backend URL)
cd ../frontend
vercel --prod

cd ../admin
vercel --prod

cd ../vendor
vercel --prod
```

---

## 4. After deploy

Seed production (once):

```bash
curl -X POST https://YOUR-BACKEND/api/products/seed
curl -X POST https://YOUR-BACKEND/api/vendors/seed
```

Test:

- Website → products load
- Admin → login password `123123`
- Vendor → `vendor@nexyos.com` / `123123`

---

## Local development (unchanged)

Leave `VITE_API_ORIGIN` unset. Vite proxy sends `/api` → `http://127.0.0.1:5000`.

Run backend locally:

```bash
cd backend
npm install
npm run dev
```
