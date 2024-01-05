import { obfuscator } from '../obfuscator';

type Data = {
  cpf: string;
  name: string;
  fullName: string;
  nested: { cpf: string };
  emptyField: string;
};

const mockData = (): Data => ({
  cpf: '123123123',
  name: 'any_name',
  fullName: 'any fullname',
  emptyField: '',
  nested: {
    cpf: '123123123',
  },
});

describe('obfuscator', () => {
  it('should return correct data on success', async () => {
    const data = mockData();

    const resp = obfuscator<Data>(data, ['cpf', 'fullName']);

    expect(resp).toEqual({
      name: data.name,
      cpf: '123***',
      fullName: 'any*** ful***',
      nested: { cpf: '123***' },
      emptyField: '',
    });
  });

  it('should ignore null values', async () => {
    const data = mockData();
    data.cpf = null;
    data.name = undefined;

    const resp = obfuscator<Data>(data, ['cpf', 'fullName']);

    expect(resp).toEqual({ cpf: null, fullName: 'any*** ful***', nested: { cpf: '123***' }, emptyField: '' });
  });
});
