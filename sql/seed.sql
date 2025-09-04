-- بيانات أولية لتعبئة جدول المنتجات
insert into public.products (sku, name, description, price, stock, image_url) values
  ('DRES-0001', 'فستان تراثي شامي', 'تطريز يدوي أنيق', 199.00, 12, null),
  ('ABAY-0002', 'عباية مخملية', 'تفاصيل ناعمة ولمسة فاخرة', 249.00, 7, null),
  ('SET-0003', 'طقم عملي يومي', 'مناسب للاستخدام اليومي', 149.00, 20, null)
on conflict (sku) do nothing;
