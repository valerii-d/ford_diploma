import request from './request';

class ServiceOrder {
  static async list(params) {
    try {
      const response = await request.get('/serviceOrder/list', {
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

  static async add(data) {
    try {
      const response = await request.post('/serviceOrder/add', data, {
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
      return await request.get('/serviceOrder/remove', {
        params: data,
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

  static async update(data) {
    try {
      return await request.get('/serviceOrder/update', {
        params: data,
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

export default ServiceOrder;
