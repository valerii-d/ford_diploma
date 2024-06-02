import request from './request';

class Homepage {
  static async createNewBanner(data) {
    try {
      const response = await request.post('/homepage/addNewBanner', data, {
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

  static async bannersList() {
    try {
      const response = await request.get('/homepage/bannersList', {
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

  static async deleteBanner(data) {
    try {
      return await request.get('/homepage/deleteBanner', {
        params: data,
        headers: {
          'Referrer-Police': 'strict-origin-when-cross-origin',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default Homepage;
