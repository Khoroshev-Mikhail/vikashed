import { useState, useCallback, useEffect } from 'react';

/**
 * Пользовательский хук для копирования текста в буфер обмена и управления состоянием скопированного текста.
 * @returns Объект, содержащий состояние `copied`:boolean которая через три секунды после ченджа вернется в состояние false и функцию `copyToClipboard` для копирования текста.
 */
export const useClipboardText = (): { copied: boolean; copyToClipboard: (text: string) => void } => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error('Ошибка при копировании в буфер обмена:', error);
      });
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (copied) {
      timeoutId = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [copied]);

  return { copied, copyToClipboard };
};

export const useConsole = (value: any) => {
    useEffect(()=>{
        console.log(value)
    }, [value])
}