export const config = {
  runtime: "edge",
  verifyJWT: false,
};

import { serve } from "https://deno.land/std/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const body = await req.json();

    const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

    await resend.emails.send({
      from: "Luxuvia <info@luxuvia.in>",
      to: "support@luxuvia.in",
      subject: "New Inquiry Received",
      html: `
        <h2>New Inquiry</h2>
        <p><strong>Name:</strong> ${body.full_name}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
