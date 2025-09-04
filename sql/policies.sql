-- تفعيل سياسات الأمان (RLS) وإضافة السياسات المناسبة للجداول

-- تفعيل RLS لكل جدول
alter table public.products enable row level security;
alter table public.order_requests enable row level security;
alter table public.profiles enable row level security;

-- سياسة: المنتجات متاحة للجميع للقراءة
create policy if not exists "products are readable by anyone"
on public.products
for select
using (true);

-- سياسة: يمكن لأي مستخدم إضافة طلب
create policy if not exists "anyone can insert order_requests"
on public.order_requests
for insert
with check (true);

-- سياسة: يمكن فقط للمستخدمين الذين لديهم دور admin قراءة الطلبات
create policy if not exists "only admins can read order_requests"
on public.order_requests
for select
using (exists (
  select 1 from public.profiles p
  where p.id = auth.uid() and p.role = 'admin'
));
