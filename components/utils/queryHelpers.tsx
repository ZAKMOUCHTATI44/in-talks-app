import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

/**
 * A hook to create and update query strings.
 */
export function useQueryHelper() {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  return { createQueryString };
}
