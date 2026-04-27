"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import nodemailer from "nodemailer";
import { renderTemplate } from "./email_templates";

const MOTIVATIONAL_QUOTES = [
  '"The wound is the place where the Light enters you." — Rumi',
  '"Healing takes courage, and we all have courage, even if we have to dig a little to find it." — Tori Amos',
  '"The only journey is the journey within." — Rainer Maria Rilke',
  '"Mental health is not a destination, but a process. It’s about how you drive, not where you’re going." — Noam Shpancer',
  '"Self-care is how you take your power back." — Lalah Delia',
  '"What lies behind us and what lies before us are tiny matters compared to what lies within us." — Ralph Waldo Emerson',
  '"The curious paradox is that when I accept myself just as I am, then I can change." — Carl Rogers',
  '"Out of your vulnerabilities will come your strength." — Sigmund Freud',
  '"Your present circumstances don\'t determine where you can go; they merely determine where you start." — Nido Qubein',
];

const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    pool: true,
  });
};

export const processQueue = internalAction({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    const pendingEmails = await ctx.runQuery(internal.emails.getPendingEmails, {
      limit,
    });

    if (pendingEmails.length === 0) return;

    const transporter = getTransporter();

    for (const email of pendingEmails) {
      try {
        // Mark as sending
        await ctx.runMutation(internal.emails.updateEmailStatus, {
          id: email._id,
          status: "sending",
        });

        const templateData = { ...email.templateData };
        if (email.templateName === "contact_received" && !templateData.quote) {
          const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
          templateData.quote = MOTIVATIONAL_QUOTES[randomIndex];
        }

        const html = renderTemplate(email.templateName, templateData);

        await transporter.sendMail({
          from: `"${process.env.EMAIL_FROM}" <${process.env.EMAIL_USER}>`,
          to: email.recipient,
          subject: email.subject,
          html,
        });

        // Mark as sent
        await ctx.runMutation(internal.emails.updateEmailStatus, {
          id: email._id,
          status: "sent",
          sentAt: Date.now(),
        });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error(`Failed to send email to ${email.recipient}:`, error);

        // Update status to failed
        const retryIncrement = email.retries < 3;
        await ctx.runMutation(internal.emails.updateEmailStatus, {
          id: email._id,
          status: retryIncrement ? "pending" : "failed",
          error: errorMessage,
          retryIncrement,
        });
      }
    }
  },
});
