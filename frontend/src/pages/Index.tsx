import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../components/ui/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../components/Header";
import { motion } from "framer-motion";
import VideoForm from "../components/VideoForm";
import PlatformBadge from "../components/PlatformBadge";
import { Globe } from "lucide-react";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  delay: number;
}

const StepCard = ({ number, title, description, delay }: StepCardProps) => {
  // Different colors for each step number
  const numberColors = {
    1: "bg-indigo-500 dark:bg-indigo-600 text-white",
    2: "bg-purple-500 dark:bg-purple-600 text-white",
    3: "bg-pink-500 dark:bg-pink-600 text-white"
  };
  
  return (
    <motion.div
      className="rounded-lg border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 p-7 shadow-md transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
    >
      <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-full ${numberColors[number as keyof typeof numberColors]} text-base font-bold transition-colors shadow-md`}>
        {number}
      </div>
      <h3 className="text-base font-bold">{title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default function Index() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language, direction, textAlign } = useLanguage();

  // Translations for the Index page
  const indexTranslations = {
    title: language === "en" ? "QuickConvert" :
           language === "fr" ? "QuickConvert" :
           language === "ar" ? "كويك كونفرت" :
           language === "pt" ? "QuickConvert" :
           language === "es" ? "QuickConvert" :
           language === "de" ? "QuickConvert" :
           language === "it" ? "QuickConvert" :
           language === "ru" ? "QuickConvert" :
           language === "zh" ? "快速转换" :
           language === "ja" ? "クイックコンバート" :
           "QuickConvert",
    subtitle: language === "en" ? "Convert videos from YouTube, Facebook, TikTok, Instagram and more to MP4 or MP3 format with just a few clicks." :
              language === "fr" ? "Convertissez des vidéos de YouTube, Facebook, TikTok, Instagram et plus en format MP4 ou MP3 en quelques clics." :
              language === "ar" ? "حول مقاطع الفيديو من يوتيوب وفيسبوك وتيك توك وانستجرام والمزيد إلى صيغة MP4 أو MP3 بنقرات قليلة فقط." :
              language === "pt" ? "Converta vídeos do YouTube, Facebook, TikTok, Instagram e muito mais para formato MP4 ou MP3 com apenas alguns cliques." :
              language === "es" ? "Convierte videos de YouTube, Facebook, TikTok, Instagram y más a formato MP4 o MP3 con solo unos clics." :
              language === "de" ? "Konvertieren Sie Videos von YouTube, Facebook, TikTok, Instagram und mehr in MP4- oder MP3-Format mit nur wenigen Klicks." :
              language === "it" ? "Converti video da YouTube, Facebook, TikTok, Instagram e altro in formato MP4 o MP3 con pochi clic." :
              language === "ru" ? "Преобразуйте видео с YouTube, Facebook, TikTok, Instagram и других платформ в формат MP4 или MP3 всего за несколько кликов." :
              language === "zh" ? "只需点击几下即可将 YouTube、Facebook、TikTok、Instagram 等平台的视频转换为 MP4 或 MP3 格式。" :
              language === "ja" ? "YouTube、Facebook、TikTok、Instagramなどの動画を数回のクリックでMP4またはMP3形式に変換します。" :
              "Convert videos from YouTube, Facebook, TikTok, Instagram and more to MP4 or MP3 format with just a few clicks.",
    videoUrl: language === "en" ? "Video URL" :
              language === "fr" ? "URL de la vidéo" :
              language === "ar" ? "رابط الفيديو" :
              language === "pt" ? "URL do vídeo" :
              language === "es" ? "URL del video" :
              language === "de" ? "Video-URL" :
              language === "it" ? "URL del video" :
              language === "ru" ? "URL видео" :
              language === "zh" ? "视频网址" :
              language === "ja" ? "動画URL" :
              "Video URL",
    transform: language === "en" ? "Convert Video" :
               language === "fr" ? "Convertir la Vidéo" :
               language === "ar" ? "تحويل الفيديو" :
               language === "pt" ? "Converter Vídeo" :
               language === "es" ? "Convertir Video" :
               language === "de" ? "Video konvertieren" :
               language === "it" ? "Converti Video" :
               language === "ru" ? "Конвертировать видео" :
               language === "zh" ? "转换视频" :
               language === "ja" ? "動画を変換" :
               "Convert Video",
    placeholder: language === "en" ? "https://www.youtube.com/watch?v=..." :
                 language === "fr" ? "https://www.youtube.com/watch?v=..." :
                 language === "ar" ? "https://www.youtube.com/watch?v=..." :
                 language === "pt" ? "https://www.youtube.com/watch?v=..." :
                 language === "es" ? "https://www.youtube.com/watch?v=..." :
                 language === "de" ? "https://www.youtube.com/watch?v=..." :
                 language === "it" ? "https://www.youtube.com/watch?v=..." :
                 language === "ru" ? "https://www.youtube.com/watch?v=..." :
                 language === "zh" ? "https://www.youtube.com/watch?v=..." :
                 language === "ja" ? "https://www.youtube.com/watch?v=..." :
                 "https://www.youtube.com/watch?v=...",
    error: language === "en" ? "Please enter a valid video URL" :
           language === "fr" ? "Veuillez entrer une URL vidéo valide" :
           language === "ar" ? "يرجى إدخال رابط فيديو صالح" :
           language === "pt" ? "Por favor, insira um URL de vídeo válido" :
           language === "es" ? "Por favor, introduzca una URL de vídeo válida" :
           language === "de" ? "Bitte geben Sie eine gültige Video-URL ein" :
           language === "it" ? "Inserisci un URL video valido" :
           language === "ru" ? "Пожалуйста, введите действительный URL видео" :
           language === "zh" ? "请输入有效的视频网址" :
           language === "ja" ? "有効な動画URLを入力してください" :
           "Please enter a valid video URL",
    // New translations for How It Works section
    howItWorks: language === "en" ? "How It Works" :
                language === "fr" ? "Comment Ça Marche" :
                language === "ar" ? "كيف يعمل" :
                language === "pt" ? "Como Funciona" :
                language === "es" ? "Cómo Funciona" :
                language === "de" ? "Wie Es Funktioniert" :
                language === "it" ? "Come Funziona" :
                language === "ru" ? "Как Это Работает" :
                language === "zh" ? "工作原理" :
                language === "ja" ? "使い方" :
                "How It Works",
    howItWorksDesc: language === "en" ? "Follow these simple steps to convert your videos." :
                    language === "fr" ? "Suivez ces étapes simples pour convertir vos vidéos." :
                    language === "ar" ? "اتبع هذه الخطوات البسيطة لتحويل مقاطع الفيديو الخاصة بك." :
                    language === "pt" ? "Siga estes passos simples para converter seus vídeos." :
                    language === "es" ? "Siga estos sencillos pasos para convertir sus vídeos." :
                    language === "de" ? "Folgen Sie diesen einfachen Schritten, um Ihre Videos zu konvertieren." :
                    language === "it" ? "Segui questi semplici passaggi per convertire i tuoi video." :
                    language === "ru" ? "Следуйте этим простым шагам для конвертации ваших видео." :
                    language === "zh" ? "按照以下简单步骤转换您的视频。" :
                    language === "ja" ? "動画を変換するには、次の簡単な手順に従ってください。" :
                    "Follow these simple steps to convert your videos.",
    // Step Card translations
    step1Title: language === "en" ? "Paste URL" :
                language === "fr" ? "Coller l'URL" :
                language === "ar" ? "لصق الرابط" :
                language === "pt" ? "Colar URL" :
                language === "es" ? "Pegar URL" :
                language === "de" ? "URL einfügen" :
                language === "it" ? "Incolla URL" :
                language === "ru" ? "Вставить URL" :
                language === "zh" ? "粘贴网址" :
                language === "ja" ? "URLを貼り付け" :
                "Paste URL",
    step1Desc: language === "en" ? "Paste the URL of the video you want to convert." :
               language === "fr" ? "Collez l'URL de la vidéo que vous souhaitez convertir." :
               language === "ar" ? "الصق رابط الفيديو الذي تريد تحويله." :
               language === "pt" ? "Cole o URL do vídeo que deseja converter." :
               language === "es" ? "Pegue la URL del vídeo que desea convertir." :
               language === "de" ? "Fügen Sie die URL des Videos ein, das Sie konvertieren möchten." :
               language === "it" ? "Incolla l'URL del video che desideri convertire." :
               language === "ru" ? "Вставьте URL видео, которое вы хотите конвертировать." :
               language === "zh" ? "粘贴您想要转换的视频网址。" :
               language === "ja" ? "変換したい動画のURLを貼り付けます。" :
               "Paste the URL of the video you want to convert.",
    step2Title: language === "en" ? "Select Format" :
                language === "fr" ? "Sélectionner le Format" :
                language === "ar" ? "اختر الصيغة" :
                language === "pt" ? "Selecionar Formato" :
                language === "es" ? "Seleccionar Formato" :
                language === "de" ? "Format auswählen" :
                language === "it" ? "Seleziona Formato" :
                language === "ru" ? "Выбрать формат" :
                language === "zh" ? "选择格式" :
                language === "ja" ? "フォーマットを選択" :
                "Select Format",
    step2Desc: language === "en" ? "Choose the format you want to convert the video to." :
               language === "fr" ? "Choisissez le format dans lequel vous souhaitez convertir la vidéo." :
               language === "ar" ? "اختر الصيغة التي تريد تحويل الفيديو إليها." :
               language === "pt" ? "Escolha o formato para o qual deseja converter o vídeo." :
               language === "es" ? "Elija el formato al que desea convertir el vídeo." :
               language === "de" ? "Wählen Sie das Format, in das Sie das Video konvertieren möchten." :
               language === "it" ? "Scegli il formato in cui desideri convertire il video." :
               language === "ru" ? "Выберите формат, в который вы хотите конвертировать видео." :
               language === "zh" ? "选择您想要将视频转换为的格式。" :
               language === "ja" ? "動画を変換したいフォーマットを選択します。" :
               "Choose the format you want to convert the video to.",
    step3Title: language === "en" ? "Download" :
                language === "fr" ? "Télécharger" :
                language === "ar" ? "تحميل" :
                language === "pt" ? "Baixar" :
                language === "es" ? "Descargar" :
                language === "de" ? "Herunterladen" :
                language === "it" ? "Scarica" :
                language === "ru" ? "Скачать" :
                language === "zh" ? "下载" :
                language === "ja" ? "ダウンロード" :
                "Download",
    step3Desc: language === "en" ? "Download your converted video in the selected format." :
               language === "fr" ? "Téléchargez votre vidéo convertie dans le format sélectionné." :
               language === "ar" ? "قم بتنزيل الفيديو المحول بالصيغة المحددة." :
               language === "pt" ? "Baixe seu vídeo convertido no formato selecionado." :
               language === "es" ? "Descargue su vídeo convertido en el formato seleccionado." :
               language === "de" ? "Laden Sie Ihr konvertiertes Video im ausgewählten Format herunter." :
               language === "it" ? "Scarica il tuo video convertito nel formato selezionato." :
               language === "ru" ? "Скачайте ваше конвертированное видео в выбранном формате." :
               language === "zh" ? "下载您选定格式的转换后视频。" :
               language === "ja" ? "選択したフォーマットで変換された動画をダウンロードします。" :
               "Download your converted video in the selected format.",
    // Supported Platforms translations
    supportedPlatforms: language === "en" ? "Supported Platforms" :
                        language === "fr" ? "Plateformes Prises en Charge" :
                        language === "ar" ? "Supported Platforms" :
                        language === "pt" ? "Plataformas Suportadas" :
                        language === "es" ? "Plataformas Compatibles" :
                        language === "de" ? "Unterstützte Plattformen" :
                        language === "it" ? "Piattaforme Supportate" :
                        language === "ru" ? "Поддерживаемые платформы" :
                        language === "zh" ? "支持的平台" :
                        language === "ja" ? "対応プラットフォーム" :
                        "Supported Platforms",
    supportedDesc: language === "en" ? "We support video conversion from all major platforms with high-quality results." :
                   language === "fr" ? "Nous prenons en charge la conversion vidéo de toutes les principales plateformes avec des résultats de haute qualité." :
                   language === "ar" ? "We support video conversion from all major platforms with high-quality results." :
                   language === "pt" ? "Suportamos conversão de vídeo de todas as principais plataformas com resultados de alta qualidade." :
                   language === "es" ? "Soportamos la conversión de vídeo de todas las principales plataformas con resultados de alta calidad." :
                   language === "de" ? "Wir unterstützen die Videokonvertierung von allen großen Plattformen mit hochwertigen Ergebnissen." :
                   language === "it" ? "Supportiamo la conversione video da tutte le principali piattaforme con risultati di alta qualità." :
                   language === "ru" ? "Мы поддерживаем конвертацию видео со всех основных платформ с высококачественными результатами." :
                   language === "zh" ? "我们支持从所有主要平台转换视频，并提供高质量的结果。" :
                   language === "ja" ? "すべての主要プラットフォームからの高品質な結果でビデオ変換をサポートしています。" :
                   "We support video conversion from all major platforms with high-quality results."
  };

  const handleSubmit = () => {
    // Toggle loading state only
    setIsLoading(prevState => !prevState);
    // No success message here - it will come from VideoForm component
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-indigo-900/40 to-purple-900/30 dark:from-indigo-950 dark:to-purple-950 transition-colors duration-300 relative" style={{ direction }}>
      {/* Wave background animation */}
      <div className="wave-background">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
      
      <div className="container mx-auto flex flex-1 flex-col px-4 py-8 relative z-10">
        <Header />
        
        <motion.div
          className="my-12 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <VideoForm
            title={indexTranslations.title}
            subtitle={indexTranslations.subtitle}
            transform={indexTranslations.transform}
            placeholder={indexTranslations.placeholder}
            error={indexTranslations.error}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
          
          <motion.div
            className="mt-16 w-full max-w-4xl px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-purple-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mb-4">{indexTranslations.howItWorks}</h2>
            <p className="text-xl text-indigo-700 dark:text-indigo-300 mb-10 max-w-2xl mx-auto font-semibold leading-relaxed">{indexTranslations.howItWorksDesc}</p>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <StepCard
                number={1}
                title={indexTranslations.step1Title}
                description={indexTranslations.step1Desc}
                delay={0.7}
              />
              <StepCard
                number={2}
                title={indexTranslations.step2Title}
                description={indexTranslations.step2Desc}
                delay={0.8}
              />
              <StepCard
                number={3}
                title={indexTranslations.step3Title}
                description={indexTranslations.step3Desc}
                delay={0.9}
              />
            </div>
          </motion.div>
          
          {/* Platform support */}
          <motion.div
            className="mt-24 w-full max-w-4xl px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-purple-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mb-4">{indexTranslations.supportedPlatforms}</h2>
            <p className="text-xl text-indigo-700 dark:text-indigo-300 mb-10 max-w-2xl mx-auto font-semibold leading-relaxed">{indexTranslations.supportedDesc}</p>
            <div className="flex flex-wrap justify-center gap-6">
              <PlatformBadge name="YouTube" />
              <PlatformBadge name="Facebook" />
              <PlatformBadge name="TikTok" />
              <PlatformBadge name="Instagram" />
              <PlatformBadge name="X" />
              <PlatformBadge name="Snapchat" />
              <PlatformBadge name="Vimeo" />
              <PlatformBadge name="Dailymotion" />
              <PlatformBadge name="Twitch" />
              <PlatformBadge name="Reddit" />
            </div>
          </motion.div>
        </motion.div>
        
        <Footer />
      </div>
    </div>
  );
}
