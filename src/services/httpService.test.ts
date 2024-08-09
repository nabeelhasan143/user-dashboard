import axios from 'axios';

jest.mock('axios');

describe('apiClient', () => {
  it('should be configured with the correct baseURL and headers', () => {
    const expectedConfig = {
      baseURL: 'https://reqres.in/api',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    expect(axios.create).toHaveBeenCalledWith(expectedConfig);
  });
});
