import { describe, it, expect } from 'vitest'

const isEven = (number: number) => {
	if (typeof number !== 'number') {
		throw 'Not a valid number'
	}
	return number % 2 === 0
}
// Red, Green, Refactor
// TDD - Test Driven Developement

describe('testing isEven function', () => {
	it('returns true if number is 2', () => {
		expect(isEven(2)).toBe(true)
	})

	it('returns false if number is 3', () => {
		expect(isEven(3)).toBe(false)
	})

	it('returns false if number (11) is odd', () => {
		expect(isEven(11)).toBe(false)
	})

	it('throws if arg is not of type number', () => {
		expect(() => isEven('sdfdsrffs' as any)).toThrowError(/Not a valid number/i)
	})
})