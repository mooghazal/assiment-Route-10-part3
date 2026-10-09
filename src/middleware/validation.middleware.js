import { BadRequestException } from "../common/exceptions/error.exception.js";

export const validation = (schema) => {
    return (req, res, next) => {
        const validationResult = schema.safeParse({
            body: req.body,
            query: req.query
        });

        if (!validationResult.success) {
            throw BadRequestException(
                "Validation Error",
                validationResult.error.issues
            );
        }

        req.validate = validationResult.data;

        next();
    };
};