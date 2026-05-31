import { describe, it, expect } from 'vitest';
import { hasPermission, hasAnyPermission, DEMO_PERMISSIONS } from '../src/kits/auth-rbac-kit/core/types';
import type { AuthUser } from '../src/kits/auth-rbac-kit/core/types';

const admin: AuthUser = {
  id: '1',
  permissions: ['office.products.view', 'office.products.edit', 'office.products.delete', 'office.products.create'],
};
const manager: AuthUser = {
  id: '2',
  permissions: ['office.products.view', 'office.products.edit'],
};
const guest: AuthUser = { id: '3', permissions: [] };

describe('hasPermission', () => {
  it('returns false for null user', () => {
    expect(hasPermission(null, 'office.products.view')).toBe(false);
  });

  it('returns false for undefined user', () => {
    expect(hasPermission(undefined, 'office.products.view')).toBe(false);
  });

  it('returns true when user has permission', () => {
    expect(hasPermission(manager, 'office.products.view')).toBe(true);
    expect(hasPermission(manager, 'office.products.edit')).toBe(true);
  });

  it('returns false when user lacks permission', () => {
    expect(hasPermission(manager, 'office.products.delete')).toBe(false);
    expect(hasPermission(guest, 'office.products.view')).toBe(false);
  });

  it('returns true for empty permission string', () => {
    expect(hasPermission(admin, '')).toBe(true);
  });
});

describe('hasAnyPermission', () => {
  it('returns true if user has at least one', () => {
    expect(
      hasAnyPermission(manager, ['office.products.view', 'office.products.delete']),
    ).toBe(true);
  });

  it('returns false if user has none', () => {
    expect(
      hasAnyPermission(guest, ['office.products.view', 'office.products.create']),
    ).toBe(false);
  });

  it('handles null user', () => {
    expect(hasAnyPermission(null, ['office.products.view'])).toBe(false);
  });
});

describe('DEMO_PERMISSIONS', () => {
  it('has products and quotations catalogs', () => {
    expect(DEMO_PERMISSIONS.products.view).toBe('office.products.view');
    expect(DEMO_PERMISSIONS.quotations.edit).toBe('office.quotations.edit');
  });
});
