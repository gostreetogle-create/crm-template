import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KpTagComponent, KpButtonComponent, KpInputComponent, KpDialogComponent, KpSelectComponent, KpCheckboxComponent, KpCardComponent, KpSearchComponent, KpTextareaComponent, KpMultiselectComponent, KpInputNumberComponent, KpDatepickerComponent, KpPasswordComponent, KpBreadcrumbsComponent, KpTabGroupComponent, KpToastComponent, KpConfirmDialogComponent, KpFormFieldComponent, KpPhotoUploaderComponent, KpTableComponent, KpPaginatorComponent } from '../../kits/ui-primeng-kit/angular';
import type { KpColumn, PhotoItem as KpPhotoItem } from '../../kits/ui-primeng-kit/angular';
import {
  SortableListDirective,
  SortableItemDirective,
  SortableHandleDirective,
} from '../../kits/sortable-kit/angular';
import { EntityPickerComponent } from '../../kits/entity-picker-kit/angular';
import { PhotoUploaderComponent as PuPhotoUploaderComponent } from '../../kits/photo-uploader-kit/angular';
import { EavAttributeEditorComponent } from '../../kits/eav-kit/angular';
import { CrudPageComponent } from '../../kits/crud-page-kit/angular';
import { LayoutShellComponent } from '../../kits/layout-shell-kit/angular';
import { SchemaColumnBuilderComponent } from '../../kits/schema-table-kit/angular';
import { PlaceholderPickerComponent } from '../../kits/placeholder-kit/angular';
import { DocumentCanvasComponent } from '../../kits/document-canvas-kit/angular';
import { QuotationEditorComponent } from '../../kits/quotation-editor/angular';

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
  imports: [CommonModule, FormsModule, DragDropModule, KpTagComponent, KpButtonComponent, KpInputComponent, KpDialogComponent, KpSelectComponent, KpCheckboxComponent, KpCardComponent, KpSearchComponent, KpTextareaComponent, KpMultiselectComponent, KpInputNumberComponent, KpDatepickerComponent, KpPasswordComponent, KpBreadcrumbsComponent, KpTabGroupComponent, KpToastComponent, KpConfirmDialogComponent, KpFormFieldComponent, KpPhotoUploaderComponent, KpTableComponent, KpPaginatorComponent, SortableListDirective, SortableItemDirective, SortableHandleDirective, EntityPickerComponent, PuPhotoUploaderComponent, EavAttributeEditorComponent, CrudPageComponent, LayoutShellComponent, SchemaColumnBuilderComponent, PlaceholderPickerComponent, DocumentCanvasComponent, QuotationEditorComponent],
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

      <div class="cards">
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
            <div class="card-demo">
              @if (article.id === 'KP-001') {
                <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
                  <up-kp-button label="Primary" severity="primary" />
                  <up-kp-button label="Secondary" severity="secondary" />
                  <up-kp-button label="Danger" severity="danger" />
                </div>
              }
              @if (article.id === 'KP-002') {
                <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
                  <up-kp-input label="Имя" placeholder="Введите имя" />
                  <up-kp-input label="Email" type="email" placeholder="mail@example.com" />
                </div>
              }
              @if (article.id === 'KP-003') {
                <div>
                  <up-kp-button label="Открыть диалог" severity="primary" (buttonClick)="dialogVisible.set(true)" />
                  <up-kp-dialog [(visible)]="dialogVisible" header="Пример диалога">
                    <p style="margin:0">Содержимое модального окна.</p>
                  </up-kp-dialog>
                </div>
              }
              @if (article.id === 'KP-004') {
                <div style="max-width: 300px;">
                  <up-kp-select label="Статус" [(value)]="selectedValue" [options]="statusOptions" />
                </div>
              }
              @if (article.id === 'KP-005') {
                <div style="display: flex; gap: 24px;">
                  <up-kp-checkbox label="Активен" [(checked)]="checkboxChecked" />
                  <up-kp-checkbox label="Заблокирован" [disabled]="true" />
                </div>
              }
              @if (article.id === 'KP-006') {
                <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
                  <up-kp-tag value="info" severity="info" />
                  <up-kp-tag value="success" severity="success" />
                  <up-kp-tag value="warn" severity="warn" />
                  <up-kp-tag value="danger" severity="danger" />
                  <up-kp-tag value="secondary" severity="secondary" />
                  <up-kp-tag value="contrast" severity="contrast" />
                </div>
              }
              @if (article.id === 'KP-007') {
                <up-kp-card style="max-width: 300px;">
                  <div style="padding: 20px; text-align: center; color: #374151;">
                    <div style="font-size: 40px; margin-bottom: 8px;">📇</div>
                    <div style="font-weight: 600; font-size: 16px;">Карточка</div>
                    <div style="font-size: 13px; color: #6b7280; margin-top: 4px;">Контент внутри</div>
                  </div>
                </up-kp-card>
              }
              @if (article.id === 'KP-008') {
                <div style="max-width: 300px;">
                  <up-kp-search placeholder="Поиск…" />
                </div>
              }
              @if (article.id === 'KP-009') {
                <div style="max-width: 400px;">
                  <up-kp-textarea label="Описание" placeholder="Введите текст…" [rows]="3" />
                </div>
              }
              @if (article.id === 'KP-010') {
                <div style="max-width: 350px;">
                  <up-kp-multiselect label="Категории" [(value)]="multiSelected" [options]="multiOptions" />
                </div>
              }
              @if (article.id === 'KP-011') {
                <div style="max-width: 250px;">
                  <up-kp-input-number label="Цена" [(value)]="numberValue" [min]="0" [step]="100" />
                </div>
              }
              @if (article.id === 'KP-012') {
                <div style="max-width: 280px;">
                  <up-kp-datepicker label="Дата" [(value)]="dateValue" />
                </div>
              }
              @if (article.id === 'KP-013') {
                <div style="max-width: 300px;">
                  <up-kp-password label="Пароль" [(value)]="passwordValue" [feedback]="true" />
                </div>
              }
              @if (article.id === 'KP-014') {
                <up-kp-breadcrumbs [items]="breadcrumbItems" />
              }
              @if (article.id === 'KP-015') {
                <up-kp-tab-group [options]="tabOptions" />
              }
              @if (article.id === 'KP-017') {
                <div>
                  <up-kp-button label="Удалить" severity="danger" (buttonClick)="confirmVisible.set(true)" />
                  <up-kp-confirm-dialog />
                </div>
              }
              @if (article.id === 'KP-016') {
                <up-kp-toast position="top-right" />
              }
              @if (article.id === 'KP-018') {
                <div style="max-width: 350px;">
                  <up-kp-form-field label="Email" error="Обязательное поле">
                    <up-kp-input type="email" placeholder="mail@example.com" />
                  </up-kp-form-field>
                </div>
              }
              @if (article.id === 'KP-019') {
                <div style="max-width: 400px;">
                  <up-kp-photo-uploader [(photos)]="photoItems" />
                </div>
              }
              @if (article.id === 'KP-020') {
                <up-kp-table [columns]="demoColumns" [data]="demoRows" [title]="'Демо таблица'" />
              }
              @if (article.id === 'KP-021') {
                <up-kp-paginator [rows]="15" [totalRecords]="100" [(first)]="pageValue" />
              }
              @if (article.id === 'KP-022') {
                <div style="max-width: 300px;">
                  <div soSortableList soSortableListData="sortedItems" (soSortableListDropped)="onSortDrop($event)">
                    @for (item of sortedItems; track item) {
                      <div soSortableItem style="padding: 6px 10px; margin: 2px 0; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px; cursor: grab;">{{ item }}</div>
                    }
                  </div>
                </div>
              }
              @if (article.id === 'KP-023') {
                <div>
                  <up-kp-button label="Выбрать сущность" severity="primary" (buttonClick)="entityPickerVisible.set(true)" />
                  <ep-entity-picker entityKey="products" [(visible)]="entityPickerVisible" (selected)="onEntitySelected($event)" />
                </div>
              }
              @if (article.id === 'KP-024') {
                <pu-photo-uploader style="max-width: 400px; display: block;" />
              }
              @if (article.id === 'KP-025') {
                <eav-attribute-editor entityKey="products" />
              }
              @if (article.id === 'KP-026') {
                <p style="color: #9ca3af; font-style: italic;">Требуется настройка store и конфига. См. cp-crud-page в документации.</p>
              }
              @if (article.id === 'KP-027') {
                <p style="color: #9ca3af; font-style: italic;">Полноценный app shell с роутингом. См. ls-layout-shell в документации.</p>
              }
              @if (article.id === 'KP-028') {
                <p style="color: #9ca3af; font-style: italic;">Требуется настройка SchemaProvider. См. st-schema-column-builder в документации.</p>
              }
              @if (article.id === 'KP-029') {
                <div>
                  <up-kp-button label="Вставить плейсхолдер" severity="primary" (buttonClick)="placeholderVisible.set(true)" />
                  <ph-placeholder-picker [(visible)]="placeholderVisible" (placeholderSelected)="onPlaceholderSelected($event)" />
                </div>
              }
              @if (article.id === 'KP-030') {
                <p style="color: #9ca3af; font-style: italic;">Редактор блоков документа. См. dc-document-canvas в документации.</p>
              }
              @if (article.id === 'KP-031') {
                <p style="color: #9ca3af; font-style: italic;">Готовый редактор КП. См. qe-quotation-editor в документации.</p>
              }
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

    .cards { display: flex; flex-direction: column; gap: 16px; }
    .card {
      background: white; border-radius: 12px; border: 1px solid #e5e7eb;
      padding: 24px; position: relative;
    }
    .card:hover { box-shadow: 0 4px 12px rgba(0,0,0,.08); }
    .card-badge {
      position: absolute; top: 16px; right: 16px;
      background: #eff6ff; color: #3b82f6; font-size: 12px; font-weight: 700;
      padding: 2px 10px; border-radius: 12px; font-family: monospace; letter-spacing: .5px;
    }
    .card h3 { font-size: 20px; margin: 0 0 8px 0; padding-right: 80px; }
    .card-desc { color: #6b7280; font-size: 14px; line-height: 1.5; margin-bottom: 12px; max-width: 700px; }
    .card-tags { display: flex; gap: 8px; margin-bottom: 10px; }
    .tag { font-size: 12px; padding: 2px 8px; border-radius: 6px; font-family: monospace; }
    .tag.selector { background: #fef3c7; color: #92400e; }
    .tag.category { background: #f3f4f6; color: #374151; }

    .card-props { margin-bottom: 8px; }
    .props-label { font-size: 12px; color: #9ca3af; margin-right: 4px; }
    .prop {
      display: inline-block; font-size: 11px; background: #f9fafb; color: #6b7280;
      padding: 1px 6px; border-radius: 4px; margin: 2px; border: 1px solid #f3f4f6;
    }

    .card-demo {
      margin-top: 8px;
      padding-top: 12px;
      border-top: 1px solid #e5e7eb;
    }

    .empty { text-align: center; padding: 60px; color: #9ca3af; font-size: 16px; }

    @media (max-width: 768px) {
      .catalog { padding: 16px; }
    }
  `],
})
export class UiCatalogComponent {
  searchQuery = '';
  selectedCategory = signal('');
  dialogVisible = signal(false);
  selectedValue = signal<string | number | boolean | null>(null);
  checkboxChecked = signal(true);
  statusOptions = [
    { label: 'Активен', value: 'active' },
    { label: 'Неактивен', value: 'inactive' },
    { label: 'В архиве', value: 'archived' },
  ];

  multiSelected = signal<string[]>(['category1']);
  multiOptions: string[] = ['category1', 'category2', 'category3'];
  numberValue = signal<number | null>(null);
  dateValue = signal('');
  passwordValue = signal('');
  breadcrumbItems = [
    { label: 'Главная', routerLink: '/' },
    { label: 'Каталог', routerLink: '/catalog' },
  ];
  tabOptions = [
    { label: 'Вкладка 1', value: 'tab1' },
    { label: 'Вкладка 2', value: 'tab2' },
  ];
  confirmVisible = signal(false);
  pageValue = signal(0);
  photoItems = signal<KpPhotoItem[]>([]);
  sortedItems = ['Пункт A', 'Пункт B', 'Пункт C'];
  entityPickerVisible = signal(false);
  placeholderVisible = signal(false);
  demoColumns: KpColumn[] = [
    { field: 'name', header: 'Имя', type: 'text', sortable: true },
    { field: 'status', header: 'Статус', type: 'tag', sortable: true },
    { field: 'date', header: 'Дата', type: 'date', sortable: true },
  ];
  demoRows: object[] = [
    { name: 'Товар A', status: 'success', date: '2026-05-01' },
    { name: 'Товар B', status: 'warn', date: '2026-05-15' },
    { name: 'Товар C', status: 'danger', date: '2026-05-20' },
  ];



  categories = signal(['Ввод', 'Выбор', 'Отображение', 'Обратная связь', 'Навигация', 'Контейнеры', 'Загрузка', 'Таблицы', 'Медиа']);

  articles = signal<UiArticle[]>([
    {
      id: 'KP-001', name: 'Кнопка', selector: '<up-kp-button>',
      description: 'Кнопка действий. Поддерживает severity (primary/secondary/danger/success), размеры, иконки, badge, варианты (premium/flat), состояния loading/disabled.',
      category: 'Ввод', copyTemplate: '<kp-button label="Сохранить" severity="primary" (buttonClick)="onSave()" />',
      props: ['label', 'severity', 'size', 'icon', 'iconPos', 'badge', 'badgeSeverity', 'loading', 'disabled', 'rounded', 'text', 'outlined', 'raised', 'block', 'variant', 'tooltip', 'ariaLabel'],
    },
    {
      id: 'KP-002', name: 'Поле ввода', selector: '<up-kp-input>',
      description: 'Текстовое поле ввода. Типы: text, number, email, tel, url. Поддерживает label, placeholder, error, размеры.',
      category: 'Ввод', copyTemplate: '<kp-input label="Название" [(value)]="name" placeholder="Введите название" />',
      props: ['label', 'value', 'type', 'placeholder', 'required', 'readonly', 'disabled', 'error', 'size', 'ariaLabel', 'autofocus'],
    },
    {
      id: 'KP-003', name: 'Диалог', selector: '<up-kp-dialog>',
      description: 'Модальное окно. Поддерживает header, ширину, слот footer через ng-template kpDialogFooter, двусторонний binding visible.',
      category: 'Контейнеры', copyTemplate: '<kp-dialog [(visible)]="open" header="Заголовок"><p>Содержимое</p><ng-template kpDialogFooter><kp-button label="OK" (buttonClick)="open=false" /></ng-template></kp-dialog>',
      props: ['visible', 'header', 'width', 'ariaLabel', 'hide', 'visibleChange'],
    },
    {
      id: 'KP-004', name: 'Выпадающий список', selector: '<up-kp-select>',
      description: 'Select/Dropdown для выбора одного значения. Опции передаются через [options]. Поддерживает placeholder, disabled.',
      category: 'Выбор', copyTemplate: '<kp-select label="Статус" [(value)]="status" [options]="myOptions" placeholder="Выберите статус" />',
      props: ['label', 'value', 'options', 'placeholder', 'disabled', 'required'],
    },
    {
      id: 'KP-005', name: 'Чекбокс', selector: '<up-kp-checkbox>',
      description: 'Флажок (checkbox). Двусторонний binding через [(checked)]. Поддерживает label, disabled.',
      category: 'Выбор', copyTemplate: '<kp-checkbox label="Активен" [(checked)]="isActive" />',
      props: ['label', 'checked', 'disabled'],
    },
    {
      id: 'KP-006', name: 'Тег/Бейдж', selector: '<up-kp-tag>',
      description: 'Тег для отображения статусов. Severity: success/info/warn/danger/contrast.',
      category: 'Отображение', copyTemplate: '<up-kp-tag [value]="\'Активен\'" severity="success" />',
      props: ['value', 'severity', 'rounded'],
    },
    {
      id: 'KP-007', name: 'Карточка', selector: '<up-kp-card>',
      description: 'Контейнер-карточка. Поддерживает header, subheader, слоты для контента и footer.',
      category: 'Контейнеры', copyTemplate: '<kp-card header="Заголовок"><p>Содержимое карточки</p></kp-card>',
      props: ['header', 'subheader', 'styleClass'],
    },
    {
      id: 'KP-008', name: 'Поиск', selector: '<up-kp-search>',
      description: 'Поле поиска с иконкой. Автоматический debounce. Событие (search) при вводе.',
      category: 'Ввод', copyTemplate: '<up-kp-search placeholder="Поиск…" [(value)]="query" (search)="onSearch($event)" />',
      props: ['value', 'placeholder', 'disabled'],
    },
    {
      id: 'KP-009', name: 'Текстовая область', selector: '<up-kp-textarea>',
      description: 'Многострочное текстовое поле. Поддерживает rows, autoResize.',
      category: 'Ввод', copyTemplate: '<up-kp-textarea label="Описание" [(value)]="desc" [rows]="4" />',
      props: ['label', 'value', 'placeholder', 'rows', 'disabled', 'autoResize'],
    },
    {
      id: 'KP-010', name: 'Мультивыбор', selector: '<up-kp-multiselect>',
      description: 'Выпадающий список с множественным выбором. Значение — массив. Поддерживает фильтрацию.',
      category: 'Выбор', copyTemplate: '<up-kp-multiselect label="Категории" [(value)]="selected" [options]="allOptions" />',
      props: ['label', 'value', 'options', 'placeholder', 'disabled', 'filter'],
    },
    {
      id: 'KP-011', name: 'Числовой ввод', selector: '<up-kp-input-number>',
      description: 'Поле для ввода чисел. Поддерживает min/max/step, кнопки +/-.',
      category: 'Ввод', copyTemplate: '<up-kp-input-number label="Цена" [(value)]="price" [min]="0" [step]="100" />',
      props: ['label', 'value', 'min', 'max', 'step', 'disabled'],
    },
    {
      id: 'KP-012', name: 'Выбор даты', selector: '<up-kp-datepicker>',
      description: 'Календарь для выбора даты. Поддерживает minDate/maxDate, формат, иконку.',
      category: 'Ввод', copyTemplate: '<up-kp-datepicker label="Дата" [(value)]="date" />',
      props: ['label', 'value', 'minDate', 'maxDate', 'dateFormat', 'disabled', 'showIcon'],
    },
    {
      id: 'KP-013', name: 'Пароль', selector: '<up-kp-password>',
      description: 'Поле ввода пароля с кнопкой показать/скрыть. Поддерживает обратную связь по силе пароля.',
      category: 'Ввод', copyTemplate: '<up-kp-password label="Пароль" [(value)]="password" [feedback]="true" />',
      props: ['label', 'value', 'placeholder', 'feedback', 'disabled'],
    },
    {
      id: 'KP-014', name: 'Хлебные крошки', selector: '<up-kp-breadcrumbs>',
      description: 'Навигационные хлебные крошки. Принимает массив элементов с label и routerLink.',
      category: 'Навигация', copyTemplate: '<up-kp-breadcrumbs [items]="breadcrumbItems" />',
      props: ['items', 'home'],
    },
    {
      id: 'KP-015', name: 'Табы', selector: '<up-kp-tab-group>',
      description: 'Группа вкладок. Принимает массив options с label и контентом через ng-template.',
      category: 'Навигация', copyTemplate: '<up-kp-tab-group [options]="tabOptions" [(activeIndex)]="activeTab" />',
      props: ['options', 'activeIndex'],
    },
    {
      id: 'KP-016', name: 'Toast уведомления', selector: '<up-kp-toast>',
      description: 'Всплывающие уведомления. Severity: success/info/warn/error. Авто-закрытие.',
      category: 'Обратная связь', copyTemplate: '<up-kp-toast />',
      props: ['position', 'life'],
    },
    {
      id: 'KP-017', name: 'Диалог подтверждения', selector: '<up-kp-confirm-dialog>',
      description: 'Диалог «Вы уверены?» с кнопками Да/Нет. События (accept) и (reject).',
      category: 'Обратная связь', copyTemplate: '<up-kp-confirm-dialog [(visible)]="confirmOpen" header="Удалить?" message="Вы уверены?" (accept)="onDelete()" />',
      props: ['visible', 'header', 'message', 'acceptLabel', 'rejectLabel'],
    },
    {
      id: 'KP-018', name: 'Поле формы', selector: '<up-kp-form-field>',
      description: 'Обёртка для поля ввода с label и сообщением об ошибке. Компонует label + input + error в единый блок.',
      category: 'Ввод', copyTemplate: '<up-kp-form-field label="Email"><up-kp-input [(value)]="email" type="email" /></up-kp-form-field>',
      props: ['label', 'error', 'required'],
    },
    {
      id: 'KP-019', name: 'Загрузка фото', selector: '<up-kp-photo-uploader>',
      description: 'Компонент загрузки фотографий с drag-and-drop и предпросмотром. До 10 фото.',
      category: 'Медиа', copyTemplate: '<up-kp-photo-uploader [(photos)]="photoList" [maxPhotos]="5" />',
      props: ['photos', 'maxPhotos', 'disabled'],
    },
    {
      id: 'KP-020', name: 'Таблица', selector: '<up-kp-table>',
      description: 'Таблица данных с сортировкой по колонкам. Поддерживает actions, selection.',
      category: 'Таблицы', copyTemplate: '<up-kp-table [columns]="cols" [rows]="data" [sortable]="true" (sortChange)="onSort($event)" />',
      props: ['columns', 'rows', 'sortable', 'paginator', 'actions', 'selection'],
    },
    {
      id: 'KP-021', name: 'Пагинатор', selector: '<up-kp-paginator>',
      description: 'Постраничная навигация. События при смене страницы и размера.',
      category: 'Таблицы', copyTemplate: '<up-kp-paginator [total]="100" [(page)]="page" [limit]="15" (pageChange)="onPage($event)" />',
      props: ['total', 'page', 'limit', 'pageChange'],
    },
    {
      id: 'KP-022', name: 'Drag-and-drop список', selector: '[soSortableList] / [soSortableItem]',
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

  onSortDrop(event: { previousIndex: number; currentIndex: number }): void {
    const item = this.sortedItems.splice(event.previousIndex, 1)[0];
    this.sortedItems.splice(event.currentIndex, 0, item);
  }

  onEntitySelected(row: unknown): void {
    this.entityPickerVisible.set(false);
  }

  onPlaceholderSelected(token: string): void {
    this.placeholderVisible.set(false);
  }
}
