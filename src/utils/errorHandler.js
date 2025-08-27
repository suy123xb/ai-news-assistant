// 错误处理工具
export class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

// 错误信息映射
const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  TIMEOUT_ERROR: '请求超时，请稍后重试',
  AUTH_ERROR: 'API认证失败，请检查配置',
  SERVER_ERROR: '服务器错误，请稍后重试',
  UNKNOWN_ERROR: '发生未知错误，请稍后重试'
};

// 获取用户友好的错误信息
export const getErrorMessage = (error) => {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        return 'API认证失败，请检查Token配置';
      case 403:
        return '访问被拒绝，请检查权限设置';
      case 404:
        return '请求的资源不存在';
      case 429:
        return '请求过于频繁，请稍后重试';
      case 500:
        return '服务器内部错误';
      default:
        return error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
    }
  }
  
  if (error.code === 'NETWORK_ERROR') {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  if (error.code === 'ECONNABORTED') {
    return ERROR_MESSAGES.TIMEOUT_ERROR;
  }
  
  return error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
};

// 错误日志记录
export const logError = (error, context = '') => {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    status: error.status,
    code: error.code,
    stack: error.stack
  };
  
  console.error('API Error:', errorInfo);
  
  // 在生产环境中可以发送到错误监控服务
  if (process.env.NODE_ENV === 'production') {
    // 这里可以集成错误监控服务，如Sentry
    // Sentry.captureException(error);
  }
};

// 重试机制
export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      
      // 只对网络错误和5xx错误进行重试
      if (error.code === 'NETWORK_ERROR' || (error.status && error.status >= 500)) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        continue;
      }
      
      throw error;
    }
  }
};
