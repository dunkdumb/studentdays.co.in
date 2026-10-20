import { ApiResponse } from '../types';

/**
 * Static Stub for ApiClient
 * 
 * In this completely static deployment, all custom backend APIs have been removed.
 * Public content is loaded directly from static data files in `src/data/`.
 * 
 * This stub safely intercepts any residual API invocation and returns a controlled,
 * non-breaking response, preventing runtime crashes or network failures.
 */
class StaticApiClient {
  async request<T>(endpoint: string): Promise<ApiResponse<T>> {
    console.warn(`[Static Mode] Intercepted call to decoupled backend endpoint: ${endpoint}`);
    return {
      success: false,
      error: 'Backend API is disabled in this static frontend deployment.'
    };
  }

  get<T>(endpoint: string, _params?: Record<string, any>) {
    return this.request<T>(endpoint);
  }

  post<T>(endpoint: string, _body?: any) {
    return this.request<T>(endpoint);
  }

  put<T>(endpoint: string, _body?: any) {
    return this.request<T>(endpoint);
  }

  patch<T>(endpoint: string, _body?: any) {
    return this.request<T>(endpoint);
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint);
  }
}

export const api = new StaticApiClient();
export default api;
