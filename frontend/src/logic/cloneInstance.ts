export const cloneInstance = (instance: any) => {
  const instancePrototype = Object.getPrototypeOf(instance)
  const instanceTarget = Object.create(instancePrototype)
  return Object.assign(instanceTarget, instance)
}
