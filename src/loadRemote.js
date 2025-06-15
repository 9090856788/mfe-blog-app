export async function loadRemote(remoteEntry, scope, module) {
  await __vite_preload(remoteEntry, true);

  const container = window[scope];
  await __webpack_init_sharing__('default');
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(`./${module}`);
  const Module = factory();
  return Module;
}
