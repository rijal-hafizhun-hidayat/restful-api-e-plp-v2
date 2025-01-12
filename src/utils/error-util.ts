import type { ZodError } from "zod";

export class ErrorUtil {
  static formatErrorZod(error: ZodError) {
    const formattedErrors = error.errors.reduce((acc: any, err) => {
      const field = err.path[0];
      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(err.message);
      return acc;
    }, {});
    return formattedErrors;
  }
}
