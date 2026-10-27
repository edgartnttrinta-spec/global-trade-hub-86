# Supabase — Global Trade & Services

## Project
- Supabase project: `global-trade-services`
- Project ref: `mflvcffxgzystwqkloxk`
- Region: `sa-east-1` (São Paulo)
- API URL: `https://mflvcffxgzystwqkloxk.supabase.co`
- Publishable browser key is configured through `VITE_SUPABASE_PUBLISHABLE_KEY`; do not commit real credentials.

## Local setup
1. Copy `.env.example` to `.env.local`.
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` using the project's public API settings.
3. Install dependencies and run the usual Vite development command.
4. Configure the same two public variables in the deployment environment.

## Data model
- `admin_users`: admin membership linked to Supabase Auth users.
- `contact_messages`: contact form submissions.
- `quote_requests`: quote requests and references.
- `products`: catalogue records. New records are unpublished by default.
- Private Storage bucket `quote-attachments`: PDF/images/Office documents, max 10 MiB per file.

## Security
- RLS is enabled on all public tables.
- Anonymous visitors may insert contact/quote submissions but cannot read submissions.
- Only users whose Auth UUID is added to `public.admin_users` can read/manage requests, products and private attachments.
- Public product reads are limited to `is_published = true`.
- Never place the Supabase service-role/secret key in frontend code, `VITE_*` variables or Git.
- There is intentionally no public sign-up/admin bootstrap endpoint. Create the first admin user through Supabase Auth, then add that exact Auth UUID to `public.admin_users` through the trusted Supabase SQL editor.

## Migration
The initial schema is tracked at `supabase/migrations/20261027195937_initial_global_trade_schema.sql` and has been applied to the connected Supabase project. Review and test future migrations before applying them to production.

## Current scope / not yet completed
- Public quote form persistence is being connected in the website code.
- Contact form persistence, admin UI, outbound email provider, rate limiting and production file-upload workflow remain follow-up tasks.
- Database writes do not by themselves send email notifications.


## Configure the first administrator
1. In the Supabase Dashboard, open Authentication and create the intended administrator account.
2. Confirm the account email as required by the project's Auth settings.
3. Copy that account's exact Auth user UUID.
4. In the SQL Editor, run the following statement after replacing the UUID with the real Auth user UUID:

```sql
insert into public.admin_users (user_id)
values ('REPLACE-WITH-AUTH-USER-UUID'::uuid)
on conflict (user_id) do nothing;
```

Do not insert a guessed UUID or expose admin access through public sign-up. The admin table intentionally has no public insert policy.
