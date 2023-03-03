export function convertScale(num: number): number {
	num -= 1;
	return Math.round(num * 3.33) + 1;
}
