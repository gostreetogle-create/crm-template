import { Component } from '@angular/core';
import { KpTagComponent } from '../../kits/ui-primeng-kit/angular';

@Component({
  selector: 'app-tag-demo',
  standalone: true,
  imports: [KpTagComponent],
  template: `
    <div style="padding: 32px; max-width: 800px; margin: 0 auto;">
      <h1 style="font-size: 28px; margin-bottom: 8px;">🏷️ Tag / Бейдж</h1>
      <p style="color: #6b7280; margin-bottom: 32px;">Артикул KP-006. Все варианты severity:</p>

      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <up-kp-tag value="info" severity="info" />
        <up-kp-tag value="success" severity="success" />
        <up-kp-tag value="warn" severity="warn" />
        <up-kp-tag value="danger" severity="danger" />
        <up-kp-tag value="secondary" severity="secondary" />
        <up-kp-tag value="contrast" severity="contrast" />
      </div>
    </div>
  `,
})
export class TagDemoComponent {}
