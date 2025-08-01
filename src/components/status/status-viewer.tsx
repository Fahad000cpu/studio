
'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Status } from '@/lib/data';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

type StatusViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  statuses: Status[];
  startIndex: number;
};

export function StatusViewer({ isOpen, onClose, statuses, startIndex }: StatusViewerProps) {
  const [currentUserIndex, setCurrentUserIndex] = useState(startIndex);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<NodeJS.Timeout>();
  const progressTimerRef = useRef<NodeJS.Timeout>();

  const currentStatus = statuses[currentUserIndex];
  const currentItem = currentStatus?.items[currentItemIndex];

  useEffect(() => {
    setCurrentUserIndex(startIndex);
    setCurrentItemIndex(0);
  }, [startIndex, isOpen]);

  const goToNextItem = () => {
    if (currentItemIndex < currentStatus.items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    } else {
      goToNextUser();
    }
  };

  const goToPrevItem = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    } else {
      goToPrevUser();
    }
  };

  const goToNextUser = () => {
    if (currentUserIndex < statuses.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentItemIndex(0);
    } else {
      onClose();
    }
  };

  const goToPrevUser = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      setCurrentItemIndex(0);
    }
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    if (!isOpen || !currentItem || isPaused) {
      clearTimeout(timerRef.current);
      clearInterval(progressTimerRef.current);
      return;
    }

    setProgress(0);

    const startTime = Date.now();
    const duration = currentItem.duration;

    const updateProgress = () => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min((elapsedTime / duration) * 100, 100);
        setProgress(newProgress);
    };

    progressTimerRef.current = setInterval(updateProgress, 100);
    timerRef.current = setTimeout(goToNextItem, duration);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(progressTimerRef.current);
    };
  }, [currentItemIndex, currentUserIndex, currentItem, isOpen, isPaused, goToNextItem]);
  

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  
  if (!isOpen || !currentStatus) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="bg-black/90 border-0 p-0 w-screen h-screen max-w-full sm:rounded-none flex items-center justify-center">
        <div className="relative w-full h-full max-w-md max-h-[95vh] aspect-[9/16] flex flex-col justify-center">
            
            {/* Image/Video */}
            <div className="absolute inset-0 rounded-lg overflow-hidden" onMouseDown={() => setIsPaused(true)} onMouseUp={() => setIsPaused(false)} onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)}>
                {currentItem.type === 'image' && (
                    <Image
                        src={currentItem.url}
                        alt="Status"
                        fill
                        className="object-cover"
                        data-ai-hint={currentItem.dataAiHint}
                    />
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-y-0 left-0 w-1/3 z-20" onClick={goToPrevItem}></div>
            <div className="absolute inset-y-0 right-0 w-1/3 z-20" onClick={goToNextItem}></div>

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 z-30">
                <div className="flex items-center gap-2 mb-2">
                    {currentStatus.items.map((_, index) => (
                        <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-100 ease-linear"
                                style={{
                                    width: `${index < currentItemIndex ? 100 : index === currentItemIndex ? progress : 0}%`
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                        <Avatar className="w-9 h-9">
                            <AvatarImage src={currentStatus.user.avatar} />
                            <AvatarFallback>{currentStatus.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{currentStatus.user.name}</p>
                            <p className="text-xs text-white/80">{formatDistanceToNow(new Date(currentStatus.timestamp), { addSuffix: true })}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white" onClick={handlePauseResume}>
                           {isPaused ? <Play className="h-5 w-5"/> : <Pause className="h-5 w-5" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Prev/Next User Buttons */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/10 hover:text-white disabled:hidden"
                onClick={goToPrevUser}
                disabled={currentUserIndex === 0}
            >
                <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/10 hover:text-white disabled:hidden"
                onClick={goToNextUser}
                disabled={currentUserIndex === statuses.length - 1}
            >
                <ChevronRight className="h-8 w-8" />
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
