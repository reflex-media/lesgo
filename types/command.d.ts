declare global {
  type InvokeCommandRequestEvent = {
    dropTableIfExists?: boolean;
  };
}

export {};
