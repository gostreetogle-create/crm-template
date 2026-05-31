# CRM Template

Универсальный Angular-шаблон для CRM-приложений с 15 переиспользуемыми китами и 22+ UI-компонентами.

## Технологии

| Слой | Технология |
|------|-----------|
| Фреймворк | Angular 21 (standalone components) |
| UI | PrimeNG 21 (Aura theme) |
| Иконки | PrimeIcons 7 |
| Стили | SCSS |
| Тестирование | Vitest + jsdom + AnalogJS |
| Язык | TypeScript 5.9 (strict) |

## Быстрый старт

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build
npm test           # запуск тестов
```

## Архитектура

Проект построен по модульной архитектуре на основе **китов** (kits) — самодостаточных функциональных модулей. Каждый кит имеет до трёх слоёв:

- `core/` — типы, интерфейсы, утилиты (не зависит от фреймворка)
- `angular/` — Angular-специфичные компоненты, провайдеры, директивы
- `express/` — фабрики Express-роутов (серверная часть)

### База (Bricks)

| Кит | Описание |
|-----|----------|
| **ui-primeng-kit** | 22+ обёрнутых PrimeNG-компонентов (кнопки, инпуты, таблицы, диалоги, селекты и др.) с унифицированным API и дизайн-токенами |
| **auth-rbac-kit** | Ролевая модель доступа: пользователи, пермишены, гарды |
| **placeholder-kit** | Система шаблонных плейсхолдеров (напр. `{{org.name}}`, `{{doc.number}}`) |
| **options-resolver-kit** | Динамическая загрузка опций для select-полей |
| **sortable-kit** | Drag-and-drop директивы для сортировки списков |

### Композиты (Composites)

| Кит | Описание |
|-----|----------|
| **layout-shell-kit** | Оболочка приложения: сайдбар, навигация, `<router-outlet>` |
| **schema-data-table-kit** | Типизированная таблица с сортировкой, пагинацией, колонками |
| **schema-table-kit** | Конструктор колонок таблицы на основе схемы данных |
| **crud-page-kit** | Готовые CRUD-страницы: список, создание, редактирование |
| **crud-factory-kit** | Express/Mongoose фабрика CRUD-роутов (сервер) |
| **entity-picker-kit** | Модальный пикер сущностей (выбор записей из справочников) |
| **photo-uploader-kit** | Загрузка фото с drag-and-drop и превью |
| **eav-kit** | Редактор EAV-атрибутов (Entity-Attribute-Value) |
| **document-canvas-kit** | Редактор блоков документа (текст, таблицы, разделители) |

### Прикладные (Applications)

| Кит | Описание |
|-----|----------|
| **quotation-editor** | Редактор коммерческих предложений (КП) |

## Маршруты

| Путь | Компонент |
|------|-----------|
| `/dashboard` | Дашборд с навигацией |
| `/ui-catalog` | Каталог UI-компонентов |
| `/products` | CRUD-страница товаров |

## Тестирование

```bash
npm test           # однократный прогон
npm run test:watch # watch-режим
```

Тесты пишутся с использованием Vitest + Angular TestBed. Файлы тестов: `src/**/*.spec.ts`, `tests/**/*.spec.ts`.

## Структура проекта

```
src/
  app/                  # корень приложения (компонент, роутинг, конфиг)
    pages/              # страницы (dashboard, ui-catalog)
  kits/                 # 15 переиспользуемых китов
    ui-primeng-kit/     # ─── база
    auth-rbac-kit/
    placeholder-kit/
    options-resolver-kit/
    sortable-kit/
    layout-shell-kit/   # ─── композиты
    schema-data-table-kit/
    schema-table-kit/
    crud-page-kit/
    crud-factory-kit/
    entity-picker-kit/
    photo-uploader-kit/
    eav-kit/
    document-canvas-kit/
    quotation-editor/   # ─── прикладной
  styles.scss           # глобальные стили и токены
tests/
  setup.ts              # инициализация тестового окружения
```
