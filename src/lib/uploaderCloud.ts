import { UploadApiResponse } from 'cloudinary';
import cloudinary from './cloudinary';

export async function uploadFileImage(buffer: Buffer<ArrayBuffer>) {
	return await new Promise<UploadApiResponse>((resolve, reject) => {
		cloudinary.uploader
			.upload_stream(
				{ folder: 'users', resource_type: 'auto' },
				(error, uploadResult) => {
					if (error) {
						return reject(error);
					}
					return resolve(uploadResult!);
				},
			)
			.end(buffer);
	});
}
