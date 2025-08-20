import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDailyNewsPodcast } from '../services/api';

const PodcastContext = createContext();

export const usePodcast = () => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error('usePodcast must be used within a PodcastProvider');
  }
  return context;
};

export const PodcastProvider = ({ children }) => {
  const [podcastData, setPodcastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(true);

  const fetchPodcast = async () => {
    setIsLoading(true);
    try {
      const response = await getDailyNewsPodcast();
      setPodcastData(response);
      setLastUpdated(new Date());
      setHasInitialized(true);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('获取播客失败:', error);
      setPodcastData({
        error: true,
        message: error.response?.data?.message || error.message || '获取播客失败，请稍后重试'
      });
      setHasInitialized(true);
      setShowConfirmDialog(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmGenerate = () => {
    setShowConfirmDialog(false);
    fetchPodcast();
  };

  const handleCancelGenerate = () => {
    setShowConfirmDialog(false);
    setHasInitialized(true);
  };

  const resetPodcast = () => {
    setPodcastData(null);
    setIsLoading(false);
    setLastUpdated(null);
    setHasInitialized(false);
    setShowConfirmDialog(true);
  };

  // 检测页面是否重新加载
  useEffect(() => {
    // 检查是否是页面重新加载
    const isPageReload = performance.navigation.type === 1 || 
                        (document.readyState === 'complete' && !sessionStorage.getItem('podcastInitialized'));
    
    if (isPageReload) {
      // 页面重新加载，重置状态
      resetPodcast();
      sessionStorage.removeItem('podcastInitialized');
    } else {
      // 不是重新加载，标记为已初始化
      sessionStorage.setItem('podcastInitialized', 'true');
    }
  }, []);

  // 页面卸载时清理sessionStorage
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('podcastInitialized');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const value = {
    podcastData,
    isLoading,
    lastUpdated,
    hasInitialized,
    showConfirmDialog,
    fetchPodcast,
    handleConfirmGenerate,
    handleCancelGenerate,
    resetPodcast
  };

  return (
    <PodcastContext.Provider value={value}>
      {children}
    </PodcastContext.Provider>
  );
};
