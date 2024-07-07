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

export default async (qs: QueryStringParameters = {}) => {
  const input = validateInput({ ...qs });

  if (isEmpty(input)) {
    return {
      message: 'Pong',
    };
  }

  if (!isEmpty(input['sample-error'])) {
    throw new ErrorException(
      'Error exception',
      `${FILE}::SAMPLE_ERROR`,
      parseInt(input['sample-error'], 10),
      {
        input,
      }
    );
  }

  throw new ErrorException(
    'Invalid parameters provided',
    `${FILE}::INVALID_PARAMETERS`,
    400,
    { input }
  );
};
