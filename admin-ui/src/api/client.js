import request from './request';

class Client {
  static async getList() {
    try {
      const response = await request.get('/client/list', {
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

  //   static async getAdminByEmailAndPass() {
  //     return '';
  //   }

  static async update(data) {
    try {
      const response = await request.post('/client/edit', data, {
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

  static async delete(data) {
    try {
      const response = await request.get('/client/remove', {
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

  static async create(data) {
    try {
      const response = await request.post('/client/create', data, {
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

export default Client;
