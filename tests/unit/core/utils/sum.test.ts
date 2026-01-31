import { describe, it, expect } from 'vitest';
import { sum } from '@/core/utils/sum';

describe('sum', () => {
    it('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });

    it('adds -1 + 1 to equal 0', () => {
        expect(sum(-1, 1)).toBe(0);
    });
});
