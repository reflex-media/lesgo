export default {
  tables: {
    defaultTableName:
      process.env.LESGO_AWS_DYNAMODB_TABLE_NAMES?.split(',')[0] ||
      'defaultTable',
  },
};
