export const cloneInstance = <T>(instance: T) => {
  const instancePrototype = Object.getPrototypeOf(instance)
  const instanceTarget = Object.create(instancePrototype)
  return Object.assign(instanceTarget, instance)
}
