import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * 讀取 CMS 內容，有 DB 值用 DB，沒有用 hardcoded fallback。
 * @param section  cms_content 表的 section key
 * @param fallback 預設的 hardcoded 資料
 */
export function useCmsContent<T extends Record<string, unknown>>(
  section: string,
  fallback: T,
): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from('cms_content')
      .select('content')
      .eq('section', section)
      .maybeSingle()
      .then(
        ({ data: row }) => {
          if (cancelled) return;
          if (row?.content) {
            setData({ ...fallback, ...(row.content as T) });
          }
          setLoading(false);
        },
        () => {
          if (!cancelled) setLoading(false);
        },
      );

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  return { data, loading };
}
