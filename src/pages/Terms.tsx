import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">الشروط والأحكام</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">إخلاء المسؤولية</h2>
          <p className="text-gray-600 dark:text-gray-300">
            نحن لسنا مسؤولين عن أي انتهاك لحقوق النشر قد يحدث من قبل المستخدمين.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">سياسة الاستخدام العادل</h2>
          <p className="text-gray-600 dark:text-gray-300">
            يجب استخدام الموقع لأغراض شخصية فقط ووفقًا لقوانين حقوق النشر.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">التغييرات على الشروط</h2>
          <p className="text-gray-600 dark:text-gray-300">
            نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
