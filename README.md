# SRE Knowledge Hub

Professional, responsive website template for a Senior Site Reliability Engineer to educate teams and share practical SRE knowledge.

## Features

- Hero homepage with highlighted learning paths
- Learn/Blog section with client-side topic search
- Case studies with problem, solution, results, and lessons learned
- Tools & Monitoring section (Prometheus, Grafana, Terraform, OpenTelemetry, Firebase Crashlytics)
- News section with live API refresh and fallback content
- Feedback/contact form that stores submissions in local browser JSON (`localStorage`)
- Sticky responsive navbar, smooth scrolling, dark/light mode toggle
- Syntax-highlighted code snippets

## Local development

Because this site uses static assets only, you can run it with any static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy on Vercel (free)

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New Project** and import the repository.
4. Keep framework preset as **Other** (static site).
5. Click **Deploy**.

No build step is required.

## Deploy on Firebase Hosting (free)

1. Install Firebase CLI:

   ```bash
   npm install -g firebase-tools
   ```

2. Login and initialize hosting:

   ```bash
   firebase login
   firebase init hosting
   ```

3. When prompted:
   - Select your Firebase project
   - Set public directory to `.`
   - Configure as single-page app: `No`
   - Overwrite `index.html`: `No`

4. Deploy:

   ```bash
   firebase deploy
   ```

## Optional backend for contact submissions

Current implementation saves feedback locally in browser storage for demo use.
For production, connect the form to Firebase Firestore, Supabase, or a lightweight Express API.
