import WritableStream from './WritableStream';
import { Response, DataEvent } from '@dojo/core/request';
import { NodeResponse } from '@dojo/core/request/providers/node';
import Promise from '@dojo/shim/Promise';

export default function pipeToStream<T>(response: Response, stream: WritableStream<T>): Promise<WritableStream<T>> {
	return new Promise<WritableStream<T>>((resolve) => {
		response.on('data', (event: DataEvent) => {
			stream.write(event.chunk);
		});

		response.on('end', () => {
			stream.close();
			resolve(stream);
		});

		// don't want to save the body because the file could be huge
		if (response instanceof NodeResponse) {
			response.downloadBody = false;
		}
	});
}
