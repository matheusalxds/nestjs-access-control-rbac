import { ValidationError } from 'class-validator';

type ParseError = {
  source: string;
  internal: string;
  args?: object;
  stackTrace?: Error | ValidationError | ValidationError[];
  throwError?: any;
};

export const parseError = ({ source, internal, args, stackTrace, throwError }: ParseError): ParseError => ({
  source,
  internal,
  ...(args && { args }),
  ...(stackTrace && { stackTrace }),
  ...(throwError && { throwError }),
});
