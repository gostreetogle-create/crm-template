import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { provideUiPrimengKit } from '../kits/ui-primeng-kit/angular';
import { provideLayoutShellKit } from '../kits/layout-shell-kit/angular';
import { provideAuthRbacKit } from '../kits/auth-rbac-kit/angular';
import { provideCrudPageKit } from '../kits/crud-page-kit/angular';
import { provideOptionsResolver } from '../kits/options-resolver-kit/angular';
import { provideEntityPickerKit } from '../kits/entity-picker-kit/angular';
import { providePlaceholderKit } from '../kits/placeholder-kit/angular';
import { provideDocumentCanvasKit } from '../kits/document-canvas-kit/angular';
import { providePhotoUploaderKit } from '../kits/photo-uploader-kit/angular';
import { provideEavKit } from '../kits/eav-kit/angular';
import { provideQuotationEditorKit } from '../kits/quotation-editor/angular';
import { provideSchemaDataTableKit } from '../kits/schema-data-table-kit/angular';
import { provideSchemaTableKit } from '../kits/schema-table-kit/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { cssLayer: { name: 'primeng', order: 'primeng' } },
      },
    }),

    // Bricks
    provideUiPrimengKit(),
    provideAuthRbacKit({
      getUser: () => ({ id: 'admin', permissions: ['*'] }),
    }),
    providePlaceholderKit(),
    provideOptionsResolver({ entities: [] }),

    // Composites
    provideLayoutShellKit({
      appTitle: 'CRM Template',
      navItems: [
        { label: 'Dashboard', route: '/dashboard', icon: 'pi pi-home' },
        { label: 'UI Catalog', route: '/ui-catalog', icon: 'pi pi-palette' },
        { label: 'Products', route: '/products', icon: 'pi pi-box' },
      ],
    }),
    provideSchemaDataTableKit(),
    provideEntityPickerKit({ entities: [] }),
    provideCrudPageKit({ checkPermission: () => true }),
    provideDocumentCanvasKit(),
    provideEavKit({
      loadAttributes: async () => [],
      saveAttributes: async () => {},
    }),
    providePhotoUploaderKit(),
    provideSchemaTableKit({ entities: [] }),

    // Applications
    provideQuotationEditorKit(),
  ],
};