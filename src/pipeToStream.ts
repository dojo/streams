import { Response } from '@dojo/core/request';
import Promise from '@dojo/shim/Promise';
import WritableStream from './WritableStream';

export default function pipeToStream<T>(response: Response, stream: WritableStream<T>): Promise<WritableStream<T>> {
	return new Promise<WritableStream<T>>((resolve) => {
		response.data.subscribe({
			next: chunk => {
				stream.write(chunk);
			},
			error: error => {
				stream.abort(error);
			},
			complete: () => {
				stream.close();
				resolve(stream);
			}
		});

		// don't want to save the body because the file could be huge
		// if the response supports it (NodeResponse), we want to set `downloadBody` to false, so we don't
		// stream the entire body.
		if ('downloadBody' in response) {
			(<any> response).downloadBody = false;
		}
	});
}
