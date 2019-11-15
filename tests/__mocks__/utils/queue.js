const dispatch = jest.fn(() => Promise.resolve({ MessageId: 'MessageId' }));

export { dispatch };
export default dispatch;
