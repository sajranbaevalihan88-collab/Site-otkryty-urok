import { useState, useEffect, useCallback } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Monitor, 
  Smartphone, 
  Cloud, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  Database,
  CheckCircle,
  XCircle,
  Award,
  Sparkles,
  Cpu,
  Lock,
  MessageSquare,
  Video,
  FileText,
  TrendingUp,
  RefreshCw,
  Play,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

// Types
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Quiz Data
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Что такое цифровая платформа?",
    options: [
      "Только социальные сети",
      "Инфраструктура для взаимодействия пользователей, создания и обмена контентом",
      "Компьютерная программа для работы с документами",
      "Мобильное приложение для игр"
    ],
    correctAnswer: 1,
    explanation: "Цифровая платформа — это комплексная инфраструктура, которая объединяет пользователей и позволяет им взаимодействовать, создавать и обмениваться контентом."
  },
  {
    id: 2,
    question: "Какой из перечисленных НЕ является типом цифровой платформы?",
    options: [
      "Социальные сети",
      "Облачные сервисы",
      "Операционная система компьютера",
      "Платформы для электронной коммерции"
    ],
    correctAnswer: 2,
    explanation: "Операционная система — это системное программное обеспечение, а не цифровая платформа для взаимодействия пользователей."
  },
  {
    id: 3,
    question: "Какое преимущество даёт использование облачных платформ?",
    options: [
      "Доступ к файлам только с одного устройства",
      "Хранение данных на локальном диске",
      "Доступ к данным из любой точки мира с любого устройства",
      "Увеличение веса устройства"
    ],
    correctAnswer: 2,
    explanation: "Облачные платформы позволяют хранить данные удалённо и получать к ним доступ из любой точки мира с любого устройства с интернетом."
  },
  {
    id: 4,
    question: "Что важно соблюдать при работе с цифровыми платформами?",
    options: [
      "Использовать один пароль для всех платформ",
      "Публиковать личную информацию открыто",
      "Соблюдать цифровую этику и правила безопасности",
      "Игнорировать настройки приватности"
    ],
    correctAnswer: 2,
    explanation: "При работе с цифровыми платформами важно соблюдать цифровую этику, защищать личные данные и следовать правилам безопасности."
  },
  {
    id: 5,
    question: "Какая платформа относится к категории образовательных?",
    options: [
      "Instagram",
      "Coursera",
      "Amazon",
      "TikTok"
    ],
    correctAnswer: 1,
    explanation: "Coursera — это образовательная платформа, предлагающая онлайн-курсы от ведущих университетов и компаний."
  },
  {
    id: 6,
    question: "Что такое двухфакторная аутентификация (2FA)?",
    options: [
      "Вход по паролю и логину",
      "Дополнительный уровень защиты с кодом подтверждения",
      "Использование двух разных паролей",
      "Автоматический вход в систему"
    ],
    correctAnswer: 1,
    explanation: "Двухфакторная аутентификация — это метод защиты аккаунта, требующий два разных способа подтверждения личности (например, пароль + код из SMS)."
  },
  {
    id: 7,
    question: "Какая платформа является крупнейшей в мире по количеству пользователей?",
    options: [
      "Instagram",
      "Facebook (Meta)",
      "Twitter",
      "LinkedIn"
    ],
    correctAnswer: 1,
    explanation: "Facebook (Meta) имеет более 3 миллиардов пользователей по всему миру, что делает её крупнейшей социальной платформой."
  },
  {
    id: 8,
    question: "Что такое API в контексте цифровых платформ?",
    options: [
      "Тип компьютерного вируса",
      "Интерфейс для взаимодействия различных программ и сервисов",
      "Название социальной сети",
      "Протокол безопасности"
    ],
    correctAnswer: 1,
    explanation: "API (Application Programming Interface) — это набор правил и протоколов, позволяющий различным программам обмениваться данными и взаимодействовать друг с другом."
  },
  {
    id: 9,
    question: "Какой сервис НЕ является облачным хранилищем?",
    options: [
      "Google Drive",
      "Dropbox",
      "Microsoft Word",
      "iCloud"
    ],
    correctAnswer: 2,
    explanation: "Microsoft Word — это текстовый редактор, а не облачное хранилище. Хотя он может работать с облаком OneDrive, сам по себе не является хранилищем."
  },
  {
    id: 10,
    question: "Что такое фишинг в интернете?",
    options: [
      "Рыбалка в онлайн-играх",
      "Мошенническая попытка получить личные данные пользователя",
      "Вид компьютерного вируса",
      "Способ защиты аккаунта"
    ],
    correctAnswer: 1,
    explanation: "Фишинг — это вид интернет-мошенничества, при котором злоумышленники пытаются получить конфиденциальные данные пользователей под видом доверенных источников."
  },
  {
    id: 11,
    question: "Какое расширение файла обычно используется для видео?",
    options: [
      ".jpg",
      ".mp4",
      ".pdf",
      ".txt"
    ],
    correctAnswer: 1,
    explanation: ".mp4 — это один из самых популярных форматов видеофайлов, широко поддерживаемый цифровыми платформами."
  },
  {
    id: 12,
    question: "Что означает термин 'цифровой след'?",
    options: [
      "След от пальцев на экране",
      "Информация о действиях пользователя в интернете",
      "Вирус на компьютере",
      "История покупок в магазине"
    ],
    correctAnswer: 1,
    explanation: "Цифровой след — это данные, которые пользователь оставляет при использовании интернета: посещённые сайты, поисковые запросы, покупки и т.д."
  },
  {
    id: 13,
    question: "Какая платформа специализируется на профессиональных связях и поиске работы?",
    options: [
      "TikTok",
      "LinkedIn",
      "Snapchat",
      "Pinterest"
    ],
    correctAnswer: 1,
    explanation: "LinkedIn — это профессиональная социальная сеть, предназначенная для деловых контактов, поиска работы и развития карьеры."
  },
  {
    id: 14,
    question: "Что такое cookies (куки) на веб-сайтах?",
    options: [
      "Вредоносные программы",
      "Маленькие текстовые файлы для сохранения данных пользователя",
      "Игры в браузере",
      "Вид рекламы"
    ],
    correctAnswer: 1,
    explanation: "Cookies — это небольшие текстовые файлы, которые веб-сайты сохраняют на устройстве пользователя для запоминания настроек и предпочтений."
  },
  {
    id: 15,
    question: "Какой протокол обеспечивает безопасное соединение с веб-сайтом?",
    options: [
      "HTTP",
      "FTP",
      "HTTPS",
      "SMTP"
    ],
    correctAnswer: 2,
    explanation: "HTTPS (HyperText Transfer Protocol Secure) — это защищённая версия HTTP, которая шифрует данные между браузером и сервером."
  }
];

