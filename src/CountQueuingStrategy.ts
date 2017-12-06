import QueuingStrategy from './QueuingStrategy';

export default class CountQueuingStrategy<T> extends QueuingStrategy<T> {
	size(chunk?: T | null): number {
		return 1;
	}
}
