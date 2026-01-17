import { useState } from 'react';
import { BiFile, BiLink, BiTrash, BiUpload, BiX } from 'react-icons/bi';
import { toast } from 'sonner';

export interface DocumentItem {
  name: string;
  url: string;
}

interface DocumentManagerProps {
  documents: DocumentItem[];
  onChange: (documents: DocumentItem[]) => void;
  maxDocuments?: number;
  maxSizeMB?: number;
  label?: string;
}

const DocumentManager = ({
  documents,
  onChange,
  maxDocuments = 10,
  maxSizeMB = 10,
  label = 'Documents',
}: DocumentManagerProps) => {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const isValidUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const getFileExtension = (filename: string): string => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const getFileIcon = (filename: string): string => {
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

  const handleAddUrl = () => {
    if (!urlInput.trim()) {
      toast.error('Please enter a document URL');
      return;
    }

    if (!isValidUrl(urlInput.trim())) {
      toast.error('Please enter a valid URL');
      return;
    }

    if (documents.length >= maxDocuments) {
      toast.error(`Maximum ${maxDocuments} documents allowed`);
      return;
    }

    const name = nameInput.trim() || `Document ${documents.length + 1}`;
    const newDoc: DocumentItem = { name, url: urlInput.trim() };

    if (documents.some((doc) => doc.url === newDoc.url)) {
      toast.error('This document URL is already added');
      return;
    }

    onChange([...documents, newDoc]);
    setUrlInput('');
    setNameInput('');
    setShowUrlInput(false);
    toast.success('Document URL added');
  };

  const handleFileUpload = async (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File size should be less than ${maxSizeMB}MB`);
      return;
    }

    if (documents.length >= maxDocuments) {
      toast.error(`Maximum ${maxDocuments} documents allowed`);
      return;
    }

    try {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newDoc: DocumentItem = {
          name: file.name,
          url: base64String,
        };

        if (!documents.some((doc) => doc.url === newDoc.url)) {
          onChange([...documents, newDoc]);
          toast.success('Document uploaded successfully');
        } else {
          toast.error('This document is already added');
        }
      };
      reader.onerror = () => {
        toast.error('Failed to read document file');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      if (documents.length < maxDocuments) {
        handleFileUpload(file);
      }
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      if (documents.length < maxDocuments) {
        handleFileUpload(file);
      }
    });
  };

  const handleRemoveDocument = (index: number) => {
    const updated = documents.filter((_, i) => i !== index);
    onChange(updated);
    toast.success('Document removed');
  };

  const handleUpdateName = (index: number, newName: string) => {
    const updated = [...documents];
    updated[index] = { ...updated[index], name: newName };
    onChange(updated);
  };

  return (
    <div className='space-y-4'>
      <label className='block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
        {label}
      </label>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
          dragActive
            ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20'
            : 'border-neutral-300 bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800/50'
        }`}
      >
        <input
          type='file'
          id='document-upload'
          multiple={false}
          onChange={handleFileInput}
          className='hidden'
          accept='.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar'
          disabled={isUploading || documents.length >= maxDocuments}
        />
        <label
          htmlFor='document-upload'
          className='flex cursor-pointer flex-col items-center justify-center gap-2'
        >
          <BiUpload
            size={32}
            className={`text-neutral-400 ${isUploading ? 'animate-pulse' : ''}`}
          />
          <div className='text-sm text-neutral-600 dark:text-neutral-400'>
            {isUploading ? (
              <span>Uploading...</span>
            ) : documents.length >= maxDocuments ? (
              <span>Maximum {maxDocuments} documents reached</span>
            ) : (
              <span>
                Drag and drop a document here, or click to select a file
              </span>
            )}
          </div>
          <div className='text-xs text-neutral-500 dark:text-neutral-500'>
            Max size: {maxSizeMB}MB | Supported: PDF, DOC, DOCX, XLS, XLSX, PPT,
            PPTX, TXT, ZIP, RAR
          </div>
        </label>
      </div>

      {/* URL Input Toggle */}
      {!showUrlInput ? (
        <button
          type='button'
          onClick={() => setShowUrlInput(true)}
          disabled={documents.length >= maxDocuments}
          className='flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800'
        >
          <BiLink size={18} />
          <span>Add Document URL</span>
        </button>
      ) : (
        <div className='space-y-2 rounded-lg border border-neutral-300 p-4 dark:border-neutral-600'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
              Document URL
            </label>
            <button
              type='button'
              onClick={() => {
                setShowUrlInput(false);
                setUrlInput('');
                setNameInput('');
              }}
              className='text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
            >
              <BiX size={20} />
            </button>
          </div>
          <input
            type='text'
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder='https://example.com/document.pdf'
            className='w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-800'
          />
          <input
            type='text'
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder='Document name (optional)'
            className='w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-800'
          />
          <button
            type='button'
            onClick={handleAddUrl}
            disabled={!urlInput.trim()}
            className='w-full rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-600 disabled:opacity-50'
          >
            Add URL
          </button>
        </div>
      )}

      {/* Documents List */}
      {documents.length > 0 && (
        <div className='space-y-2'>
          <div className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
            Added Documents ({documents.length}/{maxDocuments})
          </div>
          <div className='space-y-2'>
            {documents.map((doc, index) => (
              <div
                key={index}
                className='flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-800'
              >
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-xl dark:bg-indigo-900'>
                  {getFileIcon(doc.name)}
                </div>
                <div className='flex-1'>
                  <input
                    type='text'
                    value={doc.name}
                    onChange={(e) => handleUpdateName(index, e.target.value)}
                    className='w-full rounded border-0 bg-transparent text-sm font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:text-neutral-200'
                    placeholder='Document name'
                  />
                  <div className='mt-1 text-xs text-neutral-500 dark:text-neutral-400'>
                    {doc.url.startsWith('data:')
                      ? 'Uploaded file'
                      : doc.url.substring(0, 50) + '...'}
                  </div>
                </div>
                <button
                  type='button'
                  onClick={() => handleRemoveDocument(index)}
                  className='rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20'
                >
                  <BiTrash size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;
