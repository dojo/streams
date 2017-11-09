const { assert } = intern.getPlugin('chai');
const { registerSuite } = intern.getInterface('object');
import CountQueuingStrategy from '../../src/CountQueuingStrategy';
import WritableStream, { State } from '../../src/WritableStream';
import ManualSink from './helpers/ManualSink';

const ASYNC_TIMEOUT = 1000;

registerSuite('CountQueuingStrategy', {

	size(this: any) {
		let dfd = this.async(ASYNC_TIMEOUT);
		let sink = new ManualSink<string>();

		let stream = new WritableStream<string>(sink, new CountQueuingStrategy<string>({
			highWaterMark: 2
		}));

		let promise = stream.write('test value 1');
		assert.strictEqual(stream.state, State.Writable);

		stream.write('test value 2');
		assert.strictEqual(stream.state, State.Writable);

		stream.write('test value 3');
		assert.strictEqual(stream.state, State.Waiting);

		setTimeout(function () {
			sink.next();
		}, 20);

		promise.then(dfd.callback(function () {
			assert.strictEqual(stream.state, State.Writable);
		}), function (error: Error) {
			dfd.reject(error);
		});
	}
});
