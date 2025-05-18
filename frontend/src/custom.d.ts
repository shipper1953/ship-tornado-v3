declare module '@hookform/resolvers/zod' {
    import { ZodSchema } from 'zod';
    import { Resolver } from 'react-hook-form';
    export const zodResolver: <T extends ZodSchema<any, any>>(schema: T) => Resolver<z.infer<T>>;
  }