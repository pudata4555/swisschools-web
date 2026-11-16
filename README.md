# SwisSchools — Frontend (Next.js)

Fresh frontend for swisschools.com, built on the existing API (`api.swisschools.com`).
Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS. Runs under PM2 behind Apache.

## Local dev
```bash
npm install
npm run dev      # http://localhost:3000
```

## Environment
- `NEXT_PUBLIC_API_BASE` — API base URL (default `https://api.swisschools.com`).

## Deploy (staging.swisschools.com, under PM2)
Runs as the `administrator` user; Apache reverse-proxies the subdomain to port 3000.

```bash
cd ~/swisschools-web
git pull
npm install
# one-time: bring the banner video over from the live site
curl -fsSL https://swisschools.com/assets/images/bannerVideo/bannerVideo.mp4 -o public/media/bannerVideo.mp4
npm run build
pm2 start ecosystem.config.js   # first time
pm2 reload swisschools-web      # subsequent deploys
pm2 save
```

## Structure
- `src/app` — routes (home, universities, courses, scholarships, tools, guides, about, contact, auth)
- `src/components` — Header, Footer, cards, finder, calculator, forms
- `src/lib` — API client (`api.ts`), types, formatting/normalisation helpers
