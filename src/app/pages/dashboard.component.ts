import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div style="padding: 32px; max-width: 800px; margin: 0 auto;">
      <h1 style="font-size: 28px; margin-bottom: 8px;">Добро пожаловать в CRM Template</h1>
      <p style="color: #6b7280; margin-bottom: 32px;">
        Универсальный Angular 21 шаблон с 15 переиспользуемыми kits и 22 UI-компонентами.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <a href="/ui-catalog"
           style="display: block; padding: 24px; background: white; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; color: inherit;">
          <div style="font-size: 20px; margin-bottom: 4px;">🎨 UI Каталог</div>
          <div style="font-size: 14px; color: #6b7280;">22 компонента с артикулами — копируй и используй</div>
        </a>
        <a href="/products"
           style="display: block; padding: 24px; background: white; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; color: inherit;">
          <div style="font-size: 20px; margin-bottom: 4px;">📦 Товары</div>
          <div style="font-size: 14px; color: #6b7280;">Пример CRUD с реактивным store</div>
        </a>
      </div>
    </div>
    
  `,
})
export class DashboardComponent {
}
