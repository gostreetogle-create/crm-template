import { describe, it, expect } from 'vitest';
import { resolvePlaceholders, extractPlaceholderTokens } from '../src/kits/placeholder-kit/core/resolve-placeholders';
import type { PlaceholderContext } from '../src/kits/placeholder-kit/core/types';

const ctx: PlaceholderContext = {
  org: { name: 'ООО Ромашка', inn: '1234567890', address: 'г. Москва' },
  client: { name: 'ИП Иванов', inn: '0987654321' },
  doc: { number: 'КП-2025-001', date: '01.06.2025' },
};

describe('resolvePlaceholders', () => {
  it('replaces known tokens', () => {
    const result = resolvePlaceholders('Организация: {{org.name}}, ИНН {{org.inn}}', ctx);
    expect(result).toBe('Организация: ООО Ромашка, ИНН 1234567890');
  });

  it('keeps unknown tokens intact', () => {
    const result = resolvePlaceholders('{{doc.unknown}}', ctx);
    expect(result).toBe('{{doc.unknown}}');
  });

  it('returns empty string for empty input', () => {
    expect(resolvePlaceholders('', ctx)).toBe('');
  });

  it('uses field aliases', () => {
    const result = resolvePlaceholders('{{org.address}}', ctx, {
      fieldAliases: { address: 'inn' },
    });
    expect(result).toBe('1234567890');
  });

  it('resolves multiple tokens', () => {
    const result = resolvePlaceholders(
      '{{doc.number}} от {{doc.date}}',
      ctx,
    );
    expect(result).toBe('КП-2025-001 от 01.06.2025');
  });
});

describe('extractPlaceholderTokens', () => {
  it('extracts unique tokens', () => {
    const tokens = extractPlaceholderTokens('{{org.name}} и {{org.inn}}');
    expect(tokens).toEqual(['org.inn', 'org.name']);
  });

  it('returns empty array for empty string', () => {
    expect(extractPlaceholderTokens('')).toEqual([]);
  });

  it('extracts nested tokens', () => {
    const tokens = extractPlaceholderTokens('{{client.name}}, {{client.inn}}');
    expect(tokens).toContain('client.name');
    expect(tokens).toContain('client.inn');
  });
});
