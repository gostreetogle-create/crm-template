import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UiArticle {
  id: string;
  name: string;
  selector: string;
  description: string;
  category: string;
  copyTemplate: string;
  props: string[];
}

@Component({
  selector: 'app-ui-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="catalog">
      <header class="catalog-header">
        <h1>🎨 UI Каталог компонентов</h1>
        <p class="subtitle">22 компонента на базе PrimeNG. У каждого — уникальный артикул. Скажи AI «используй артикул KP‑001» и он вставит нужный компонент.</p>

        <div class="search-bar">
          <input
            [(ngModel)]="searchQuery"
            placeholder="Поиск по названию, артикулу или описанию…"
            class="search-input"
          />
        </div>

        <div class="category-filters">
          <button
            *ngFor="let cat of categories()"
            (click)="selectedCategory.set(cat === selectedCategory() ? '' : cat)"
            [class.active]="cat === selectedCategory()"
          >
            {{ cat }}
          </button>
        </div>
      </header>

      <div class="cards-grid">
        @for (article of filteredArticles(); track article.id) {
          <div class="card" [id]="article.id">
            <div class="card-badge">{{ article.id }}</div>
            <h3>{{ article.name }}</h3>
            <p class="card-desc">{{ article.description }}</p>
            <div class="card-tags">
              <span class="tag selector">{{ article.selector }}</span>
              <span class="tag category">{{ article.category }}</span>
            </div>
            <div class="card-props">
              <span class="props-label">Свойства:</span>
              @for (prop of article.props; track prop) {
                <span class="prop">{{ prop }}</span>
              }
            </div>
            <div class="card-copy">
              <code>{{ article.copyTemplate }}</code>
              <button (click)="copyToClipboard(article.copyTemplate)">📋 Копировать</button>
            </div>
          </div>
        }
      </div>

      <div class="empty" *ngIf="filteredArticles().length === 0">
        Ничего не найдено по запросу «{{ searchQuery }}»
      </div>
    </div>
  `,
  styles: [`
    .catalog { padding: 32px; max-width: 1200px; margin: 0 auto; }
    .catalog-header { margin-bottom: 32px; }
    .catalog-header h1 { font-size: 28px; margin-bottom: 8px; }
    .subtitle { color: #6b7280; font-size: 15px; line-height: 1.6; max-width: 700px; }

    .search-bar { margin: 20px 0; }
    .search-input {
      width: 100%; max-width: 500px; padding: 10px 16px;
      border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;
    }

    .category-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
    .category-filters button {
      padding: 6px 14px; border-radius: 20px; border: 1px solid #d1d5db;
      background: white; cursor: pointer; font-size: 13px; transition: all .15s;
    }
    .category-filters button.active { background: #3b82f6; color: white; border-color: #3b82f6; }
    .category-filters button:hover:not(.active) { background: #f3f4f6; }

    .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }
    .card {
      background: white; border-radius: 12px; border: 1px solid #e5e7eb;
      padding: 20px; position: relative; transition: box-shadow .15s;
    }
    .card:hover { box-shadow: 0 4px 12px rgba(0,0,0,.08); }
    .card-badge {
      position: absolute; top: 12px; right: 12px;
      background: #eff6ff; color: #3b82f6; font-size: 12px; font-weight: 700;
      padding: 2px 10px; border-radius: 12px; font-family: monospace; letter-spacing: .5px;
    }
    .card h3 { font-size: 18px; margin: 0 0 8px 0; padding-right: 80px; }
    .card-desc { color: #6b7280; font-size: 13px; line-height: 1.5; margin-bottom: 12px; }
    .card-tags { display: flex; gap: 8px; margin-bottom: 10px; }
    .tag { font-size: 12px; padding: 2px 8px; border-radius: 6px; font-family: monospace; }
    .tag.selector { background: #fef3c7; color: #92400e; }
    .tag.category { background: #f3f4f6; color: #374151; }

    .card-props { margin-bottom: 12px; }
    .props-label { font-size: 12px; color: #9ca3af; margin-right: 4px; }
    .prop {
      display: inline-block; font-size: 11px; background: #f9fafb; color: #6b7280;
      padding: 1px 6px; border-radius: 4px; margin: 2px; border: 1px solid #f3f4f6;
    }

    .card-copy {
      background: #1e293b; border-radius: 8px; padding: 10px 12px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .card-copy code { color: #e2e8f0; font-size: 12px; font-family: 'Fira Code', monospace; }
    .card-copy button {
      background: #334155; color: white; border: none; padding: 4px 12px;
      border-radius: 6px; cursor: pointer; font-size: 12px; white-space: nowrap; margin-left: 8px;
    }
    .card-copy button:hover { background: #475569; }

    .empty { text-align: center; padding: 60px; color: #9ca3af; font-size: 16px; }

    @media (max-width: 768px) {
      .cards-grid { grid-template-columns: 1fr; }
      .catalog { padding: 16px; }
    }
  `],
})
export class UiCatalogComponent {
  searchQuery = '';
  selectedCategory = signal('');
  copiedId = signal('');

  categories = signal(['Ввод', 'Выбор', 'Отображение', 'Обратная связь', 'Навигация', 'Контейнеры', 'Загрузка', 'Таблицы', 'Медиа']);

  articles = signal<UiArticle[]>([
    {
      id: 'KP-001', name: 'Кнопка', selector: '<kp-button>',
      description: 'Кнопка действий. Поддерживает severity (primary/secondary/danger/success), размеры, иконки, badge, варианты (premium/flat), состояния loading/disabled.',
      category: 'Ввод', copyTemplate: '<kp-button label="Сохранить" severity="primary" (buttonClick)="onSave()" />',
      props: ['label', 'severity', 'size', 'icon', 'iconPos', 'badge', 'badgeSeverity', 'loading', 'disabled', 'rounded', 'text', 'outlined', 'raised', 'block', 'variant', 'tooltip', 'ariaLabel'],
    },
    {
      id: 'KP-002', name: 'Поле ввода', selector: '<kp-input>',
      description: 'Текстовое поле ввода. Типы: text, number, email, tel, url. Поддерживает label, placeholder, error, размеры.',
      category: 'Ввод', copyTemplate: '<kp-input label="Название" [(value)]="name" placeholder="Введите название" />',
      props: ['label', 'value', 'type', 'placeholder', 'required', 'readonly', 'disabled', 'error', 'size', 'ariaLabel', 'autofocus'],
    },
    {
      id: 'KP-003', name: 'Диалог', selector: '<kp-dialog>',
      description: 'Модальное окно. Поддерживает header, ширину, слот footer через ng-template kpDialogFooter, двусторонний binding visible.',
      category: 'Контейнеры', copyTemplate: '<kp-dialog [(visible)]="open" header="Заголовок"><p>Содержимое</p><ng-template kpDialogFooter><kp-button label="OK" (buttonClick)="open=false" /></ng-template></kp-dialog>',
      props: ['visible', 'header', 'width', 'ariaLabel', 'hide', 'visibleChange'],
    },
    {
      id: 'KP-004', name: 'Выпадающий список', selector: '<kp-select>',
      description: 'Select/Dropdown для выбора одного значения. Опции передаются через [options]. Поддерживает placeholder, disabled.',
      category: 'Выбор', copyTemplate: '<kp-select label="Статус" [(value)]="status" [options]="myOptions" placeholder="Выберите статус" />',
      props: ['label', 'value', 'options', 'placeholder', 'disabled', 'required'],
    },
    {
      id: 'KP-005', name: 'Чекбокс', selector: '<kp-checkbox>',
      description: 'Флажок (checkbox). Двусторонний binding через [(checked)]. Поддерживает label, disabled.',
      category: 'Выбор', copyTemplate: '<kp-checkbox label="Активен" [(checked)]="isActive" />',
      props: ['label', 'checked', 'disabled'],
    },
    {
      id: 'KP-006', name: 'Тег/Бейдж', selector: '<kp-tag>',
      description: 'Тег для отображения статусов. Severity: success/info/warn/danger/contrast.',
      category: 'Отображение', copyTemplate: '<kp-tag [value]="\'Активен\'" severity="success" />',
      props: ['value', 'severity', 'rounded'],
    },
    {
      id: 'KP-007', name: 'Карточка', selector: '<kp-card>',
      description: 'Контейнер-карточка. Поддерживает header, subheader, слоты для контента и footer.',
      category: 'Контейнеры', copyTemplate: '<kp-card header="Заголовок"><p>Содержимое карточки</p></kp-card>',
      props: ['header', 'subheader', 'styleClass'],
    },
    {
      id: 'KP-008', name: 'Поиск', selector: '<kp-search>',
      description: 'Поле поиска с иконкой. Автоматический debounce. Событие (search) при вводе.',
      category: 'Ввод', copyTemplate: '<kp-search placeholder="Поиск…" [(value)]="query" (search)="onSearch($event)" />',
      props: ['value', 'placeholder', 'disabled'],
    },
    {
      id: 'KP-009', name: 'Текстовая область', selector: '<kp-textarea>',
      description: 'Многострочное текстовое поле. Поддерживает rows, autoResize.',
      category: 'Ввод', copyTemplate: '<kp-textarea label="Описание" [(value)]="desc" [rows]="4" />',
      props: ['label', 'value', 'placeholder', 'rows', 'disabled', 'autoResize'],
    },
    {
      id: 'KP-010', name: 'Мультивыбор', selector: '<kp-multiselect>',
      description: 'Выпадающий список с множественным выбором. Значение — массив. Поддерживает фильтрацию.',
      category: 'Выбор', copyTemplate: '<kp-multiselect label="Категории" [(value)]="selected" [options]="allOptions" />',
      props: ['label', 'value', 'options', 'placeholder', 'disabled', 'filter'],
    },
    {
      id: 'KP-011', name: 'Числовой ввод', selector: '<kp-input-number>',
      description: 'Поле для ввода чисел. Поддерживает min/max/step, кнопки +/-.',
      category: 'Ввод', copyTemplate: '<kp-input-number label="Цена" [(value)]="price" [min]="0" [step]="100" />',
      props: ['label', 'value', 'min', 'max', 'step', 'disabled'],
    },
    {
      id: 'KP-012', name: 'Выбор даты', selector: '<kp-datepicker>',
      description: 'Календарь для выбора даты. Поддерживает minDate/maxDate, формат, иконку.',
      category: 'Ввод', copyTemplate: '<kp-datepicker label="Дата" [(value)]="date" />',
      props: ['label', 'value', 'minDate', 'maxDate', 'dateFormat', 'disabled', 'showIcon'],
    },
    {
      id: 'KP-013', name: 'Пароль', selector: '<kp-password>',
      description: 'Поле ввода пароля с кнопкой показать/скрыть. Поддерживает обратную связь по силе пароля.',
      category: 'Ввод', copyTemplate: '<kp-password label="Пароль" [(value)]="password" [feedback]="true" />',
      props: ['label', 'value', 'placeholder', 'feedback', 'disabled'],
    },
    {
      id: 'KP-014', name: 'Хлебные крошки', selector: '<kp-breadcrumbs>',
      description: 'Навигационные хлебные крошки. Принимает массив элементов с label и routerLink.',
      category: 'Навигация', copyTemplate: '<kp-breadcrumbs [items]="breadcrumbItems" />',
      props: ['items', 'home'],
    },
    {
      id: 'KP-015', name: 'Табы', selector: '<kp-tab-group>',
      description: 'Группа вкладок. Принимает массив options с label и контентом через ng-template.',
      category: 'Навигация', copyTemplate: '<kp-tab-group [options]="tabOptions" [(activeIndex)]="activeTab" />',
      props: ['options', 'activeIndex'],
    },
    {
      id: 'KP-016', name: 'Toast уведомления', selector: '<kp-toast>',
      description: 'Всплывающие уведомления. Severity: success/info/warn/error. Авто-закрытие.',
      category: 'Обратная связь', copyTemplate: '<kp-toast />',
      props: ['position', 'life'],
    },
    {
      id: 'KP-017', name: 'Диалог подтверждения', selector: '<kp-confirm-dialog>',
      description: 'Диалог «Вы уверены?» с кнопками Да/Нет. События (accept) и (reject).',
      category: 'Обратная связь', copyTemplate: '<kp-confirm-dialog [(visible)]="confirmOpen" header="Удалить?" message="Вы уверены?" (accept)="onDelete()" />',
      props: ['visible', 'header', 'message', 'acceptLabel', 'rejectLabel'],
    },
    {
      id: 'KP-018', name: 'Поле формы', selector: '<kp-form-field>',
      description: 'Обёртка для поля ввода с label и сообщением об ошибке. Компонует label + input + error в единый блок.',
      category: 'Ввод', copyTemplate: '<kp-form-field label="Email"><kp-input [(value)]="email" type="email" /></kp-form-field>',
      props: ['label', 'error', 'required'],
    },
    {
      id: 'KP-019', name: 'Загрузка фото', selector: '<kp-photo-uploader>',
      description: 'Компонент загрузки фотографий с drag-and-drop и предпросмотром. До 10 фото.',
      category: 'Медиа', copyTemplate: '<kp-photo-uploader [(photos)]="photoList" [maxPhotos]="5" />',
      props: ['photos', 'maxPhotos', 'disabled'],
    },
    {
      id: 'KP-020', name: 'Таблица', selector: '<kp-table>',
      description: 'Таблица данных с сортировкой по колонкам. Поддерживает actions, selection.',
      category: 'Таблицы', copyTemplate: '<kp-table [columns]="cols" [rows]="data" [sortable]="true" (sortChange)="onSort($event)" />',
      props: ['columns', 'rows', 'sortable', 'paginator', 'actions', 'selection'],
    },
    {
      id: 'KP-021', name: 'Пагинатор', selector: '<kp-paginator>',
      description: 'Постраничная навигация. События при смене страницы и размера.',
      category: 'Таблицы', copyTemplate: '<kp-paginator [total]="100" [(page)]="page" [limit]="15" (pageChange)="onPage($event)" />',
      props: ['total', 'page', 'limit', 'pageChange'],
    },
    {
      id: 'KP-022', name: 'Drag-and-drop список', selector: 'soSortableList / soSortableItem',
      description: 'Сортируемый список перетаскиванием. Директивы: soSortableList (контейнер), soSortableItem (элемент), soSortableHandle (ручка).',
      category: 'Навигация', copyTemplate: '<div soSortableList (sorted)="onSorted($event)"><div *ngFor="let item of items" soSortableItem>{{ item }}</div></div>',
      props: ['sorted', 'disabled', 'axis'],
    },
    {
      id: 'KP-023', name: 'Выбор сущности', selector: '<ep-entity-picker>',
      description: 'Модальный диалог для выбора сущностей (товары, клиенты…). Поддерживает single/multi режим.',
      category: 'Выбор', copyTemplate: '<ep-entity-picker entityKey="products" [(visible)]="pickerOpen" (selected)="onPick($event)" />',
      props: ['entityKey', 'visible', 'multi', 'selected'],
    },
    {
      id: 'KP-024', name: 'Загрузка фото (галерея)', selector: '<pu-photo-uploader>',
      description: 'Галерея фото с позиционированием кадра, zoom, drag-and-drop, base64.',
      category: 'Медиа', copyTemplate: '<pu-photo-uploader [(photos)]="gallery" [maxPhotos]="10" dropzoneHint="Перетащите фото" />',
      props: ['photos', 'maxPhotos', 'dropzoneHint'],
    },
    {
      id: 'KP-025', name: 'Атрибуты (EAV)', selector: '<eav-attribute-editor>',
      description: 'Редактор кастомных атрибутов сущности. Динамическое добавление/удаление полей.',
      category: 'Отображение', copyTemplate: '<eav-attribute-editor [entityKey]="\'products\'" [(attributes)]="attrs" />',
      props: ['entityKey', 'attributes', 'disabled'],
    },
    {
      id: 'KP-026', name: 'CRUD страница', selector: '<cp-crud-page>',
      description: 'Готовая страница со списком + форма создания/редактирования. Принимает store, config, columns.',
      category: 'Таблицы', copyTemplate: '<cp-crud-page [store]="myStore" [config]="crudConfig" [columns]="columns"><ng-template #form let-row="row">...</ng-template></cp-crud-page>',
      props: ['store', 'config', 'columns', 'permissions', 'extraActions', 'idField'],
    },
    {
      id: 'KP-027', name: 'Оболочка приложения', selector: '<ls-layout-shell>',
      description: 'App shell с боковой панелью навигации и router-outlet. Адаптивная вёрстка (мобильное меню).',
      category: 'Навигация', copyTemplate: '<ls-layout-shell><!-- router-outlet внутри --></ls-layout-shell>',
      props: ['appTitle', 'navItems'],
    },
    {
      id: 'KP-028', name: 'Schema Column Builder', selector: '<st-schema-column-builder>',
      description: 'Конструктор колонок таблицы. Выбор сущности → настройка колонок. ControlValueAccessor (работает с ngModel).',
      category: 'Таблицы', copyTemplate: '<st-schema-column-builder [(ngModel)]="columnValue" (validationChange)="onIssues($event)" />',
      props: ['labels', 'disabled', 'validationChange', 'providerStatusChange'],
    },
    {
      id: 'KP-029', name: 'Плейсхолдеры', selector: '<ph-placeholder-picker>',
      description: 'Выбор и вставка плейсхолдеров {{org.name}}, {{doc.number}} и др. Функция resolvePlaceholders() для подстановки.',
      category: 'Отображение', copyTemplate: '<ph-placeholder-picker (selected)="onPlaceholder($event)" />',
      props: ['categories', 'selected'],
    },
    {
      id: 'KP-030', name: 'Канва документа', selector: '<dc-document-canvas>',
      description: 'Редактор блоков документа: текст, разделители, таблицы. Drag-and-drop перестановка блоков.',
      category: 'Отображение', copyTemplate: '<dc-document-canvas mode="template" [(blocks)]="docBlocks" (placeholderRequested)="onReq($event)" />',
      props: ['mode', 'blocks', 'placeholderRequested', 'pickerRequested'],
    },
    {
      id: 'KP-031', name: 'Редактор КП', selector: '<qe-quotation-editor>',
      description: 'Готовый редактор коммерческих предложений. Композиция: канва + выбор товаров + плейсхолдеры.',
      category: 'Отображение', copyTemplate: '<qe-quotation-editor />',
      props: ['title', 'blocks', 'tableItems'],
    },
  ]);

  filteredArticles() {
    const q = this.searchQuery.toLowerCase().trim();
    const cat = this.selectedCategory();
    return this.articles().filter((a) => {
      if (cat && a.category !== cat) return false;
      if (!q) return true;
      return (
        a.id.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.selector.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      );
    });
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}
