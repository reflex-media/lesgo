import ErrorException from 'exceptions/ErrorException';

describe('test ErrorException', () => {
  it('should have the correct format with default parameters', () => {
    const data = new ErrorException('Error exception test');

    expect(data.name).toBe('ErrorException');
    expect(data.message).toBe('Error exception test');
    expect(data.code).toBe('ERROR_EXCEPTION');
    expect(data.statusCode).toBe(500);
    expect(data.extra).toBeUndefined();
  });

  it('should allow for custom parameters', () => {
    const data = new ErrorException(
      'Error exception test',
      'ERROR_SAMPLE',
      444,
      {
        someKey: 'someValue',
      }
    );

    expect(data.name).toBe('ErrorException');
    expect(data.message).toBe('Error exception test');
    expect(data.code).toBe('ERROR_SAMPLE');
    expect(data.statusCode).toBe(444);
    expect(data.extra).toMatchObject({
      someKey: 'someValue',
    });
  });
});
