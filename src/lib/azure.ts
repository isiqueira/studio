
'use server';

import { BlobServiceClient } from '@azure/storage-blob';

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
