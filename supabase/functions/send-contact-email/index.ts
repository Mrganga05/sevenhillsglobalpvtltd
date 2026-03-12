import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import nodemailer from "npm:nodemailer@6.9.9";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // 5. Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 2. Accept POST JSON
    const { name, email, message } = await req.json();

    // 3. Validate inputs
    if (!name || typeof name !== "string") {
      throw new Error("Name is required.");
    }
    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error("A valid email is required.");
    }
    if (!message || typeof message !== "string") {
      throw new Error("Message is required.");
    }

    // Initialize Supabase Client with Service Role Key to bypass RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 8. Insert the message into the database
    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert([{ name, email, message }]);

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store message in the database.");
    }

    // Grab environment variables
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");

    if (!smtpUser || !smtpPass) {
      throw new Error("SMTP credentials are not configured properly.");
    }

    // 4. Use Nodemailer to send email via Titan SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 587,
      secure: false, // true for port 465, false for port 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email configuration
    const mailOptions = {
      from: `"Website Contact" <${smtpUser}>`,
      to: "info@sevenhillsglobalpvtltd.com",
      replyTo: email,
      subject: "New Contact Form Message",
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    // 6. Return standard success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    // 6. Return failure response
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An unexpected error occurred" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400, // Bad Request instead of 500 simplifies client-side error handling
      }
    );
  }
});
