export const withCSR = (next:any) => async (ctx) => {
  const isCSR = ctx.req.url?.startsWith("/_next");

  if (isCSR) {
    return {
      props: {},
    };
  }

  return next?.(ctx);
};
