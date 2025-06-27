
'use server';

import { BlobClient, BlobDownloadResponseParsed, BlobServiceClient, ContainerClient } from '@azure/storage-blob';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!connectionString) {
  throw new Error('Azure Storage connection string is not configured. Please set AZURE_STORAGE_CONNECTION_STRING in your .env.local file.');
}

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

/**
 * Retrieves a file from Azure Blob Storage and returns it as a Buffer.
 * @param containerName The name of the container in Azure Blob Storage.
 * @param blobName The name of the blob (file) to retrieve.
 * @returns A Promise that resolves to a Buffer containing the file's data.
 */
export async function getBlobFile(containerName: string, blobName: string): Promise<Buffer> {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    const downloadResponse = await blobClient.downloadToBuffer();
    console.log('download success');
    return downloadResponse;
  } catch (error) {
    console.error(`Failed to retrieve blob "${blobName}" from container "${containerName}":`, error);
    throw new Error('Could not retrieve file from Azure Blob Storage.');
  }
}

export async function downloadBlobToString(
  containerClient: ContainerClient,
  blobName: string
): Promise<string> {

  const blobClient: BlobClient = containerClient.getBlobClient(blobName);

  const downloadResponse: BlobDownloadResponseParsed =
    await blobClient.download();

  if (!downloadResponse.errorCode && downloadResponse.readableStreamBody) {
    const downloaded = await streamToBuffer(
      downloadResponse.readableStreamBody
    );
    if (downloaded) {
      console.log('Downloaded blob content:', downloaded.toString());
      return downloaded.toString();
    } else {
      console.error('Failed to download blob content.');
      return '';
    }
  }
}

function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    readableStream.on('data', (data) => {
      const content: Buffer = data instanceof Buffer ? data : Buffer.from(data);
      chunks.push(content);
    });
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on('error', reject);
  });
}