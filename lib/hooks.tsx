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
export function formatDate(str: string) {
  const date = new Date(str)
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
}
export function calcReadTime(str: string) {
  const length = str.length;
  if (length > 0) {
    const result = Math.ceil(length / 800);
    return result;
  }
  return 1;
}
export function getArticleWord(number: number) {
  if (number === 1) {
    return number + " статья";
  } else if (number >= 2 && number <= 4) {
    return number + " статьи";
  } else {
    return number + " статей";
  }
}
// export function getMatches(str: string, search: string) {
//   const regex = new RegExp(`(?<=.{0,10})${search}(?=.{{0,10}})`, 'gi');
//   const matches = str.match(regex);
//   const result = [];
//   for (const match of matches) {
//     const startIndex = str.indexOf(match);
//     const endIndex = startIndex + match.length;
//     const start = Math.max(0, startIndex - 10);
//     const end = Math.min(str.length, endIndex + 10);
//     result.push(str.substring(start, end));
//   }
//   console.log(result);
// }