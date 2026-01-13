# Supabase Setup Guide for Sawbhavi POS

Follow these steps to set up your cloud database.

## 1. Create a Supabase Project
1.  Go to [https://supabase.com](https://supabase.com) and sign in.
2.  Click **"New Project"**.
3.  Choose your organization and enter a name (e.g., `Sawbhavi POS`).
4.  Set a strong database password (save this!).
5.  Select a region close to you (e.g., **Singapore** or **Mumbai**).
6.  Click **"Create new project"**.

## 2. Get API Keys
1.  Once the project is created, go to **Project Settings** (Cog icon at the bottom left) -> **API**.
2.  Copy the **Project URL**.
3.  Copy the **anon public** key.
4.  You will need these for your environment variables.

## 3. Create Database Tables (SQL)
Go to the **SQL Editor** (icon on the left sidebar) and click **"New query"**. Copy and paste the following SQL code and run it to create your database structure.

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PRODUCTS TABLE
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  store_id text default 'main',
  name text not null,
  sku text,
  category text,
  price numeric not null,
  cost numeric default 0,
  stock numeric default 0,
  image_url text,
  barcode text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) but allow public access for now (Simplifies POS usage)
alter table public.products enable row level security;
create policy "Allow all access" on public.products for all using (true) with check (true);

-- 2. SALES TABLE
create table public.sales (
  id uuid primary key default uuid_generate_v4(),
  store_id text default 'main',
  user_id text,
  subtotal numeric not null,
  tax numeric default 0,
  total numeric not null,
  profit numeric default 0,
  payment_method text default 'cash',
  items_json jsonb, -- Storing full item details as JSON for simplicity in history
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.sales enable row level security;
create policy "Allow all access" on public.sales for all using (true) with check (true);

-- 3. SETTINGS TABLE
create table public.settings (
  id text primary key, -- usually 'global'
  store_name text,
  logo_url text,
  currency text default 'LKR',
  tax_rate numeric default 0,
  theme text default 'light',
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.settings enable row level security;
create policy "Allow all access" on public.settings for all using (true) with check (true);

-- 4. STORAGE BUCKET (For Product Images)
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);

create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'product-images' );

create policy "Public Insert"
  on storage.objects for insert
  with check ( bucket_id = 'product-images' );
```

## 4. Connect Your App
1.  Create a file named `.env` in your project folder.
2.  Add your keys like this:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```
