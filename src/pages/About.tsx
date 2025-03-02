import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">من نحن</h1>
      <p className="mb-4">
        QuickConvert هو موقع متخصص في تحويل الفيديوهات من مختلف المنصات إلى صيغ MP4 و MP3 بسهولة وسرعة.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">ميزاتنا</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>تحويل سريع وفعال</li>
        <li>دعم مختلف المنصات (YouTube, Facebook, TikTok, Instagram)</li>
        <li>واجهة مستخدم بسيطة وسهلة الاستخدام</li>
        <li>لا يتطلب تسجيل دخول أو بيانات شخصية</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">رؤيتنا</h2>
      <p className="mb-4">
        نهدف إلى توفير أداة بسيطة وفعالة لتحويل الفيديوهات، مع الحفاظ على خصوصية المستخدمين.
      </p>
    </div>
  );
};

export default About;
