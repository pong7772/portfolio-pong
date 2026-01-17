import { useState } from 'react';
import { LuDownload, LuExternalLink, LuFileText, LuX } from 'react-icons/lu';

import Card from '@/common/components/elements/Card';

export interface DocumentItem {
  name: string;
  url: string;
}

interface DocumentPreviewProps {
  documents: DocumentItem[];
}

const DocumentPreview = ({ documents }: DocumentPreviewProps) => {
  // Auto-preview Google Drive documents by default
  const [previewingDoc, setPreviewingDoc] = useState<number | null>(() => {
    // Find first Google Drive document index to auto-preview
    const firstGoogleDriveIndex = documents.findIndex((doc) =>
      doc.url.includes('drive.google.com'),
    );
    return firstGoogleDriveIndex >= 0 ? firstGoogleDriveIndex : null;
  });

  if (!documents || documents.length === 0) {
    return null;
  }

  const getFileExtension = (filename: string): string => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  // Extract Google Drive file ID from various URL formats
  const getGoogleDriveFileId = (url: string): string | null => {
    // Format: https://drive.google.com/file/d/FILE_ID/view
    let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];

    // Format: https://drive.google.com/open?id=FILE_ID
    match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match) return match[1];

    return null;
  };

  // Check if URL is a Google Drive link
  const isGoogleDriveUrl = (url: string): boolean => {
    return url.includes('drive.google.com');
  };

  // Get Google Drive preview URL
  const getGoogleDrivePreviewUrl = (url: string): string | null => {
    const fileId = getGoogleDriveFileId(url);
    if (!fileId) return null;
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  const getFileIcon = (filename: string) => {
    const ext = getFileExtension(filename);
    const iconMap: { [key: string]: string } = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      xls: '📊',
      xlsx: '📊',
      ppt: '📊',
      pptx: '📊',
      txt: '📄',
      zip: '📦',
      rar: '📦',
    };
    return iconMap[ext] || '📄';
  };

  const handleDownload = (doc: DocumentItem) => {
    if (doc.url.startsWith('data:')) {
      // Base64 file - create download link
      const link = document.createElement('a');
      link.href = doc.url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (isGoogleDriveUrl(doc.url)) {
      // Google Drive file - get direct download URL
      const fileId = getGoogleDriveFileId(doc.url);
      if (fileId) {
        window.open(
          `https://drive.google.com/uc?export=download&id=${fileId}`,
          '_blank',
        );
      } else {
        window.open(doc.url, '_blank');
      }
    } else {
      // External URL - open in new tab
      window.open(doc.url, '_blank');
    }
  };

  const handlePreview = (doc: DocumentItem, index: number) => {
    // If it's a Google Drive link, show embedded preview
    if (isGoogleDriveUrl(doc.url)) {
      setPreviewingDoc(index);
      return;
    }

    if (doc.url.startsWith('data:')) {
      // Base64 file - open in new tab
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>${doc.name}</title>
              <style>
                body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                iframe { width: 100%; height: calc(100vh - 40px); border: none; }
              </style>
            </head>
            <body>
              <iframe src="${doc.url}" type="application/pdf"></iframe>
            </body>
          </html>
        `);
      }
    } else {
      // Try to use Google Docs Viewer for preview
      const ext = getFileExtension(doc.name);
      if (ext === 'pdf') {
        window.open(
          `https://docs.google.com/viewer?url=${encodeURIComponent(doc.url)}&embedded=true`,
          '_blank',
        );
      } else {
        // For other file types, just open the URL
        window.open(doc.url, '_blank');
      }
    }
  };

  return (
    <Card className='border-neutral-200 p-6 dark:border-neutral-800'>
      <div className='mb-4 flex items-center gap-2'>
        <LuFileText
          size={20}
          className='text-indigo-600 dark:text-indigo-400'
        />
        <h3 className='text-lg font-semibold text-neutral-800 dark:text-neutral-200'>
          Documents ({documents.length})
        </h3>
      </div>
      <div className='space-y-3'>
        {documents.map((doc, index) => {
          const isGoogleDrive = isGoogleDriveUrl(doc.url);
          const googleDrivePreviewUrl = isGoogleDrive
            ? getGoogleDrivePreviewUrl(doc.url)
            : null;
          const showEmbeddedPreview =
            previewingDoc === index && googleDrivePreviewUrl;

          return (
            <div key={index}>
              <div className='flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-4 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:bg-neutral-800'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-2xl dark:bg-indigo-900'>
                    {getFileIcon(doc.name)}
                  </div>
                  <div>
                    <div className='font-medium text-neutral-800 dark:text-neutral-200'>
                      {doc.name}
                    </div>
                    <div className='text-xs text-neutral-500 dark:text-neutral-400'>
                      {isGoogleDrive
                        ? 'Google Drive'
                        : getFileExtension(doc.name).toUpperCase()}{' '}
                      Document
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => handlePreview(doc, index)}
                    className='flex items-center gap-1.5 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-200 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    title='Preview'
                  >
                    <LuExternalLink size={16} />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleDownload(doc)}
                    className='flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700'
                    title='Download'
                  >
                    <LuDownload size={16} />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Embedded Google Drive Preview */}
              {showEmbeddedPreview && (
                <div className='mt-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50'>
                  <div className='mb-3 flex items-center justify-between'>
                    <h4 className='text-sm font-semibold text-neutral-800 dark:text-neutral-200'>
                      Preview: {doc.name}
                    </h4>
                    <button
                      onClick={() => setPreviewingDoc(null)}
                      className='rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200'
                      title='Close preview'
                    >
                      <LuX size={18} />
                    </button>
                  </div>
                  <div className='relative overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900'>
                    <iframe
                      src={googleDrivePreviewUrl || ''}
                      title={`Preview of ${doc.name}`}
                      className='h-[600px] w-full border-0'
                      allow='autoplay'
                    />
                  </div>
                  <div className='mt-2 text-xs text-neutral-500 dark:text-neutral-400'>
                    Having trouble viewing?{' '}
                    <button
                      onClick={() => window.open(doc.url, '_blank')}
                      className='text-indigo-600 underline hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300'
                    >
                      Open in Google Drive
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DocumentPreview;
