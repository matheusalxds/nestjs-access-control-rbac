import { parseError } from '../parse-error';

describe('parseError', () => {
  it('should return correct response', async () => {
    const source = 'any_path';
    const internal = 'ABC';

    const response = parseError({ source, internal });

    expect(response).toEqual({ source, internal });
  });

  it('should return args if args are provided', async () => {
    const source = 'any_path';
    const internal = 'ABC';
    const args = { argX: 'test' };

    const response = parseError({ source, internal, args });

    expect(response).toEqual({ source, internal, args });
  });

  it('should return stackTrace if stackTrace is provided', async () => {
    const source = 'any_path';
    const internal = 'ABC';
    const stackTrace = new Error('any_error');

    const response = parseError({ source, internal, stackTrace });

    expect(response).toEqual({ source, internal, stackTrace });
  });

  it('should return throwError if throwError is provided', async () => {
    const source = 'any_path';
    const internal = 'ABC';
    const throwError = new Error('any_error');

    const response = parseError({ source, internal, throwError });

    expect(response).toEqual({ source, internal, throwError });
  });
});
