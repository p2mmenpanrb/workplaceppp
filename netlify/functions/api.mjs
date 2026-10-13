export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({
      success: false,
      error: 'Method not allowed'
    }), {
      status: 405,
      headers: {'content-type':'application/json'}
    });
  }

  try {
    const body = await request.json();

    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    if (!appsScriptUrl) {
      throw new Error('APPS_SCRIPT_URL belum diatur di Netlify Environment Variables.');
    }

    const upstream = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'content-type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        ...body,
        token: process.env.APP_API_TOKEN || ''
      }),
      redirect: 'follow'
    });

    const text = await upstream.text();

    return new Response(text, {
      status: upstream.ok ? 200 : upstream.status,
      headers: {'content-type':'application/json; charset=utf-8'}
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message || String(error)
    }), {
      status: 500,
      headers: {'content-type':'application/json; charset=utf-8'}
    });
  }
}
