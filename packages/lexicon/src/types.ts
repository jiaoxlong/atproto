import { z } from 'zod'
import { NSID } from '@atproto/nsid'

export const tokenSchema = z.object({
  lexicon: z.literal(1),
  id: z.string().refine((v: string) => NSID.isValid(v), {
    message: 'Must be a valid NSID',
  }),
  type: z.enum(['token']),
  revision: z.number().optional(),
  description: z.string().optional(),
  defs: z.any().optional(),
})
export type TokenSchema = z.infer<typeof tokenSchema>

export function isValidTokenSchema(v: unknown): v is TokenSchema {
  return tokenSchema.safeParse(v).success
}

export const recordSchema = z.object({
  lexicon: z.literal(1),
  id: z.string().refine((v: string) => NSID.isValid(v), {
    message: 'Must be a valid NSID',
  }),
  type: z.enum(['record']),
  revision: z.number().optional(),
  description: z.string().optional(),
  key: z.string().optional(),
  record: z.any().optional(),
  defs: z.any().optional(),
})
export type RecordSchema = z.infer<typeof recordSchema>

export function isValidRecordSchema(v: unknown): v is RecordSchema {
  return recordSchema.safeParse(v).success
}

export class RecordSchemaMalformedError extends Error {
  constructor(
    message: string,
    public schemaDef: unknown,
    public issues?: z.ZodIssue[],
  ) {
    super(message)
    this.schemaDef = schemaDef
    this.issues = issues
  }
}

export const methodSchemaBody = z.object({
  encoding: z.union([z.string(), z.string().array()]),
  description: z.string().optional(),
  schema: z.any().optional(),
})
export type MethodSchemaBody = z.infer<typeof methodSchemaBody>

export const methodSchemaParam = z
  .object({
    type: z.literal('object'),
    properties: z.record(
      z
        .object({
          type: z.enum(['string', 'number', 'integer', 'boolean']),
        })
        .catchall(z.any()),
    ),
  })
  .catchall(z.any())
export type MethodSchemaParam = z.infer<typeof methodSchemaParam>

export const methodSchemaError = z.object({
  name: z.string(),
  description: z.string().optional(),
})
export type MethodSchemaError = z.infer<typeof methodSchemaError>

export const methodSchema = z.object({
  lexicon: z.literal(1),
  id: z.string(),
  type: z.enum(['query', 'procedure']),
  description: z.string().optional(),
  parameters: methodSchemaParam.optional(),
  input: methodSchemaBody.optional(),
  output: methodSchemaBody.optional(),
  errors: methodSchemaError.array().optional(),
  defs: z.any().optional(),
})
export type MethodSchema = z.infer<typeof methodSchema>

export function isValidMethodSchema(v: unknown): v is MethodSchema {
  return methodSchema.safeParse(v).success
}

export type Schema = TokenSchema | RecordSchema | MethodSchema

export class SchemaNotFoundError extends Error {}
