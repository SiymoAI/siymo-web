export type Lang = 'en' | 'ru' | 'uz';

export type RichSegment = { t: string; ital?: boolean } | { br: true };

export type HeadlineWord = { w: string; ital?: boolean };

export type CallLine = { who: 'caller' | 'siymo'; text: string };

type PriceTier = {
  eyebrow: string;
  amount: string;
  cap: string;
  list: string[];
  cta: string;
};

export type Translation = {
  meta: { title: string };
  nav: {
    whatItDoes: string;
    howItWorks: string;
    useCases: string;
    pricing: string;
    signIn: string;
    startFree: string;
  };
  hero: {
    headline: HeadlineWord[];
    badge: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { num: string; suffix?: string; label: string }[];
  };
  call: {
    live: string;
    caller: string;
    siymo: string;
    flow: string;
    phone: string;
    lines: CallLine[];
  };
  features: {
    eyebrow: string;
    title: RichSegment[];
    lede: string;
    items: { eyebrow: string; title: RichSegment[]; body: string }[];
    cal: { head: string; booked: string };
    lora: { base: string; pods: string[] };
  };
  how: {
    eyebrow: string;
    title: RichSegment[];
    lede: string;
    steps: { title: string; body: string }[];
  };
  useCases: {
    eyebrow: string;
    title: RichSegment[];
    items: { tag: string; title: string; body: string }[];
  };
  pricing: {
    eyebrow: string;
    title: RichSegment[];
    payg: PriceTier;
    enterprise: PriceTier;
  };
  cta: {
    title: RichSegment[];
    body: string;
    primary: string;
    secondary: string;
  };
  footer: { copyright: string; privacy: string; terms: string };
  signIn: {
    phone: {
      title: RichSegment[];
      sub: string;
      countryLabel: string;
      phoneLabel: string;
      continue: string;
    };
    verify: {
      back: string;
      sms: { title: RichSegment[]; sub: string; badge: string };
      call: { title: RichSegment[]; sub: string; badge: string };
      toLabel: string;
      messageLabel: string;
      callLabel: string;
      switchToCall: string;
      switchToSms: string;
      expiresIn: string;
      attemptsLeft: string;
      expired: string;
      newCode: string;
      tooManyTries: string;
      startOver: string;
      waiting: string;
      starting: string;
      confirming: string;
      verified: string;
      tryAgain: string;
      attemptInvalid: string;
      sessionTemplate: string;
    };
    builtWith: { text: string; cta: string };
  };
  comingSoon: {
    badge: string;
    title: RichSegment[];
    body: string;
    accountLabel: string;
    phoneLabel: string;
    verifiedLabel: string;
    signOut: string;
  };
  notFound: {
    title: RichSegment[];
    body: string;
    backHome: string;
  };
  countries: Record<string, string>;
};

