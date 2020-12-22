export const RefreshAccessToken = (): MethodDecorator => (
  target: Record<string, string>,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) => {
  const oldMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      const result = await oldMethod.apply(this, args);
      return result;
    } catch (e) {
      if (e.response && e.response.status === 401) {
        console.warn('> Refreshing token....');
        await this.fetchAppAccessToken();
        return oldMethod.apply(this, args);
      } else {
        console.error(
          '----------------------- TWITCH API ERROR -----------------------',
        );
        console.error(e.response ? e.response.data : e);
        throw e;
      }
    }
  };

  return descriptor;
};
