export interface VideoFile {
    id: string;
    name: string;
    mimeType: string;
    size?: number;
    createdTime: string;
    source: 'google' | 'microsoft';
    thumbnailLink?: string;
    status: 'pending' | 'downloading' | 'uploading' | 'success' | 'error' | 'deleted';
    downloadProgress: number;
    uploadProgress: number;
    selected: boolean;
    deleteAfter: boolean;
    error?: string;
}
