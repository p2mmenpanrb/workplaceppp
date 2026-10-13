# Rekap Kerja Asdep PPP — Netlify Native v1

Main requested files:
- Code.gs
- index.html

The frontend calls `/api`. For Netlify this repository also contains the required proxy:
- netlify/functions/api.mjs
- netlify.toml

Netlify Environment Variables:
- APPS_SCRIPT_URL = deployed Apps Script /exec URL
- APP_API_TOKEN = optional token. If set here, set the same value in Apps Script Script Properties.

Deployment:
1. Replace Apps Script Code.gs with Code.gs.
2. Keep current Apps Script Index.html if you want the legacy /exec UI as fallback.
3. Deploy Apps Script as a new Web App version.
4. Put index.html, netlify.toml and netlify/functions/api.mjs in GitHub.
5. Connect GitHub to Netlify.
6. Add APPS_SCRIPT_URL in Netlify environment variables.
7. Deploy.