const en: Translation = {
  meta: { title: 'Siymo AI — every phone call, an intelligent conversation.' },
  nav: {
    whatItDoes: 'What it does',
    howItWorks: 'How it works',
    useCases: 'Use cases',
    pricing: 'Pricing',
    signIn: 'Sign in',
    startFree: 'Start free',
  },
  hero: {
    headline: [
      { w: 'Every' },
      { w: 'phone call,' },
      { w: 'intelligent.', ital: true },
    ],
    badge: 'Beta · piloting with businesses across Uzbekistan',
    sub: 'Siymo AI is a voice agent that answers your business phone like a human — in Uzbek, Russian, and English. No app for your customers. No hold music. Just conversations that actually get things done.',
    ctaPrimary: 'Start with $10 free credits',
    ctaSecondary: 'Hear a sample call',
    stats: [
      { num: '70', suffix: '%', label: 'Lower cost' },
      { num: '+30', suffix: '%', label: 'CSAT lift' },
      { num: '24/7', label: 'Always on' },
      { num: 'UZ · RU · EN', label: 'Languages' },
    ],
  },
  call: {
    live: 'LIVE',
    caller: 'CALLER',
    siymo: 'SIYMO',
    flow: 'UZ → EN → RU',
    phone: '+998 71 200-00-00',
    lines: [
      { who: 'caller', text: 'Salom, kechki ovqatga 4 kishilik joy band qilmoqchiman.' },
      { who: 'siymo', text: 'Albatta. Bugun yoki ertaga uchun bo‘lsinmi?' },
      { who: 'caller', text: 'Ertaga, soat 19:00.' },
      { who: 'siymo', text: 'Ertaga 19:00 ga 4 kishilik stol band qilindi. Ismingizni ayting.' },
      { who: 'caller', text: 'Anvar. Rahmat.' },
      { who: 'siymo', text: 'Tasdiqlandi, Anvar. SMS orqali eslatma yuboramiz.' },
    ],
  },
  features: {
    eyebrow: 'What it does',
    title: [
      { t: 'A voice agent that ' },
      { t: 'picks up, understands, and follows through.', ital: true },
    ],
    lede: 'Plugs into the phone number you already have. No app for callers, no internet on their side — if it can ring, Siymo AI can answer it.',
    items: [
      {
        eyebrow: '01 · Conversation',
        title: [
          { t: 'Natural language, on the ' },
          { t: 'first ring.', ital: true },
        ],
        body: 'Picks up instantly, understands intent, asks the right follow-up. Sounds human, behaves like your best receptionist on a calm day.',
      },
      {
        eyebrow: '02 · Languages',
        title: [{ t: 'Uzbek, Russian, ' }, { t: 'English.', ital: true }],
        body: 'Switches mid-call when your caller does. Built for Central Asian businesses, not retro-fitted from English.',
      },
      {
        eyebrow: '03 · Bookings',
        title: [
          { t: 'Reservations, handled ' },
          { t: 'end-to-end.', ital: true },
        ],
        body: 'Checks availability, confirms with the caller, writes the booking back to your system, and sends an SMS reminder — without a human in the loop.',
      },
      {
        eyebrow: '04 · Custom brain',
        title: [
          { t: 'A ' },
          { t: 'mini-model', ital: true },
          { t: ' trained on your business.' },
        ],
        body: 'LoRA fine-tuning gives every customer their own adapter on top of the base model — your menu, your prices, your scripts — without retraining from scratch. Faster, cheaper, scalable to thousands of clients.',
      },
      {
        eyebrow: '05 · Logging',
        title: [{ t: 'Every call, ' }, { t: 'written down.', ital: true }],
        body: 'Complaints, requests, and bookings flow into your CRM as structured records. Search a transcript, replay the audio, audit the resolution — no spreadsheet sweep at month-end.',
      },
    ],
    cal: { head: 'TUE · OCT 22', booked: 'A. Petrova — check-up' },
    lora: { base: 'BASE MODEL', pods: ['Clinic A', 'Hotel B', 'Bank C'] },
  },
  how: {
    eyebrow: 'How it works',
    title: [{ t: 'Three steps. ' }, { t: 'Live in a day.', ital: true }],
    lede: 'No app for your callers. No internet required on their side. Plug into your existing phone line.',
    steps: [
      {
        title: 'Connect your number',
        body: 'Forward your existing business line to Siymo AI. Keep your carrier, keep your number.',
      },
      {
        title: 'Train your agent',
        body: 'Upload your menu, FAQs, booking rules. A LoRA adapter is fine-tuned on your business in hours, not weeks.',
      },
      {
        title: 'Go live, 24/7',
        body: 'Calls are answered immediately, in Uzbek, Russian, or English. Transcripts and bookings sync to your CRM.',
      },
    ],
  },
  useCases: {
    eyebrow: 'Use cases',
    title: [
      { t: 'Built for the calls you ' },
      { t: 'already get.', ital: true },
    ],
    items: [
      {
        tag: 'Clinics',
        title: 'Appointments & reminders',
        body: 'Books check-ups, reschedules cancellations, sends reminders 24h before.',
      },
      {
        tag: 'Hotels & restaurants',
        title: 'Reservations & info',
        body: 'Confirms tables and rooms, answers menu and amenity questions in three languages.',
      },
      {
        tag: 'Banks',
        title: 'Balance & transactions',
        body: 'Authenticates, reads balance, walks through recent transactions, escalates the rest.',
      },
      {
        tag: 'Internet providers',
        title: 'Tickets & triage',
        body: 'Logs outage complaints, runs first-line troubleshooting, opens an engineer ticket if needed.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: [
      { t: 'Start free. ' },
      { t: "Scale when you're ready.", ital: true },
    ],
    payg: {
      eyebrow: 'PAY AS YOU GO',
      amount: '$0',
      cap: 'to start',
      list: [
        '$10 free credits',
        '20 free concurrent calls',
        '10 free knowledge bases',
        'Self-serve dashboard',
      ],
      cta: 'Start instantly',
    },
    enterprise: {
      eyebrow: 'ENTERPRISE',
      amount: 'Custom',
      cap: 'for high-volume teams',
      list: [
        'Fully managed agent setup',
        'Custom concurrency by volume',
        'Higher knowledge-base limits',
        'Early access to beta features',
        'Optional white-glove buildout',
      ],
      cta: 'Talk to the team',
    },
  },
  cta: {
    title: [
      { t: 'Transform every phone call ' },
      { br: true },
      { t: 'into an ' },
      { t: 'intelligent conversation.', ital: true },
    ],
    body: 'Bring the number you already have. Hear your first AI-handled call before lunch.',
    primary: 'Start with $10 free',
    secondary: 'Talk to the team',
  },
  footer: {
    copyright: '© 2026 Siymo AI · Tashkent',
    privacy: 'Privacy',
    terms: 'Terms',
  },
  signIn: {
    phone: {
      title: [{ t: 'Sign in to ' }, { t: 'Siymo', ital: true }],
      sub: 'Confirm your country code and enter your phone number to continue.',
      countryLabel: 'Country',
      phoneLabel: 'Phone Number',
      continue: 'Continue',
    },
    verify: {
      back: 'Back',
      sms: {
        title: [{ t: 'Send a ' }, { t: 'text message', ital: true }, { t: ' to verify.' }],
        sub: 'Scan the code with your phone — it opens Messages with everything ready. Just press send.',
        badge: 'SMS',
      },
      call: {
        title: [{ t: 'Make a ' }, { t: 'quick call', ital: true }, { t: ' to verify.' }],
        sub: 'Scan the code with your phone — it opens your dialer with the number ready. Just press call.',
        badge: 'Call',
      },
      toLabel: 'To',
      messageLabel: 'Message',
      callLabel: 'Number',
      switchToCall: 'Prefer to call instead?',
      switchToSms: 'Prefer to text instead?',
      expiresIn: 'Expires in {time}',
      attemptsLeft: 'Attempts left: {n}',
      expired: 'This code has expired',
      newCode: 'Get a new code',
      tooManyTries: 'Too many attempts',
      startOver: 'Start over',
      waiting: 'Waiting for confirmation…',
      starting: 'Preparing your code…',
      confirming: 'Confirming…',
      verified: 'Verified — signing you in…',
      tryAgain: 'Try again',
      attemptInvalid: 'Invalid code — try again',
      sessionTemplate: 'SESSION · {code}',
    },
    builtWith: {
      text: 'Want this phone sign-in in your own app?',
      cta: 'Read the docs',
    },
  },
  comingSoon: {
    badge: 'Signed in',
    title: [{ t: 'Your workspace is ' }, { t: 'coming soon.', ital: true }],
    body: 'Your phone is verified and your Siymo account is ready. The dashboard — call logs, your AI agent, billing — is on the way. We will let you know the moment it goes live.',
    accountLabel: 'Account',
    phoneLabel: 'Verified phone',
    verifiedLabel: 'Verified',
    signOut: 'Sign out',
  },
  notFound: {
    title: [{ t: 'Page ' }, { t: 'not found.', ital: true }],
    body: 'The page you are looking for does not exist — or it has moved. Let us take you back to where things work.',
    backHome: 'Back to home',
  },
  countries: {
    UZ: 'Uzbekistan',
    US: 'United States',
    GB: 'United Kingdom',
    DE: 'Germany',
    FR: 'France',
    JP: 'Japan',
    IN: 'India',
    BR: 'Brazil',
    KZ: 'Kazakhstan',
    TR: 'Turkey',
    AE: 'United Arab Emirates',
    CN: 'China',
  },
};

const ru: Translation = {
  meta: { title: 'Siymo AI — каждый звонок как разумный разговор.' },
  nav: {
    whatItDoes: 'Что умеет',
    howItWorks: 'Как это работает',
    useCases: 'Сценарии',
    pricing: 'Цены',
    signIn: 'Войти',
    startFree: 'Начать бесплатно',
  },
  hero: {
    headline: [
      { w: 'Каждый' },
      { w: 'звонок —' },
      { w: 'разумный.', ital: true },
    ],
    badge: 'Бета · пилотируем с компаниями по всему Узбекистану',
    sub: 'Siymo AI — голосовой агент, который отвечает на звонки вашего бизнеса как человек: на узбекском, русском и английском. Никаких приложений для клиентов. Никакой музыки на удержании. Только разговоры, которые действительно решают задачи.',
    ctaPrimary: 'Начните с $10 бесплатных кредитов',
    ctaSecondary: 'Послушать пример звонка',
    stats: [
      { num: '70', suffix: '%', label: 'Ниже затраты' },
      { num: '+30', suffix: '%', label: 'Рост CSAT' },
      { num: '24/7', label: 'Всегда на связи' },
      { num: 'UZ · RU · EN', label: 'Языки' },
    ],
  },
  call: {
    live: 'В ЭФИРЕ',
    caller: 'ЗВОНЯЩИЙ',
    siymo: 'SIYMO',
    flow: 'UZ → EN → RU',
    phone: '+998 71 200-00-00',
    lines: [
      { who: 'caller', text: 'Здравствуйте, хочу забронировать столик на 4 человек на ужин.' },
      { who: 'siymo', text: 'Конечно. На сегодня или на завтра?' },
      { who: 'caller', text: 'На завтра, в 19:00.' },
      { who: 'siymo', text: 'Столик на 4 человек на завтра в 19:00 забронирован. Назовите ваше имя.' },
      { who: 'caller', text: 'Анвар. Спасибо.' },
      { who: 'siymo', text: 'Подтверждено, Анвар. Напоминание отправим по SMS.' },
    ],
  },
  features: {
    eyebrow: 'Что умеет',
    title: [
      { t: 'Голосовой агент, который ' },
      { t: 'отвечает, понимает и доводит до конца.', ital: true },
    ],
    lede: 'Подключается к номеру, который у вас уже есть. Никаких приложений для звонящих, никакого интернета на их стороне — если на номер можно позвонить, Siymo AI ответит.',
    items: [
      {
        eyebrow: '01 · Разговор',
        title: [
          { t: 'Естественная речь — ' },
          { t: 'с первого гудка.', ital: true },
        ],
        body: 'Отвечает мгновенно, понимает намерение, задаёт правильный уточняющий вопрос. Звучит как человек, ведёт себя как ваш лучший администратор в спокойный день.',
      },
      {
        eyebrow: '02 · Языки',
        title: [
          { t: 'Узбекский, русский, ' },
          { t: 'английский.', ital: true },
        ],
        body: 'Переключается посреди разговора вслед за звонящим. Создан для бизнеса Центральной Азии, а не адаптирован с английского.',
      },
      {
        eyebrow: '03 · Бронирования',
        title: [
          { t: 'Бронирования — ' },
          { t: 'от начала до конца.', ital: true },
        ],
        body: 'Проверяет доступность, подтверждает со звонящим, записывает бронь в вашу систему и отправляет SMS-напоминание — без участия человека.',
      },
      {
        eyebrow: '04 · Свой мозг',
        title: [
          { t: 'Мини-модель', ital: true },
          { t: ', обученная на вашем бизнесе.' },
        ],
        body: 'Дообучение LoRA даёт каждому клиенту свой адаптер поверх базовой модели — ваше меню, ваши цены, ваши сценарии — без переобучения с нуля. Быстрее, дешевле, масштабируется на тысячи клиентов.',
      },
      {
        eyebrow: '05 · Журнал',
        title: [{ t: 'Каждый звонок — ' }, { t: 'записан.', ital: true }],
        body: 'Жалобы, запросы и брони попадают в вашу CRM структурированными записями. Найдите расшифровку, переслушайте аудио, проверьте решение — без ручного разбора таблиц в конце месяца.',
      },
    ],
    cal: { head: 'ВТ · 22 ОКТ', booked: 'А. Петрова — осмотр' },
    lora: { base: 'БАЗОВАЯ МОДЕЛЬ', pods: ['Клиника A', 'Отель B', 'Банк C'] },
  },
  how: {
    eyebrow: 'Как это работает',
    title: [{ t: 'Три шага. ' }, { t: 'Запуск за день.', ital: true }],
    lede: 'Никаких приложений для звонящих. Интернет на их стороне не нужен. Подключитесь к вашей существующей линии.',
    steps: [
      {
        title: 'Подключите номер',
        body: 'Переадресуйте вашу рабочую линию на Siymo AI. Сохраните оператора, сохраните номер.',
      },
      {
        title: 'Обучите агента',
        body: 'Загрузите меню, частые вопросы, правила бронирования. LoRA-адаптер дообучается на вашем бизнесе за часы, а не недели.',
      },
      {
        title: 'Запуск 24/7',
        body: 'Звонки принимаются сразу — на узбекском, русском или английском. Расшифровки и брони синхронизируются с вашей CRM.',
      },
    ],
  },
  useCases: {
    eyebrow: 'Сценарии',
    title: [
      { t: 'Создан для звонков, которые ' },
      { t: 'вам уже поступают.', ital: true },
    ],
    items: [
      {
        tag: 'Клиники',
        title: 'Записи и напоминания',
        body: 'Записывает на приём, переносит отменённые визиты, напоминает за 24 часа.',
      },
      {
        tag: 'Отели и рестораны',
        title: 'Бронь и справки',
        body: 'Подтверждает столики и номера, отвечает на вопросы о меню и услугах на трёх языках.',
      },
      {
        tag: 'Банки',
        title: 'Баланс и операции',
        body: 'Идентифицирует клиента, называет баланс, разбирает последние операции, остальное передаёт оператору.',
      },
      {
        tag: 'Интернет-провайдеры',
        title: 'Заявки и диагностика',
        body: 'Регистрирует жалобы на сбои, проводит первичную диагностику, при необходимости создаёт заявку инженеру.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Цены',
    title: [
      { t: 'Начните бесплатно. ' },
      { t: 'Масштабируйтесь, когда будете готовы.', ital: true },
    ],
    payg: {
      eyebrow: 'ОПЛАТА ПО ФАКТУ',
      amount: '$0',
      cap: 'для старта',
      list: [
        '$10 бесплатных кредитов',
        '20 одновременных звонков бесплатно',
        '10 баз знаний бесплатно',
        'Самостоятельная панель управления',
      ],
      cta: 'Начать сразу',
    },
    enterprise: {
      eyebrow: 'КОРПОРАТИВНЫЙ',
      amount: 'Индивидуально',
      cap: 'для команд с большим объёмом',
      list: [
        'Полностью управляемая настройка агента',
        'Индивидуальная ёмкость по объёму',
        'Повышенные лимиты баз знаний',
        'Ранний доступ к бета-функциям',
        'Опциональная настройка под ключ',
      ],
      cta: 'Связаться с командой',
    },
  },
  cta: {
    title: [
      { t: 'Превратите каждый звонок ' },
      { br: true },
      { t: 'в ' },
      { t: 'разумный разговор.', ital: true },
    ],
    body: 'Подключите номер, который у вас уже есть. Услышьте первый звонок, обработанный ИИ, ещё до обеда.',
    primary: 'Начать с $10 бесплатно',
    secondary: 'Связаться с командой',
  },
  footer: {
    copyright: '© 2026 Siymo AI · Ташкент',
    privacy: 'Конфиденциальность',
    terms: 'Условия',
  },
  signIn: {
    phone: {
      title: [{ t: 'Вход в ' }, { t: 'Siymo', ital: true }],
      sub: 'Подтвердите код страны и введите номер телефона, чтобы продолжить.',
      countryLabel: 'Страна',
      phoneLabel: 'Номер телефона',
      continue: 'Продолжить',
    },
    verify: {
      back: 'Назад',
      sms: {
        title: [{ t: 'Отправьте ' }, { t: 'сообщение', ital: true }, { t: ' для подтверждения.' }],
        sub: 'Отсканируйте код телефоном — откроются «Сообщения» с готовым текстом. Просто нажмите «Отправить».',
        badge: 'SMS',
      },
      call: {
        title: [{ t: 'Сделайте ' }, { t: 'короткий звонок', ital: true }, { t: ' для подтверждения.' }],
        sub: 'Отсканируйте код телефоном — откроется набор номера. Просто нажмите «Позвонить».',
        badge: 'Звонок',
      },
      toLabel: 'Кому',
      messageLabel: 'Сообщение',
      callLabel: 'Номер',
      switchToCall: 'Хотите позвонить вместо этого?',
      switchToSms: 'Хотите отправить SMS вместо этого?',
      expiresIn: 'Истекает через {time}',
      attemptsLeft: 'Попыток осталось: {n}',
      expired: 'Срок действия кода истёк',
      newCode: 'Получить новый код',
      tooManyTries: 'Слишком много попыток',
      startOver: 'Начать заново',
      waiting: 'Ожидаем подтверждения…',
      starting: 'Готовим код…',
      confirming: 'Подтверждаем…',
      verified: 'Подтверждено — выполняем вход…',
      tryAgain: 'Попробовать снова',
      attemptInvalid: 'Неверный код — попробуйте снова',
      sessionTemplate: 'СЕССИЯ · {code}',
    },
    builtWith: {
      text: 'Хотите такой же вход по телефону в своём приложении?',
      cta: 'Открыть документацию',
    },
  },
  comingSoon: {
    badge: 'Вы вошли',
    title: [{ t: 'Ваш кабинет ' }, { t: 'скоро будет здесь.', ital: true }],
    body: 'Ваш номер подтверждён, аккаунт Siymo готов. Панель — журналы звонков, ваш ИИ-агент, оплата — уже в пути. Мы сообщим, как только всё заработает.',
    accountLabel: 'Аккаунт',
    phoneLabel: 'Подтверждённый номер',
    verifiedLabel: 'Подтверждён',
    signOut: 'Выйти',
  },
  notFound: {
    title: [{ t: 'Страница ' }, { t: 'не найдена.', ital: true }],
    body: 'Страница, которую вы ищете, не существует — или была перемещена. Вернём вас туда, где всё работает.',
    backHome: 'На главную',
  },
  countries: {
    UZ: 'Узбекистан',
    US: 'США',
    GB: 'Великобритания',
    DE: 'Германия',
    FR: 'Франция',
    JP: 'Япония',
    IN: 'Индия',
    BR: 'Бразилия',
    KZ: 'Казахстан',
    TR: 'Турция',
    AE: 'ОАЭ',
    CN: 'Китай',
  },
};

const uz: Translation = {
  meta: { title: 'Siymo AI — har bir qoʻngʻiroq aqlli suhbatga aylanadi.' },
  nav: {
    whatItDoes: 'Imkoniyatlar',
    howItWorks: 'Qanday ishlaydi',
    useCases: 'Qoʻllanish',
    pricing: 'Narxlar',
    signIn: 'Kirish',
    startFree: 'Bepul boshlash',
  },
  hero: {
    headline: [
      { w: 'Har bir' },
      { w: 'qoʻngʻiroq —' },
      { w: 'aqlli.', ital: true },
    ],
    badge: 'Beta · Oʻzbekistondagi bizneslar bilan sinovdamiz',
    sub: 'Siymo AI — biznesingiz telefoniga inson kabi javob beradigan ovozli agent: oʻzbek, rus va ingliz tillarida. Mijozlaringiz uchun ilova kerak emas. Kutish musiqasi yoʻq. Faqat haqiqatan ham natija beradigan suhbatlar.',
    ctaPrimary: '$10 bepul kredit bilan boshlang',
    ctaSecondary: 'Namuna qoʻngʻiroqni eshiting',
    stats: [
      { num: '70', suffix: '%', label: 'Arzonroq' },
      { num: '+30', suffix: '%', label: 'CSAT oʻsishi' },
      { num: '24/7', label: 'Doimo faol' },
      { num: 'UZ · RU · EN', label: 'Tillar' },
    ],
  },
  call: {
    live: 'JONLI',
    caller: 'MIJOZ',
    siymo: 'SIYMO',
    flow: 'UZ → EN → RU',
    phone: '+998 71 200-00-00',
    lines: [
      { who: 'caller', text: 'Salom, kechki ovqatga 4 kishilik joy band qilmoqchiman.' },
      { who: 'siymo', text: 'Albatta. Bugun yoki ertaga uchun boʻlsinmi?' },
      { who: 'caller', text: 'Ertaga, soat 19:00.' },
      { who: 'siymo', text: 'Ertaga 19:00 ga 4 kishilik stol band qilindi. Ismingizni ayting.' },
      { who: 'caller', text: 'Anvar. Rahmat.' },
      { who: 'siymo', text: 'Tasdiqlandi, Anvar. SMS orqali eslatma yuboramiz.' },
    ],
  },
  features: {
    eyebrow: 'Imkoniyatlar',
    title: [
      { t: 'Qoʻngʻiroqqa javob beradigan, tushunadigan va ' },
      { t: 'ishni oxiriga yetkazadigan', ital: true },
      { t: ' agent.' },
    ],
    lede: 'Sizda allaqachon bor boʻlgan telefon raqamiga ulanadi. Qoʻngʻiroq qiluvchilar uchun ilova kerak emas, ularda internet ham shart emas — agar raqamga qoʻngʻiroq qilish mumkin boʻlsa, Siymo AI javob bera oladi.',
    items: [
      {
        eyebrow: '01 · Suhbat',
        title: [
          { t: 'Tabiiy nutq — ' },
          { t: 'birinchi qoʻngʻiroqdayoq.', ital: true },
        ],
        body: 'Darhol javob beradi, maqsadni tushunadi, kerakli savolni beradi. Inson kabi eshitiladi, tinch kundagi eng yaxshi qabulxonangiz kabi ishlaydi.',
      },
      {
        eyebrow: '02 · Tillar',
        title: [{ t: 'Oʻzbek, rus, ' }, { t: 'ingliz.', ital: true }],
        body: 'Qoʻngʻiroq qiluvchi tilni almashtirsa, suhbat oʻrtasida u ham almashtiradi. Markaziy Osiyo bizneslari uchun yaratilgan, ingliz tilidan moslashtirilmagan.',
      },
      {
        eyebrow: '03 · Bandlovlar',
        title: [
          { t: 'Bandlovlar — ' },
          { t: 'boshidan oxirigacha.', ital: true },
        ],
        body: 'Boʻsh joyni tekshiradi, qoʻngʻiroq qiluvchi bilan tasdiqlaydi, bandlovni tizimingizga yozadi va SMS eslatma yuboradi — inson aralashuvisiz.',
      },
      {
        eyebrow: '04 · Maxsus miya',
        title: [
          { t: 'Biznesingiz boʻyicha oʻrgatilgan ' },
          { t: 'mini-model', ital: true },
          { t: '.' },
        ],
        body: 'LoRA fine-tuning har bir mijozga asosiy model ustiga oʻz adapterini beradi — menyungiz, narxlaringiz, skriptlaringiz — noldan qayta oʻrgatmasdan. Tezroq, arzonroq, minglab mijozlarga moslashadi.',
      },
      {
        eyebrow: '05 · Jurnal',
        title: [{ t: 'Har bir qoʻngʻiroq — ' }, { t: 'yozib olinadi.', ital: true }],
        body: 'Shikoyatlar, soʻrovlar va bandlovlar CRM tizimingizga tartiblangan yozuvlar sifatida tushadi. Matnni qidiring, audioni qayta tinglang, yechimni tekshiring — oy oxirida jadvallarni qoʻlda koʻrib chiqish shart emas.',
      },
    ],
    cal: { head: 'SESH · 22 OKT', booked: 'A. Petrova — koʻrik' },
    lora: { base: 'ASOSIY MODEL', pods: ['Klinika A', 'Mehmonxona B', 'Bank C'] },
  },
  how: {
    eyebrow: 'Qanday ishlaydi',
    title: [{ t: 'Uch qadam. ' }, { t: 'Bir kunda ishga tushadi.', ital: true }],
    lede: 'Qoʻngʻiroq qiluvchilar uchun ilova kerak emas. Ularda internet ham shart emas. Mavjud telefon liniyangizga ulanadi.',
    steps: [
      {
        title: 'Raqamingizni ulang',
        body: 'Mavjud biznes liniyangizni Siymo AI ga yoʻnaltiring. Operatoringiz ham, raqamingiz ham oʻzgarmaydi.',
      },
      {
        title: 'Agentingizni oʻrgating',
        body: 'Menyu, koʻp soʻraladigan savollar, bandlov qoidalarini yuklang. LoRA adapter biznesingizda haftalarda emas, soatlarda fine-tuning qilinadi.',
      },
      {
        title: '24/7 ishga tushiring',
        body: 'Qoʻngʻiroqlarga darhol javob beriladi — oʻzbek, rus yoki ingliz tilida. Matnlar va bandlovlar CRM tizimingiz bilan sinxronlanadi.',
      },
    ],
  },
  useCases: {
    eyebrow: 'Qoʻllanish',
    title: [
      { t: 'Sizga ' },
      { t: 'allaqachon kelayotgan qoʻngʻiroqlar', ital: true },
      { t: ' uchun yaratilgan.' },
    ],
    items: [
      {
        tag: 'Klinikalar',
        title: 'Qabullar va eslatmalar',
        body: 'Koʻriklarga yozadi, bekor qilingan qabullarni qayta rejalashtiradi, 24 soat oldin eslatma yuboradi.',
      },
      {
        tag: 'Mehmonxona va restoranlar',
        title: 'Bandlov va maʼlumot',
        body: 'Stol va xonalarni tasdiqlaydi, menyu va qulayliklar haqidagi savollarga uch tilda javob beradi.',
      },
      {
        tag: 'Banklar',
        title: 'Balans va tranzaksiyalar',
        body: 'Mijozni tasdiqlaydi, balansni aytadi, soʻnggi tranzaksiyalarni koʻrib chiqadi, qolganini operatorga uzatadi.',
      },
      {
        tag: 'Internet provayderlar',
        title: 'Murojaatlar va saralash',
        body: 'Uzilish shikoyatlarini qayd etadi, birlamchi diagnostikani oʻtkazadi, zarur boʻlsa muhandisga zayavka ochadi.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Narxlar',
    title: [
      { t: 'Bepul boshlang. ' },
      { t: 'Tayyor boʻlganda kengaytiring.', ital: true },
    ],
    payg: {
      eyebrow: 'ISHLATGANINGIZCHA TOʻLOV',
      amount: '$0',
      cap: 'boshlash uchun',
      list: [
        '$10 bepul kredit',
        '20 ta bepul parallel qoʻngʻiroq',
        '10 ta bepul bilim bazasi',
        'Mustaqil boshqaruv paneli',
      ],
      cta: 'Darhol boshlash',
    },
    enterprise: {
      eyebrow: 'KORPORATIV',
      amount: 'Individual',
      cap: 'katta hajmli jamoalar uchun',
      list: [
        'Toʻliq boshqariladigan agent sozlamasi',
        'Hajmga qarab individual parallellik',
        'Yuqori bilim bazasi limitlari',
        'Beta funksiyalarga erta kirish',
        'Ixtiyoriy premium sozlash xizmati',
      ],
      cta: 'Jamoa bilan bogʻlaning',
    },
  },
  cta: {
    title: [
      { t: 'Har bir qoʻngʻiroqni ' },
      { br: true },
      { t: 'aqlli suhbatga', ital: true },
      { t: ' aylantiring.' },
    ],
    body: 'Sizda allaqachon bor boʻlgan raqamni olib keling. Tushlikkacha AI qabul qilgan birinchi qoʻngʻiroqni eshiting.',
    primary: '$10 bepul bilan boshlang',
    secondary: 'Jamoa bilan bogʻlaning',
  },
  footer: {
    copyright: '© 2026 Siymo AI · Toshkent',
    privacy: 'Maxfiylik',
    terms: 'Shartlar',
  },
  signIn: {
    phone: {
      title: [{ t: 'Siymoga ' }, { t: 'kiring', ital: true }],
      sub: 'Davom etish uchun mamlakat kodini tasdiqlang va telefon raqamingizni kiriting.',
      countryLabel: 'Mamlakat',
      phoneLabel: 'Telefon raqami',
      continue: 'Davom etish',
    },
    verify: {
      back: 'Orqaga',
      sms: {
        title: [{ t: 'Tasdiqlash uchun ' }, { t: 'SMS yuboring.', ital: true }],
        sub: 'Kodni telefoningiz bilan skanerlang — «Xabarlar» tayyor matn bilan ochiladi. Faqat «Yuborish» tugmasini bosing.',
        badge: 'SMS',
      },
      call: {
        title: [{ t: 'Tasdiqlash uchun ' }, { t: 'qoʻngʻiroq qiling.', ital: true }],
        sub: 'Kodni telefoningiz bilan skanerlang — raqam terish oynasi ochiladi. Faqat «Qoʻngʻiroq» tugmasini bosing.',
        badge: 'Qoʻngʻiroq',
      },
      toLabel: 'Kimga',
      messageLabel: 'Xabar',
      callLabel: 'Raqam',
      switchToCall: 'Oʻrniga qoʻngʻiroq qilasizmi?',
      switchToSms: 'Oʻrniga SMS yuborasizmi?',
      expiresIn: 'Amal qiladi: {time}',
      attemptsLeft: 'Qolgan urinishlar: {n}',
      expired: 'Kod muddati tugadi',
      newCode: 'Yangi kod olish',
      tooManyTries: 'Urinishlar koʻp boʻldi',
      startOver: 'Qaytadan boshlash',
      waiting: 'Tasdiqlash kutilmoqda…',
      starting: 'Kod tayyorlanmoqda…',
      confirming: 'Tasdiqlanmoqda…',
      verified: 'Tasdiqlandi — tizimga kirilmoqda…',
      tryAgain: 'Qayta urinish',
      attemptInvalid: 'Notoʻgʻri kod — qayta urinib koʻring',
      sessionTemplate: 'SESSIYA · {code}',
    },
    builtWith: {
      text: 'Shunday telefon orqali kirishni oʻz ilovangizga qoʻshmoqchimisiz?',
      cta: 'Hujjatlarni oching',
    },
  },
  comingSoon: {
    badge: 'Tizimga kirdingiz',
    title: [{ t: 'Shaxsiy kabinetingiz ' }, { t: 'tez orada.', ital: true }],
    body: 'Telefon raqamingiz tasdiqlandi, Siymo hisobingiz tayyor. Boshqaruv paneli — qoʻngʻiroqlar tarixi, AI agentingiz, toʻlovlar — tez kunda. Ishga tushishi bilan xabar beramiz.',
    accountLabel: 'Hisob',
    phoneLabel: 'Tasdiqlangan raqam',
    verifiedLabel: 'Tasdiqlangan',
    signOut: 'Chiqish',
  },
  notFound: {
    title: [{ t: 'Sahifa ' }, { t: 'topilmadi.', ital: true }],
    body: 'Siz qidirayotgan sahifa mavjud emas — yoki koʻchirilgan. Keling, sizni ishlaydigan joyga qaytaramiz.',
    backHome: 'Bosh sahifaga',
  },
  countries: {
    UZ: 'Oʻzbekiston',
    US: 'AQSh',
    GB: 'Buyuk Britaniya',
    DE: 'Germaniya',
    FR: 'Fransiya',
    JP: 'Yaponiya',
    IN: 'Hindiston',
    BR: 'Braziliya',
    KZ: 'Qozogʻiston',
    TR: 'Turkiya',
    AE: 'BAA',
    CN: 'Xitoy',
  },
};

export const translations: Record<Lang, Translation> = { en, ru, uz };
