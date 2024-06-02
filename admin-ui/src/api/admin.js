import request from './request';

class Admin {
  static async getAdminsList() {
    try {
      const response = await request.get('/employee/list', {
        headers: {
          'Referrer-Police': 'strict-origin-when-cross-origin',
          'Access-Control-Allow-Origin': '*',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getAdminByEmailAndPass() {
    return '';
  }

  static async updateAdminData(data) {
    try {
      const response = await request.post('/employee/edit', data, {
        headers: {
          'Referrer-Police': 'strict-origin-when-cross-origin',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async deleteAdmin(data) {
    try {
      const response = await request.get('/employee/remove', {
        params: data,
        headers: {
          'Referrer-Police': 'strict-origin-when-cross-origin',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async createAdmin(data) {
    try {
      const response = await request.post('/employee/create', data, {
        headers: {
          'Referrer-Police': 'strict-origin-when-cross-origin',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default Admin;
