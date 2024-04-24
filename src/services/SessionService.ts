import axiosClient from "./axiosConfig";

export class SessionService {
  static async initializeSession() {
    try {
      const response = await axiosClient.get('/auth/get-refresh-token');
      return {
        accessToken: response.data.accessToken,
        expiresIn: response.data.expiresIn,
        userId: response.data.userId
      };
    } catch (error) {
      console.error('Verify session error:', error);
      return {
        isAuthenticated: false,
        accessToken: null,
        expiresAt: null
      };
    }
  }
}
