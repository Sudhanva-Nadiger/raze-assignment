'use client';

import * as React from 'react';
import { useEdgeStore } from '@/lib/edgeStore';
import { Button } from './button';
import { Input } from './input';
import { useRouter } from 'next/navigation';

export default function Page({
  imageUrl,
  userId,
  triggerCloseId,
  updateImage,
}: {
  imageUrl?: string | null,
  userId: number
  triggerCloseId: string,
  updateImage: (userId: number, url: string) => Promise<{ success: boolean, message: string }>
}) {
  const [file, setFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>(0);
  const [error, setError] = React.useState<string | null>(null);
  const { edgestore } = useEdgeStore();

  const router = useRouter();

  const handleSubmit = async () => {
    if (file) {
      const uploadPromise = edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          setProgress(progress);
        },
      });

      const deletePromise = !imageUrl ? new Promise((resolve, _) => resolve("")) : edgestore.publicFiles.delete({ url: imageUrl });

      const res = await Promise.all([uploadPromise, deletePromise]);
      const { url } = res[0];

      const { success, message } = await updateImage(userId, url);

      if (success) {
        router.refresh();
        document.getElementById(triggerCloseId)?.click();
      } else {
        setError(message);
      }
    }
  }

  return (
    <div className='space-y-5'>
      <Input
        required
        type="file"
        accept='image/*'
        size={1_000_000}
        max={1}
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <div className='h-[6px] w-full border rounded overflow-hidden'>
        <div
          style={{ width: `${progress}%` }}
          className='h-full bg-green-500 transition-all duration-150'
        />
      </div>
      <Button
        disabled={!file || progress > 0}
        className='w-full'
        onClick={() => handleSubmit()}
      >
        Upload
      </Button>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
}