const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyl0jON7MnZ8aUWlH5T8r4Jb86hVN4opbQqk4KLoC94CAfjun8seNuFIKeC8rOCdodXdg/exec';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private async makeRequest<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Authentication
  async loginStudent(email: string, password: string) {
    const url = `${API_ENDPOINT}?action=loginStudent&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return this.makeRequest(url);
  }

  async loginTeacher(email: string, password: string) {
    const url = `${API_ENDPOINT}?action=loginTeacher&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return this.makeRequest(url);
  }

  // Student operations
  async getStudentHistory(studentId: string) {
    const url = `${API_ENDPOINT}?action=getStudentHistory&studentId=${encodeURIComponent(studentId)}`;
    return this.makeRequest(url);
  }

  async submitReport(payload: {
    idSiswa: string;
    judulBuku: string;
    pengarang: string;
    ringkasan: string;
    fotoBuku?: string | null;
  }) {
    return this.makeRequest(API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        action: 'submitReport',
        payload
      })
    });
  }

  // Teacher operations
  async getPendingReports(teacherId: string) {
    const url = `${API_ENDPOINT}?action=getPendingReports&teacherId=${encodeURIComponent(teacherId)}`;
    return this.makeRequest(url);
  }

  async approveReport(idLaporan: string, umpanBalik: string, poinDiberikan: number) {
    return this.makeRequest(API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        action: 'approveReport',
        payload: {
          idLaporan,
          umpanBalik,
          poinDiberikan
        }
      })
    });
  }

  async rejectReport(idLaporan: string, umpanBalik: string) {
    return this.makeRequest(API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        action: 'rejectReport',
        payload: {
          idLaporan,
          umpanBalik
        }
      })
    });
  }

  // Get all reports for teacher (for dashboard overview)
  async getTeacherReports(teacherId: string) {
    const url = `${API_ENDPOINT}?action=getTeacherReports&teacherId=${encodeURIComponent(teacherId)}`;
    return this.makeRequest(url);
  }
}

export const api = new ApiService();
export type { ApiResponse };
