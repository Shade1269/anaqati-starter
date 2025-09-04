-- إنشاء الجداول الأساسية لمشروع أناقتي

-- ملحق لتوليد uuid إذا لم يكن موجوداً
create extension if not exists "uuid-ossp";

-- جدول المنتجات
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  sku text unique,
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  stock integer not null default 0,
  image_url text,
  active boolean not null default true,
  created_at timestamp with time zone default now()
);

-- جدول الطلبات
create table if not exists public.order_requests (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete set null,
  qty integer not null default 1 check (qty > 0),
  customer_name text not null,
  customer_phone text not null,
  note text,
  created_at timestamp with time zone default now()
);

-- جدول المستخدمين/الملفات الشخصية
create table if not exists public.profiles (
  id uuid primary key,
  display_name text,
  role text check (role in ('admin', 'marketer', 'customer')) default 'customer',
  created_at timestamp with time zone default now()
);
