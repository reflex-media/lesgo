import { LesgoException } from 'lesgo/exceptions';
import ping from '../ping';
import ErrorException from '../../../exceptions/ErrorException';

jest.mock('../../../exceptions/ErrorException');

describe('ping', () => {
  it('should return "Pong" when input is empty', () => {
    const result = ping({});
    expect(result).toEqual({ message: 'Pong' });
  });

  it('should throw an ErrorException when "sample-error" is provided', () => {
    const input = { 'sample-error': '401' };
    const expectedErrorMessage = 'Sample error response';
    const expectedErrorCode = 'core.utils.ping::SAMPLE_ERROR';
    const expectedStatusCode = 400;
    const expectedDetails = { input };

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
    const expectedErrorMessage = 'Sample error response';
    const expectedErrorCode = 'core.utils.ping::SAMPLE_ERROR';
    const expectedStatusCode = 400;
    const expectedDetails = { input };

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

  it('should throw an ErrorException when "sample-unhandled-exception" is provided', () => {
    const input = { 'sample-unhandled-exception': 'value' };
    const expectedErrorMessage =
      "Invalid type for 'sample-unhandled-exception', expecting 'number'";

    expect(() => {
      ping(input);
    }).toThrow(new LesgoException(expectedErrorMessage));
  });
});
