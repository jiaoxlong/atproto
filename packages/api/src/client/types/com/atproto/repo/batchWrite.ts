/**
* GENERATED CODE - DO NOT MODIFY
*/
import { Headers, XRPCError } from '@atproto/xrpc'

export interface QueryParams {}

export interface CallOptions {
  headers?: Headers;
  qp?: QueryParams;
  encoding: 'application/json';
}

export interface InputSchema {
  /**
   * The DID of the repo.
   */
  did: string;
  /**
   * Validate the records?
   */
  validate?: boolean;
  writes: (
    | {
        action: 'create',
        collection: string,
        rkey?: string,
        value: unknown,
      }
    | {
        action: 'update',
        collection: string,
        rkey: string,
        value: unknown,
      }
    | {
        action: 'delete',
        collection: string,
        rkey: string,
      }
  )[];
}

export interface OutputSchema {
  [k: string]: unknown;
}

export interface Response {
  success: boolean;
  headers: Headers;
  data: OutputSchema;
}

export function toKnownErr(e: any) {
  if (e instanceof XRPCError) {
  }
  return e
}
