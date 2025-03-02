import { Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "./Header";

// Footer component with updated styling and language support
const Footer = () => {
  const { language, textAlign, direction } = useLanguage();
  
  // Translations for the footer
  const footerTranslations = {
    home: language === "en" ? "Quick Links" : 
           language === "fr" ? "Liens rapides" : 
           language === "ar" ? "روابط سريعة" : 
           language === "pt" ? "Links rápidos" :
           language === "es" ? "Enlaces rápidos" :
           language === "de" ? "Schnellzugriffe" :
           language === "it" ? "Collegamenti rapidi" :
           language === "ru" ? "Быстрые ссылки" :
           language === "zh" ? "快速链接" :
           language === "ja" ? "クイックリンク" :
           "Quick Links",
    about: language === "en" ? "About Us" : 
           language === "fr" ? "À propos" : 
           language === "ar" ? "من نحن" : 
           language === "pt" ? "Sobre nós" :
           language === "es" ? "Sobre nosotros" :
           language === "de" ? "Über uns" :
           language === "it" ? "Chi siamo" :
           language === "ru" ? "О нас" :
           language === "zh" ? "关于我们" :
           language === "ja" ? "私たちについて" :
           "About Us",
    privacy: language === "en" ? "Privacy Policy" : 
             language === "fr" ? "Politique de confidentialité" : 
             language === "ar" ? "سياسة الخصوصية" : 
             language === "pt" ? "Política de privacidade" :
             language === "es" ? "Política de privacidad" :
             language === "de" ? "Datenschutzrichtlinie" :
             language === "it" ? "Informativa sulla privacy" :
             language === "ru" ? "Политика конфиденциальности" :
             language === "zh" ? "隐私政策" :
             language === "ja" ? "プライバシーポリシー" :
             "Privacy Policy",
    faq: language === "en" ? "FAQ" : 
         language === "fr" ? "FAQ" : 
         language === "ar" ? "الأسئلة الشائعة" : 
         language === "pt" ? "Perguntas frequentes" :
         language === "es" ? "Preguntas frecuentes" :
         language === "de" ? "FAQ" :
         language === "it" ? "Domande frequenti" :
         language === "ru" ? "Часто задаваемые вопросы" :
         language === "zh" ? "常见问题" :
         language === "ja" ? "よくある質問" :
         "FAQ",
    terms: language === "en" ? "Terms & Conditions" : 
           language === "fr" ? "Conditions d'utilisation" : 
           language === "ar" ? "الشروط والأحكام" : 
           language === "pt" ? "Termos e condições" :
           language === "es" ? "Términos y condiciones" :
           language === "de" ? "Nutzungsbedingungen" :
           language === "it" ? "Termini e condizioni" :
           language === "ru" ? "Условия использования" :
           language === "zh" ? "条款和条件" :
           language === "ja" ? "利用規約" :
           "Terms & Conditions",
    rights: language === "en" ? "All rights reserved" : 
            language === "fr" ? "Tous droits réservés" : 
            language === "ar" ? "جميع الحقوق محفوظة" : 
            language === "pt" ? "Todos os direitos reservados" :
            language === "es" ? "Todos los derechos reservados" :
            language === "de" ? "Alle Rechte vorbehalten" :
            language === "it" ? "Tutti i diritti riservati" :
            language === "ru" ? "Все права защищены" :
            language === "zh" ? "版权所有" :
            language === "ja" ? "全著作権所有" :
            "All rights reserved"
  };

  return (
    <div 
      className="w-full py-6 px-4 md:px-6 border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
      style={{ direction }}
    >
      <div className="flex flex-col items-center">
        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <Link 
            to="/about"
            className="text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-300"
          >
            {footerTranslations.about}
          </Link>
          <Link 
            to="/privacy"
            className="text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-300"
          >
            {footerTranslations.privacy}
          </Link>
          <Link 
            to="/faq"
            className="text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-300"
          >
            {footerTranslations.faq}
          </Link>
          <Link 
            to="/terms"
            className="text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-300"
          >
            {footerTranslations.terms}
          </Link>
        </div>
        {/* Copyright */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} QuickConvert. {footerTranslations.rights}
        </p>
      </div>
    </div>
  );
};

export default Footer;
