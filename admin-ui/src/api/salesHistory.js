import request from './request';

class SalesHistory {
  static async carsList(params) {
    try {
      const response = await request.get('/carSalesHistory/list', {
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

  static async carsAdd(params) {
    try {
      const response = await request.get('/carSalesHistory/add', {
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
}

export default SalesHistory;
