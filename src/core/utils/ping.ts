import { isEmpty, validateFields } from 'lesgo/utils';
import ErrorException from '../../exceptions/ErrorException';

const FILE = 'core.utils.ping';

type QueryStringParameters = {
  'sample-error'?: string;
  'sample-unhandled-exception'?: string;
};

const validateInput = (input: QueryStringParameters) => {
  const validFields = [
    { key: 'sample-error', type: 'string', required: false },
    { key: 'sample-unhandled-exception', type: 'string', required: false },
  ];

  const validated = validateFields(input, validFields);
  return validated;
};

export default (qs: QueryStringParameters = {}) => {
  const input = validateInput({ ...qs });

  if (isEmpty(input)) {
    return {
      message: 'Pong',
    };
  }

  if (!isEmpty(input['sample-error'])) {
    throw new ErrorException(
      'Sample error response',
      `${FILE}::SAMPLE_ERROR`,
      400,
      {
        input,
      }
    );
  }

  if (!isEmpty(input['sample-unhandled-exception'])) {
    validateFields(input, [
      { key: 'sample-unhandled-exception', type: 'number', required: true },
    ]);
  }
};
