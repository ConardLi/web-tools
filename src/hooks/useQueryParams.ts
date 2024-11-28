import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useQueryParams = <T extends Record<string, string>>(defaultParams: T) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState<T>(defaultParams);

  // 从 URL 读取参数
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newParams = { ...defaultParams };
    
    (Object.keys(defaultParams) as Array<keyof T>).forEach(key => {
      const value = searchParams.get(key as string);
      if (value) {
        newParams[key] = value as T[keyof T];
      }
    });

    setParams(newParams);
  }, [location.search]);

  // 更新 URL 参数
  const updateParams = useCallback((newParams: Partial<T>) => {
    const searchParams = new URLSearchParams(location.search);
    const updatedParams = { ...params, ...newParams };
    
    // 清空现有参数
    Array.from(searchParams.keys()).forEach(key => {
      searchParams.delete(key);
    });
    
    // 设置所有参数
    Object.entries(updatedParams).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      }
    });

    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    }, { replace: true });
  }, [location.pathname, navigate, params]);

  return { params, updateParams };
};
