import React, { createContext, useContext, useState } from 'react';
import { getDailyNewsDigest } from '../services/api';

const DigestContext = createContext();

export const useDigest = () => {
  const context = useContext(DigestContext);
  if (!context) {
    throw new Error('useDigest must be used within a DigestProvider');
  }
  return context;
};

export const DigestProvider = ({ children }) => {
  const [digestData, setDigestData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const fetchDigest = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await getDailyNewsDigest('生成今日新闻推送');
      setDigestData(response);
      setLastUpdated(new Date());
      if (response?.isError) {
        setError(response.content || response.message);
      }
    } catch (err) {
      console.error('生成新闻推送失败:', err);
      setError(err.response?.data?.message || err.message || '生成失败，请稍后重试');
      setDigestData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    digestData,
    isLoading,
    lastUpdated,
    error,
    fetchDigest,
  };

  return (
    <DigestContext.Provider value={value}>
      {children}
    </DigestContext.Provider>
  );
};
