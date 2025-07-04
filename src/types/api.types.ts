export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}

export interface RequestContext {
  userId?: string;
  sessionId?: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
} 