create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  unit text not null,
  price numeric(10,2) not null default 0,
  image_url text not null,
  in_stock boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_type text not null check (booking_type in ('room', 'camp', 'bbq')),
  guest_name text not null,
  email text not null,
  phone text,
  check_in date,
  check_out date,
  guests integer not null default 1,
  accommodation text,
  time_slot text,
  total numeric(10,2) not null default 0,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  special_requests text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text,
  total_amount numeric(10,2) not null default 0,
  items_count integer not null default 0,
  status text not null default 'processing' check (status in ('processing', 'paid', 'cancelled', 'fulfilled')),
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null default 1,
  unit_price numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.bookings enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Public can read products"
on public.products
for select
using (true);

create policy "Admins can manage products"
on public.products
for all
using (
  exists (
    select 1 from public.admin_users admin
    where admin.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.admin_users admin
    where admin.user_id = auth.uid()
  )
);

create policy "Admins can manage bookings"
on public.bookings
for all
using (
  exists (
    select 1 from public.admin_users admin
    where admin.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.admin_users admin
    where admin.user_id = auth.uid()
  )
);

create policy "Admins can manage orders"
on public.orders
for all
using (
  exists (
    select 1 from public.admin_users admin
    where admin.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.admin_users admin
    where admin.user_id = auth.uid()
  )
);

create policy "Admins can manage order items"
on public.order_items
for all
using (
  exists (
    select 1 from public.admin_users admin
    where admin.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.admin_users admin
    where admin.user_id = auth.uid()
  )
);

create policy "Admins can read their profile"
on public.admin_users
for select
using (user_id = auth.uid());
