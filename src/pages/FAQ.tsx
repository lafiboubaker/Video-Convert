import React from 'react';

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">الأسئلة الشائعة</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">ما هي المنصات المدعومة؟</h2>
          <p className="text-gray-600 dark:text-gray-300">
            ندعم تحويل الفيديوهات من YouTube, Facebook, TikTok, Instagram وغيرها من المنصات الشهيرة.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">هل هناك حد لعدد التحويلات؟</h2>
          <p className="text-gray-600 dark:text-gray-300">
            لا يوجد حد لعدد التحويلات، يمكنك استخدام الموقع بحرية.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">هل التحويلات آمنة؟</h2>
          <p className="text-gray-600 dark:text-gray-300">
            نعم، جميع التحويلات تتم بشكل آمن ولا يتم تخزين أي بيانات على خوادمنا.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
