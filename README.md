# Стартовая сборка для многостраничных сайтов

## Структура проекта
```
my-project/
│
├── src/                    # Исходные файлы проекта
│   ├── assets/             # Общие ресурсы (изображения, шрифты, стили)
│   │   ├── images/
│   │   ├── fonts/
│   │   └── scss/
│   │       └── common.scss # Общие стили
│   │
│   ├── components/         # Переиспользуемые компоненты
│   │   ├── header/
│   │   │   ├── header.html
│   │   │   ├── header.scss
│   │   │   └── header.js
│   │   └── footer/
│   │       ├── footer.html
│   │       ├── footer.scss
│   │       └── footer.js
│   │
│   └── pages/              # Страницы сайта
│       ├── home/
│       │   ├── home.html
│       │   ├── home.scss
│       │   └── home.js
│       └── about/
│           ├── index.html
│           ├── about.scss
│           └── about.js
│
├── dist/                   # Собранные файлы (автогенерируемая директория)
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   ├── images/
│   │   └── fonts/
│   ├── home.html
│   └── about.html
│
├── .babelrc                # Конфигурация Babel
├── .eslintrc.js            # Конфигурация ESLint
├── .prettierrc             # Конфигурация Prettier
├── webpack.config.js       # Общий конфиг Webpack
├── package.json            # Метаданные проекта, скрипты и зависимости
└── README.md               # Документация проекта
```