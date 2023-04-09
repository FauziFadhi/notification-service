import { ClassTransformOptions, plainToInstance } from 'class-transformer';

export const circularToJSON = (circular: unknown) =>
  JSON.parse(JSON.stringify(circular));

/**
 * `options.raw` = `true` for using pure object that you provided.
 * `options.raw` = `false` | `undefined` for coverting circular structure to JSON
 * @param cls
 * @param obj
 * @param options
 */
export function transformer<T, V extends { new (...args: unknown[]): T }>(
  cls: V,
  obj: ConstructorParameters<V>[0],
  options?: ClassTransformOptions & { raw?: boolean },
): T;
export function transformer<T, V extends { new (...args: unknown[]): T }>(
  cls: V,
  obj: ConstructorParameters<V>[0][],
  options?: ClassTransformOptions & { raw?: boolean },
): T[];
export function transformer<T, V extends { new (...args: unknown[]): T }>(
  cls: V,
  obj: ConstructorParameters<V>[0] | ConstructorParameters<V>[0][],
  options?: ClassTransformOptions & { raw?: boolean },
) {
  const result = plainToInstance(
    cls,
    options?.raw ? obj : circularToJSON(obj),
    {
      excludeExtraneousValues: true,
      exposeUnsetFields: true,
      // enableImplicitConversion: true,
      // exposeDefaultValues: true,
      ...options,
    },
  );
  return result as unknown;
}
