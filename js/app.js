/*
 * app.js
 * هذا الملف يحمّل المنتجات من قاعدة بيانات Supabase ويعرضها في الصفحة.
 * كما يتيح للزائر تقديم طلب شراء بسيط بالاختيار من المنتجات المتاحة.
 */

// عندما يجهز المستند، حمّل المنتجات
document.addEventListener('DOMContentLoaded', async () => {
  await loadProducts();
});

async function loadProducts() {
  try {
    // جلب المنتجات النشطة من جدول products
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true);
    if (error) throw error;
    // عرض المنتجات في الصفحة
    const container = document.getElementById('products');
    const select = document.getElementById('productSelect');
    container.innerHTML = '';
    select.innerHTML = '<option value="" disabled selected>اختر المنتج</option>';
    products.forEach((prod) => {
      // إنشاء بطاقة المنتج
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <h3>${prod.name}</h3>
        <p>${prod.description || ''}</p>
        <p>السعر: ${prod.price} ريال</p>
        <p>المتوفر: ${prod.stock}</p>
      `;
      container.appendChild(div);
      // إضافة المنتج إلى القائمة المنسدلة
      const option = document.createElement('option');
      option.value = prod.id;
      option.textContent = `${prod.name} - ${prod.price} ريال`;
      select.appendChild(option);
    });
  } catch (err) {
    console.error('فشل جلب المنتجات:', err);
  }
}

// معالِج إرسال نموذج الطلب
const form = document.getElementById('order-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const productId = form.querySelector('#productSelect').value;
  const qty = parseInt(form.querySelector('#productQty').value, 10);
  const name = form.querySelector('#customerName').value;
  const phone = form.querySelector('#customerPhone').value;
  try {
    const { error } = await supabase.from('order_requests').insert({
      product_id: productId || null,
      qty,
      customer_name: name,
      customer_phone: phone,
    });
    if (error) throw error;
    alert('تم إرسال الطلب بنجاح!');
    form.reset();
    // أعد تحميل المنتجات للتأكد من تراجع المخزون
    await loadProducts();
  } catch (err) {
    console.error('فشل إرسال الطلب:', err);
    alert('حدث خطأ أثناء إرسال الطلب');
  }
});
