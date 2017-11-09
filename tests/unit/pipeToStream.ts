const { assert } = intern.getPlugin('chai');
const { registerSuite } = intern.getInterface('object');
import Task from '@dojo/core/async/Task';
import { queueTask } from '@dojo/core/queue';
import { Headers, Response } from '@dojo/core/request';
import Observable from '@dojo/core/Observable';
import ArraySink from '../../src/ArraySink';
import pipeToStream from '../../src/pipeToStream';
import WritableStream from '../../src/WritableStream';

class MockResponse extends Response {
	_data: string[];
	data: Observable<string>;
	download: Observable<number>;

	constructor(data: string[]) {
		super();

		this.data = new Observable(observer => {
			queueTask(() => {
				data.forEach(chunk => {
					observer.next(chunk);
				});

				observer.complete();
			});
		});
		this._data = data;

	}

	get bodyUsed(): boolean {
		return false;
	}

	get headers(): Headers {
		return new Headers();
	}

	get ok(): boolean {
		return true;
	}

	get status(): number {
		return 200;
	}

	get statusText(): string {
		return 'OK';
	}

	get url(): string {
		return '';
	}

	arrayBuffer(): Task<ArrayBuffer> {
		return <any> null;
	}

	blob(): Task<Blob> {
		return <any> null;
	}

	formData(): Task<FormData> {
		return <any> null;
	}

	text(): Task<string> {
		return <any> null;
	}
}

registerSuite('pipeToStream', {

	'sends data to stream'() {
		const response = new MockResponse([
			'bit 1',
			'bit 2'
		]);

		const sink = new ArraySink<string>();
		const stream = new WritableStream<string>(sink);

		return pipeToStream(response, stream).then(() => {
			return new Promise((resolve) => {
				setTimeout(function () {
					assert.deepEqual(sink.chunks, [ 'bit 1', 'bit 2' ]);
					resolve();
				}, 10);
			});
		});
	}
});
