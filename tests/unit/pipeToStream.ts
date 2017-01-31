import * as assert from 'intern/chai!assert';
import * as registerSuite from 'intern!object';
import pipeToStream from '../../src/pipeToStream';
import { Headers, Response } from '@dojo/core/request';
import { queueTask } from '@dojo/core/queue';
import Task from '@dojo/core/async/Task';
import ArraySink from '../../src/ArraySink';
import WritableStream from '../../src/WritableStream';

class MockResponse extends Response {
	data: string[];

	constructor(data: string[]) {
		super();

		this.data = data;

		queueTask(() => {
			data.forEach(chunk => {
				this.emit({
					type: 'data',
					response: this,
					chunk
				});
			});

			this.emit({
				type: 'end',
				response: this
			});
		});
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

registerSuite({
	name: 'pipeToStream',

	'sends data to stream'() {
		const response = new MockResponse([
			'bit 1',
			'bit 2'
		]);

		const sink = new ArraySink<string>();
		const stream = new WritableStream<string>(sink);

		return pipeToStream(response, stream).then(() => {
			assert.deepEqual(sink.chunks, [ 'bit 1', 'bit 2' ]);
		});
	}
});