// Particle Background Component
const ParticleBackground = () => {
  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${10 + Math.random() * 15}s`,
    size: `${2 + Math.random() * 6}px`,
    isGlow: i % 5 === 0
  }));

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`particle ${p.isGlow ? 'particle-glow' : ''}`}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
};

// Main App Component
function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>(new Array(quizQuestions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [animationClass, setAnimationClass] = useState('animate-scale-in');

  const totalSlides = 8; // 7 content slides + 1 quiz slide

  const handleNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setAnimationClass('animate-slide-in-right');
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const handlePrev = useCallback(() => {
    if (currentSlide > 0) {
      setAnimationClass('animate-slide-in-left');
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setQuizAnswers(new Array(quizQuestions.length).fill(-1));
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const calculateScore = () => {
    return quizAnswers.reduce((score, answer, index) => {
      return answer === quizQuestions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Slide Components
  const TitleSlide = () => (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="relative mb-8 z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-yellow-500/30 blur-3xl rounded-full animate-glow-pulse" />
        <div className="relative animate-float">
          <div className="relative">
            <Monitor className="w-32 h-32 text-blue-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" strokeWidth={1.5} />
            <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full animate-pulse" />
          </div>
          <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-yellow-400 animate-sparkle" />
          <div className="absolute -bottom-2 -left-4 w-8 h-8 bg-purple-400 rounded-full animate-bounce opacity-60" />
        </div>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text-animated animate-slide-in-up z-10">
        Работа с современными<br />цифровыми платформами
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl animate-slide-in-up z-10" style={{ animationDelay: '0.2s' }}>
        Открытый урок по информационным технологиям
      </p>
      
      <div className="flex gap-4 animate-slide-in-up z-10" style={{ animationDelay: '0.4s' }}>
        <Button 
          size="lg" 
          onClick={handleNext}
          className="btn-glow bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white px-10 py-7 text-lg rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.4)]"
        >
          <Play className="w-6 h-6 mr-3" />
          Начать презентацию
        </Button>
      </div>
      
      {/* Floating badges */}
      <div className="absolute top-1/4 right-10 glass px-4 py-2 rounded-full animate-float-slow hidden lg:flex items-center gap-2">
        <Zap className="w-4 h-4 text-yellow-400" />
        <span className="text-sm text-gray-300">Интерактивно</span>
      </div>
      <div className="absolute bottom-1/3 left-10 glass px-4 py-2 rounded-full animate-float hidden lg:flex items-center gap-2" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="w-4 h-4 text-purple-400" />
        <span className="text-sm text-gray-300">15 вопросов</span>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm z-10">
        Нажмите пробел или → для продолжения
      </div>
    </div>
  );

  const WhatIsPlatformSlide = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
      <div className="max-w-6xl w-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="icon-container">
            <Globe className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">Что такое цифровая платформа?</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Card className="glass card-hover gradient-border">
              <CardContent className="p-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  <span className="text-blue-400 font-semibold">Цифровая платформа</span> — это комплексная 
                  инфраструктура, которая объединяет пользователей и позволяет им взаимодействовать, 
                  создавать и обмениваться контентом, а также использовать различные сервисы.
                </p>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="glass card-hover">
                <CardContent className="p-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300">Объединение людей</span>
                </CardContent>
              </Card>
              <Card className="glass card-hover">
                <CardContent className="p-4 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Коммуникация</span>
                </CardContent>
              </Card>
              <Card className="glass card-hover">
                <CardContent className="p-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-yellow-400" />
                  <span className="text-gray-300">Обмен контентом</span>
                </CardContent>
              </Card>
              <Card className="glass card-hover">
                <CardContent className="p-4 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-orange-400" />
                  <span className="text-gray-300">Доступ к сервисам</span>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
            <div className="relative grid grid-cols-2 gap-4">
              <Card className="glass card-hover animate-float" style={{ animationDelay: '0s' }}>
                <CardContent className="p-6 text-center">
                  <Smartphone className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-300">Мобильный доступ</p>
                </CardContent>
              </Card>
              <Card className="glass card-hover animate-float" style={{ animationDelay: '0.5s' }}>
                <CardContent className="p-6 text-center">
                  <Cloud className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <p className="text-gray-300">Облачное хранение</p>
                </CardContent>
              </Card>
              <Card className="glass card-hover animate-float" style={{ animationDelay: '1s' }}>
                <CardContent className="p-6 text-center">
                  <Video className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="text-gray-300">Видеоконференции</p>
                </CardContent>
              </Card>
              <Card className="glass card-hover animate-float" style={{ animationDelay: '1.5s' }}>
                <CardContent className="p-6 text-center">
                  <Database className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <p className="text-gray-300">Большие данные</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TypesSlide = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-12 text-center">
          Виды цифровых платформ
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass card-hover gradient-border group">
            <CardContent className="p-6">
              <div className="icon-container mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Социальные сети</h3>
              <p className="text-gray-400 mb-4">Платформы для общения и обмена контентом</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">VK</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Telegram</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Instagram</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass card-hover gradient-border group">
            <CardContent className="p-6">
              <div className="icon-container mb-4 group-hover:scale-110 transition-transform">
                <Cloud className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Облачные сервисы</h3>
              <p className="text-gray-400 mb-4">Хранение и обработка данных в облаке</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Google Drive</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Yandex Disk</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">OneDrive</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass card-hover gradient-border group">
            <CardContent className="p-6">
              <div className="icon-container mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">E-commerce</h3>
              <p className="text-gray-400 mb-4">Платформы для онлайн-торговли</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Wildberries</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Ozon</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Amazon</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass card-hover gradient-border group">
            <CardContent className="p-6">
              <div className="icon-container mb-4 group-hover:scale-110 transition-transform">
                <Monitor className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Образовательные</h3>
              <p className="text-gray-400 mb-4">Платформы для онлайн-обучения</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Coursera</span>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Stepik</span>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">YouTube</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass card-hover gradient-border group">
            <CardContent className="p-6">
              <div className="icon-container mb-4 group-hover:scale-110 transition-transform">
                <Video className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Стриминговые</h3>
              <p className="text-gray-400 mb-4">Платформы для просмотра видео и прослушивания музыки</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">YouTube</span>
                <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">Twitch</span>
                <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">Spotify</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass card-hover gradient-border group">
            <CardContent className="p-6">
              <div className="icon-container mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Профессиональные</h3>
              <p className="text-gray-400 mb-4">Платформы для работы и бизнеса</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">LinkedIn</span>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Trello</span>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Notion</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const BenefitsSlide = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-12 text-center">
          Преимущества цифровых платформ
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass rounded-2xl p-6 card-hover text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/30 flex items-center justify-center animate-pulse-glow">
              <Zap className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Скорость</h3>
            <p className="text-gray-400">Мгновенный доступ к информации и сервисам из любой точки мира</p>
          </div>
          
          <div className="glass rounded-2xl p-6 card-hover text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-600/30 flex items-center justify-center animate-pulse-glow" style={{ animationDelay: '0.5s' }}>
              <Users className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Связь</h3>
            <p className="text-gray-400">Общение с людьми по всему миру в режиме реального времени</p>
          </div>
          
          <div className="glass rounded-2xl p-6 card-hover text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/30 to-green-600/30 flex items-center justify-center animate-pulse-glow" style={{ animationDelay: '1s' }}>
              <RefreshCw className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Актуальность</h3>
            <p className="text-gray-400">Постоянное обновление контента и функциональности</p>
          </div>
          
          <div className="glass rounded-2xl p-6 card-hover text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-500/30 to-yellow-600/30 flex items-center justify-center animate-pulse-glow" style={{ animationDelay: '1.5s' }}>
              <Database className="w-10 h-10 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ресурсы</h3>
            <p className="text-gray-400">Доступ к огромному количеству образовательных материалов</p>
          </div>
        </div>
        
        <div className="mt-12 glass rounded-2xl p-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Рост продуктивности</h3>
              <p className="text-gray-400 text-lg">
                Исследования показывают, что использование цифровых платформ повышает продуктивность работы 
                на <span className="text-green-400 font-bold">40%</span> и сокращает время на поиск информации 
                на <span className="text-green-400 font-bold">60%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PopularPlatformsSlide = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-12 text-center">
          Популярные платформы
        </h2>
        
        <div className="space-y-6">
          <Card className="glass card-hover">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">VK</h3>
                  <p className="text-gray-400">Крупнейшая российская социальная сеть с возможностями музыки, видео, игр и образовательного контента</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-400">80M+</p>
                  <p className="text-gray-500">пользователей</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass card-hover">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Cloud className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Telegram</h3>
                  <p className="text-gray-400">Быстрый и безопасный мессенджер с каналами, ботами и возможностью создания сообществ</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-sky-400">700M+</p>
                  <p className="text-gray-500">пользователей</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass card-hover">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center flex-shrink-0">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">YouTube</h3>
                  <p className="text-gray-400">Крупнейшая видеоплатформа с образовательным контентом, развлечениями и новостями</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-red-400">2B+</p>
                  <p className="text-gray-500">пользователей</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass card-hover">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Discord</h3>
                  <p className="text-gray-400">Платформа для общения голосом, видео и текстом, популярная среди игровых и образовательных сообществ</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-purple-400">150M+</p>
                  <p className="text-gray-500">пользователей</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const SecuritySlide = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-12 text-center">
          Безопасность и цифровая этика
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-400" />
              Правила безопасности
            </h3>
            <div className="space-y-4">
              <Card className="glass card-hover">
                <CardContent className="p-4 flex items-start gap-4">
                  <Lock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Сильные пароли</h4>
                    <p className="text-gray-400 text-sm">Используйте уникальные сложные пароли для каждой платформы</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass card-hover">
                <CardContent className="p-4 flex items-start gap-4">
                  <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Двухфакторная аутентификация</h4>
                    <p className="text-gray-400 text-sm">Включите 2FA для дополнительной защиты аккаунта</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass card-hover">
                <CardContent className="p-4 flex items-start gap-4">
                  <Eye className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Проверка информации</h4>
                    <p className="text-gray-400 text-sm">Проверяйте достоверность информации перед распространением</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass card-hover">
                <CardContent className="p-4 flex items-start gap-4">
                  <UserCheck className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Настройки приватности</h4>
                    <p className="text-gray-400 text-sm">Регулярно проверяйте и обновляйте настройки конфиденциальности</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-400" />
              Цифровая этика
            </h3>
            <div className="space-y-4">
              <Card className="glass card-hover">
                <CardContent className="p-4 flex items-start gap-4">
                  <MessageCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Уважительное общение</h4>
                    <p className="text-gray-400 text-sm">Относитесь к другим пользователям с уважением и толерантностью</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass card-hover">
                <CardContent className="p-4 flex items-start gap-4">
                  <Copyright className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Уважение авторских прав</h4>
                    <p className="text-gray-400 text-sm">Не нарушайте права интеллектуальной собственности</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass card-hover">
                <CardContent className="p-4 flex items-start gap-4">
                  <Scale className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Ответственность</h4>
                    <p className="text-gray-400 text-sm">Несите ответственность за свои действия в цифровом пространстве</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass card-hover">
                <CardContent className="p-4 flex items-start gap-4">
                  <Clock className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Цифровой баланс</h4>
                    <p className="text-gray-400 text-sm">Соблюдайте баланс между онлайн и офлайн активностью</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const QuizSlide = () => {
    if (showResults) {
      const score = calculateScore();
      const percentage = (score / quizQuestions.length) * 100;
      
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8">
              <Award className={`w-24 h-24 mx-auto ${percentage >= 80 ? 'text-yellow-400' : percentage >= 60 ? 'text-blue-400' : 'text-gray-400'}`} />
            </div>
            
            <h2 className="text-4xl font-bold gradient-text mb-4">Результаты теста</h2>
            
            <div className="glass rounded-2xl p-8 mb-8">
              <p className="text-6xl font-bold mb-2">
                <span className={percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-blue-400' : 'text-orange-400'}>
                  {score}
                </span>
                <span className="text-gray-500">/{quizQuestions.length}</span>
              </p>
              <p className="text-xl text-gray-400 mb-4">
                {percentage >= 80 ? 'Отличный результат!' : percentage >= 60 ? 'Хороший результат!' : 'Есть над чем поработать'}
              </p>
              <Progress value={percentage} className="h-3" />
            </div>
            
            <div className="space-y-4 mb-8">
              {quizQuestions.map((q, idx) => (
                <Card key={q.id} className={`glass ${quizAnswers[idx] === q.correctAnswer ? 'border-green-500/50' : 'border-red-500/50'}`}>
                  <CardContent className="p-4 text-left">
                    <div className="flex items-start gap-3">
                      {quizAnswers[idx] === q.correctAnswer ? (
                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-white font-medium mb-1">{q.question}</p>
                        <p className="text-gray-400 text-sm">{q.explanation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button 
              size="lg" 
              onClick={resetQuiz}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Пройти тест снова
            </Button>
          </div>
        </div>
      );
    }

    const question = quizQuestions[currentQuestion];
    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
        <div className="max-w-3xl w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold gradient-text">Проверка знаний</h2>
            <span className="text-gray-400">Вопрос {currentQuestion + 1} из {quizQuestions.length}</span>
          </div>
          
          <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2 mb-8" />
          
          <Card className="glass mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">{question.question}</h3>
              
              <div className="space-y-3">
                {question.options.map((option, idx) => (
                  <div
                    key={idx}
                    className={`quiz-option ${quizAnswers[currentQuestion] === idx ? 'selected' : ''}`}
                    onClick={() => handleQuizAnswer(idx)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        quizAnswers[currentQuestion] === idx 
                          ? 'border-blue-500 bg-blue-500/20' 
                          : 'border-gray-500'
                      }`}>
                        {quizAnswers[currentQuestion] === idx && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                      </div>
                      <span className="text-gray-300">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Назад
            </Button>
            
            <Button 
              onClick={handleNextQuestion}
              disabled={quizAnswers[currentQuestion] === -1}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Завершить' : 'Далее'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Import missing icons
  const Eye = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const UserCheck = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const Heart = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  const MessageCircle = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  const Copyright = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.354a4 4 0 00-3.5-1.354 4 4 0 00-4 4 4 4 0 004 4 4 4 0 003.5-1.354" />
    </svg>
  );

  const Scale = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  );

  const Clock = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  // Render current slide
  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return <TitleSlide />;
      case 1:
        return <WhatIsPlatformSlide />;
      case 2:
        return <TypesSlide />;
      case 3:
        return <BenefitsSlide />;
      case 4:
        return <PopularPlatformsSlide />;
      case 5:
        return <SecuritySlide />;
      case 6:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen px-8">
            <div className="text-center">
              <Sparkles className="w-24 h-24 text-yellow-400 mx-auto mb-8 animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                Готовы проверить свои знания?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl">
                Пройдите тест из 15 вопросов и узнайте, насколько хорошо вы разбираетесь в современных цифровых платформах
              </p>
              <Button 
                size="lg" 
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl btn-glow"
              >
                <Play className="w-5 h-5 mr-2" />
                Начать тест
              </Button>
            </div>
          </div>
        );
      case 7:
        return <QuizSlide />;
      default:
        return <TitleSlide />;
    }
  };

  return (
    <div className="min-h-screen gradient-hero animate-gradient relative overflow-hidden">
      <ParticleBackground />
      
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div 
          className="progress-bar" 
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>
      
      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className="glass border-gray-600 text-white hover:bg-white/10 rounded-full w-12 h-12"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        <div className="glass px-4 py-2 rounded-full text-gray-300 text-sm">
          {currentSlide + 1} / {totalSlides}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={currentSlide === totalSlides - 1}
          className="glass border-gray-600 text-white hover:bg-white/10 rounded-full w-12 h-12"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
      
      {/* Slide content */}
      <div key={currentSlide} className={`${animationClass}`}>
        {renderSlide()}
      </div>
    </div>
  );
}

export default App;
