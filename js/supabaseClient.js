/*
 * supabaseClient.js
 * هذا الملف يهيئ اتصال Supabase. تحتاج إلى استبدال القيم أدناه بمفاتيح مشروعك الفعلية.
 * يمكنك العثور على Project URL و anon key في لوحة إعدادات مشروعك ضمن Supabase → Settings → API.
 */

const SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR-ANON-PUBLIC-KEY';

// إنشاء عميل Supabase عالمي
window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
