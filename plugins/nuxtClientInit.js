export default async (ctx) => {
  let name = ctx.route.name;

  if (name === "email-verify") return;

  await ctx.store.dispatch("nuxtClientInit", ctx);
};
