import { useEffect } from 'react';

const BASE_TITLE = 'code秘密花园';

export const useTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} - ${BASE_TITLE}` : `${BASE_TITLE} - 工具箱`;
    
    return () => {
      document.title = `${BASE_TITLE} - 工具箱`;
    };
  }, [title]);
}; 