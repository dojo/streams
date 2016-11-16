import ReadableStreamController from '../../../src/ReadableStreamController';
import { Source } from '../../../src/ReadableStream';
import Promise from 'dojo-shim/Promise';

export default class BaseStringSource implements Source<string> {

	start(controller: ReadableStreamController<string>): Promise<void> {
		return Promise.resolve();
	}

	pull(controller: ReadableStreamController<string>): Promise<void> {
		return Promise.resolve();
	}

	cancel(reason?: any): Promise<void> {
		return Promise.resolve();
	}
}
