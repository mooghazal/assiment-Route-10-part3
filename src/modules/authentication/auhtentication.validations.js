import { z } from "zod";
import { GenderEnum } from "../../common/enum/enum.gender.js";

export const loginSchema = z.strictObject({
  email: z.email({message:"invaild email format plase enter falid email like examble@gmail.com"}),
  password: z.string().min(8).max(16)
})

export const login=z.object({
  body: loginSchema,
  query:z.strictObject({
    lang:z.enum(["ar","en"]).default("ar"),
    // darkMode:z.coerce.boolean()
    // darkMode:z.stringbool({
    //   truthy:["true","1","yes"],
    //   falsy:["false","0","no"],
    // })
    extra:z.literal("25")
  })
})



export const signup = z.object({
body:loginSchema.safeExtend({
  username: z.string(),
  phone: z.e164(),
  confirmPassword: z.string().min(8).max(16),
  gender:z.union([z.literal(GenderEnum.MALE),z.literal(GenderEnum.FEMALE)]),
})}).superRefine((data, ctx) => {
  console.log({ data, ctx });

  if (data.body.password !== data.body.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      path: ['body', 'confirmPassword'],
      message: "password mismatch  with confirmation password"
    })
  }

  if (!data.body.username.includes(" ")) {
    ctx.addIssue({
      code: "custom",
      path: ['body', 'username'],
      message: "username must contain 2  parts"
    })
  }
})





