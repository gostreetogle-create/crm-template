import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

if (typeof DragEvent === 'undefined') {
  class MockDragEvent extends Event {
    readonly dataTransfer: DataTransfer | null = null;
    constructor(type: string, init?: DragEventInit) {
      super(type, init);
      Object.defineProperty(this, 'dataTransfer', {
        value: init?.dataTransfer ?? null,
        writable: false,
      });
    }
  }
  (globalThis as any).DragEvent = MockDragEvent;
}
