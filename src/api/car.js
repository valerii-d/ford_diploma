import request from './request';

class Car {
  static async list(params) {
    try {
      const response = await request.get('/car/list', {
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
      const response = await request.post('/car/add', data, {
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
      return await request.get('/car/remove', {
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

  static async income(data) {
    try {
      return await request.post('/car/income', data, {
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
