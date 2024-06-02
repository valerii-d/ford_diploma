import request from './request';

class Car {
  static async list(params) {
    try {
      const response = await request.get('/parts/list', {
        params,
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

  static async add(params) {
    try {
      const response = await request.get('/parts/add', {
        params,
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

  static async delete(params) {
    try {
      return await request.get('/parts/remove', {
        params,
        headers: {
          'Referrer-Police': 'strict-origin-when-cross-origin',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default Car;
