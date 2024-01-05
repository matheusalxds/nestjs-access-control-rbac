import { msgEnd, msgStart } from '../log-msg';

const msgParams = ['ClassName', 'fnName'];
const msgData = { info: 'any_info' };

describe('LogMsg', () => {
  describe('msgStart', () => {
    it('should return correct msg and data', async () => {
      const response = msgStart(msgParams, msgData);

      expect(response).toEqual({ data: msgData, msg: 'ClassName - fnName - Start' });
    });

    it('should return only msg if data is not provided', async () => {
      const response = msgStart(msgParams);

      expect(response).toEqual({ msg: 'ClassName - fnName - Start' });
    });
  });

  describe('msgEnd', () => {
    it('should return correct msg and data', async () => {
      const response = msgEnd(msgParams, msgData);

      expect(response).toEqual({ data: msgData, msg: 'ClassName - fnName - End' });
    });

    it('should return only msg if data is not provided', async () => {
      const response = msgStart(msgParams);

      expect(response).toEqual({ msg: 'ClassName - fnName - Start' });
    });
  });
});
