import { isEmpty, validateFields } from 'lesgo/utils';
import ErrorException from '../../exceptions/ErrorException';

const FILE = 'core.utils.ping';

type QueryStringParameters = {
  'sample-error'?: string;
};

const validateInput = (input: QueryStringParameters) => {
  const validFields = [
    { key: 'sample-error', type: 'string', required: false },
  ];

  const validated = validateFields(input, validFields);
  return validated;
};

export default (qs: QueryStringParameters = {}) => {
  const input = validateInput({ ...qs });

  if (isEmpty(qs)) {
    return {
      message: 'Pong',
    };
  }

  if (!isEmpty(input['sample-error'])) {
    const httpStatusCode = parseInt(input['sample-error'], 10);

    if (typeof httpStatusCode === 'number' && !isNaN(httpStatusCode)) {
      throw new ErrorException(
        'Sample Error exception',
        `${FILE}::SAMPLE_ERROR`,
        httpStatusCode,
        {
          qs,
        }
      );
    }
  }

  throw new ErrorException(
    'Invalid parameters provided',
    `${FILE}::INVALID_PARAMETERS`,
    400,
    { qs }
  );
};
