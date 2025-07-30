import z from "zod";
import * as dotenv from "dotenv";
dotenv.config();
const envSchema = z.object({
  API_URL: z.string().url().min(1),
});

export const env = envSchema.parse(process.env);
