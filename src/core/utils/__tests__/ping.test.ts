import ping from '../ping';
import ErrorException from '../../../exceptions/ErrorException';

jest.mock('../../../exceptions/ErrorException');

describe('ping', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return "Pong" when input is empty', async () => {
    const result = ping();
    expect(result).toEqual({ message: 'Pong' });
  });

  it('should throw an ErrorException when "sample-error" is provided', async () => {
    const input = { 'sample-error': '401' };
    const expectedErrorMessage = 'Sample Error exception';
    const expectedErrorCode = 'core.utils.ping::SAMPLE_ERROR';
    const expectedStatusCode = 401;
    const expectedDetails = { qs: input };

    expect(() => {
      ping(input);
    }).toThrow(ErrorException);

    expect(ErrorException).toHaveBeenCalledWith(
      expectedErrorMessage,
      expectedErrorCode,
      expectedStatusCode,
      expectedDetails
    );
  });

  it('should throw an ErrorException when invalid parameters are provided', () => {
    const input = { 'sample-error': 'value' };
    const expectedErrorMessage = 'Invalid parameters provided';
    const expectedErrorCode = 'core.utils.ping::INVALID_PARAMETERS';
    const expectedStatusCode = 400;
    const expectedDetails = { qs: input };

    expect(() => {
      ping(input);
    }).toThrow(ErrorException);

    expect(ErrorException).toHaveBeenCalledWith(
      expectedErrorMessage,
      expectedErrorCode,
      expectedStatusCode,
      expectedDetails
    );
  });

  it('should throw an ErrorException when "sample-unhandled-exception" is provided', () => {
    const input = { 'sample-unhandled-exception': 'value' };
    const expectedErrorMessage = 'Invalid parameters provided';
    const expectedErrorCode = 'core.utils.ping::INVALID_PARAMETERS';
    const expectedStatusCode = 400;
    const expectedDetails = { qs: input };

    expect(() => {
      // @ts-ignore
      ping(input);
    }).toThrow(ErrorException);

    expect(ErrorException).toHaveBeenCalledWith(
      expectedErrorMessage,
      expectedErrorCode,
      expectedStatusCode,
      expectedDetails
    );
  });
});
