import request from './request';

class Accessory {
  static async list() {
    try {
      const response = await request.get('/accessory/list', {
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

  static async add(data) {
    try {
      const response = await request.post('/accessory/add', data, {
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

  static async delete(data) {
    try {
      const response = await request.get('/accessory/remove', {
        params: data,
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
}

export default Accessory;
