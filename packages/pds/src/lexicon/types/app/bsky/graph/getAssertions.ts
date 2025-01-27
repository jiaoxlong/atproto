/**
* GENERATED CODE - DO NOT MODIFY
*/
import express from 'express'

export interface QueryParams {
  author?: string;
  subject?: string;
  assertion?: string;
  confirmed?: boolean;
  limit?: number;
  before?: string;
}

export type HandlerInput = undefined

export interface HandlerSuccess {
  encoding: 'application/json';
  body: OutputSchema;
}

export interface HandlerError {
  status: number;
  message?: string;
}

export type HandlerOutput = HandlerError | HandlerSuccess

export type ActorKnown =
  | 'app.bsky.system.actorUser'
  | 'app.bsky.system.actorScene'
export type ActorUnknown = string

export interface OutputSchema {
  cursor?: string;
  assertions: {
    uri: string,
    cid: string,
    assertion: string,
    confirmation?: Confirmation,
    author: Actor,
    subject: Actor,
    indexedAt: string,
    createdAt: string,
  }[];
}
export interface Confirmation {
  uri: string;
  cid: string;
  indexedAt: string;
  createdAt: string;
}
export interface Actor {
  did: string;
  declaration: Declaration;
  handle: string;
  displayName?: string;
}
export interface Declaration {
  cid: string;
  actorType: ActorKnown | ActorUnknown;
}

export type Handler = (
  params: QueryParams,
  input: HandlerInput,
  req: express.Request,
  res: express.Response
) => Promise<HandlerOutput> | HandlerOutput
