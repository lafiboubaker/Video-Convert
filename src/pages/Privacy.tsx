import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">سياسة الخصوصية</h1>
      <p className="mb-4">
        في QuickConvert، نحن نولي خصوصيتك أهمية كبيرة. إليك ما يجب أن تعرفه:
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">ما لا نجمعه</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>لا نجمع أي بيانات شخصية</li>
        <li>لا نستخدم ملفات تعريف الارتباط (cookies)</li>
        <li>لا نطلب تسجيل دخول</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">حماية البيانات</h2>
      <p className="mb-4">
        جميع التحويلات تتم بشكل آمن وفوري، ولا يتم تخزين أي بيانات على خوادمنا.
      </p>
    </div>
  );
};

export default Privacy;
