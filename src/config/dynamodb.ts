export default {
  tables: {
    default: {
      alias: process.env.LESGO_AWS_DYNAMODB_TABLE_ALIASES?.split(',')[0],
    },
  },
};
