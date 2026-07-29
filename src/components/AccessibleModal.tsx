'use client';

import React, { useEffect, useId, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

let scrollLockCount = 0;
let previousBodyOverflow = '';

function lockBodyScroll() {
  if (scrollLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  scrollLockCount += 1;

  return () => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);

    if (scrollLockCount === 0) {
      document.body.style.overflow = previousBodyOverflow;
    }
  };
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) =>
      !element.hasAttribute('disabled') &&
      element.getAttribute('aria-hidden') !== 'true' &&
      element.getClientRects().length > 0,
  );
}

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  labelledBy?: string;
  describedBy?: string;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  closeOnBackdropClick?: boolean;
  backdropClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  labelledBy,
  describedBy,
  initialFocusRef,
  closeOnBackdropClick = true,
  backdropClassName = '',
  contentClassName = '',
  children,
}) => {
  const generatedId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const generatedTitleId = `${generatedId}-title`;
  const generatedDescriptionId = `${generatedId}-description`;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const unlockBodyScroll = lockBodyScroll();

    const initialFocusFrame = window.requestAnimationFrame(() => {
      const focusTarget =
        initialFocusRef?.current ?? (dialog ? getFocusableElements(dialog)[0] : null) ?? dialog;
      focusTarget?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;

      const focusableElements = getFocusableElements(dialog);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === firstElement || !dialog.contains(activeElement))) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === lastElement || !dialog.contains(activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(initialFocusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      unlockBodyScroll();

      if (previouslyFocused) {
        window.requestAnimationFrame(() => {
          if (previouslyFocused.isConnected) {
            previouslyFocused.focus();
          }
        });
      }
    };
  }, [initialFocusRef, isOpen]);

  if (!isOpen) return null;

  const titleId = labelledBy ?? generatedTitleId;
  const descriptionId = describedBy ?? (description ? generatedDescriptionId : undefined);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 bg-slate-950/80 backdrop-blur-md ${backdropClassName}`}
      onClick={(event) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={contentClassName}
      >
        {!labelledBy && (
          <h2 id={generatedTitleId} className="sr-only">
            {title}
          </h2>
        )}
        {!describedBy && description && (
          <p id={generatedDescriptionId} className="sr-only">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};
