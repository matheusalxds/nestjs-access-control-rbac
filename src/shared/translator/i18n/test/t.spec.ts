import { t } from '../t';

describe('T', () => {
  it('should return correct i18 file name', async () => {
    const response = t('path');

    expect(response).toBe('global.path');
  });
});
