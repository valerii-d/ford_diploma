import request from './request';

class SalesHistory {
  static async carsList(params) {
    try {
      const response = await request.get('/salesHistory/carsList', {
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
      const response = await request.get('/salesHistory/addCar', {
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

  static async addPart(params) {
    try {
      const response = await request.get('/salesHistory/addPart', {
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

  static async addAccessory(params) {
    try {
      const response = await request.get('/salesHistory/addAccessory', {
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

  static async salesCount(params) {
    try {
      const response = await request.get('/salesHistory/salesCount', {
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
