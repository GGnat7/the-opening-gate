export async function onRequestGet(context) {
  const { env } = context;

  try {
    const result = await env.WINDOW_DB.prepare(
      `SELECT content, week_start FROM weekly_windows ORDER BY week_start DESC LIMIT 1`
    ).first();

    if (!result) {
      return new Response(JSON.stringify({ content: null }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({
      content: result.content,
      weekStart: result.week_start
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ content: null, error: "unavailable" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
