import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

function getSingleValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function isSafeRedirectPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const formType = getSingleValue(formData.get("formType")) || "formulier";
  const redirectToRaw = getSingleValue(formData.get("redirectTo"));
  const redirectBase = isSafeRedirectPath(redirectToRaw) ? redirectToRaw : "/contact";
  const redirect = (status: string) => NextResponse.redirect(new URL(`${redirectBase}?status=${status}`, request.url), 303);

  const entries = Array.from(formData.entries())
    .map(([key, value]) => [key, getSingleValue(value)] as const)
    .filter(([key]) => key !== "formType" && key !== "redirectTo");

  const nonEmptyEntries = entries.filter(([, value]) => value.length > 0);

  if (nonEmptyEntries.length === 0) {
    return redirect("missing");
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_FORM_TO || "info@dutchgoose.nl";
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !from) {
    return redirect("config-error");
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    const email = getSingleValue(formData.get("email"));
    const messageLines = nonEmptyEntries.map(([key, value]) => `${key}: ${value}`).join("\n");

    await transporter.sendMail({
      from,
      to,
      replyTo: email || undefined,
      subject: `Nieuw ${formType} formulier (${redirectBase})`,
      text: `Formulier: ${formType}\nPagina: ${redirectBase}\n\n${messageLines}`
    });

    return redirect("success");
  } catch {
    return redirect("send-error");
  }
}
