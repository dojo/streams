const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

import SizeQueue from '../../src/SizeQueue';

let queue: SizeQueue<string>;
registerSuite('SizeQueue', {

	beforeEach() {
		queue = new SizeQueue<string>();
	},

	tests: {
		'enqueue() and dequeue()'() {
			let str = 'test';
			queue.enqueue(str, str.length);
			assert.lengthOf(queue, 1);
			assert.strictEqual(queue.dequeue(), str);
			assert.lengthOf(queue, 0);
			assert.strictEqual(queue.dequeue(), null);
		},

		'totalSize'() {
			let str = 'test';
			let length = 4;
			queue.enqueue(str, length);
			assert.strictEqual(queue.totalSize, length);
			queue.enqueue(str, length);
			assert.strictEqual(queue.totalSize, length * 2);
			queue.enqueue(str, length);
			assert.strictEqual(queue.totalSize, length * 3);
		},

		'empty()'() {
			assert.lengthOf(queue, 0);
			queue.enqueue('test', 4);
			assert.lengthOf(queue, 1);
			queue.empty();
			assert.lengthOf(queue, 0);
		},

		'peek()'() {
			let str = 'test';
			queue.enqueue(str, str.length);
			assert.lengthOf(queue, 1);
			assert.strictEqual(queue.peek(), str);
			assert.lengthOf(queue, 1);
			queue.dequeue();
			assert.strictEqual(queue.peek(), null);
		}
	}
});
