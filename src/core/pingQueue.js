import { dispatch } from 'lesgo/src/utils/queue';

const pingQueue = input => {
  const payload = {
    data: input,
  };

  return dispatch(payload, 'pingQueue');
};

export default pingQueue;
