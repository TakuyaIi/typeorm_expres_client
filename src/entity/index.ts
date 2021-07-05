import { FindManyOptions } from "typeorm";
import { DataTableHeader } from "vuetify";
import { Book } from "./Book";
import { User } from "./User";

export * from "./Book";
export * from "./User";

export type EntityMap = {
  User: User;
  Book: Book;
};
export type EntityName = keyof EntityMap;

export const entities = [User, Book];
export const EntityNames: { [E in EntityName]: E } = {
  User: "User",
  Book: "Book"
};
export const GetListTitle: {
  [E in EntityName]: () => string;
} = {
  User: () => "ユーザー",
  Book: () => "本"
};
export function isEntity(s: unknown): s is EntityName {
  return typeof s === "string" && s in EntityNames;
}

export interface ExtendedDataTableHeader<T extends any = any>
  extends DataTableHeader {
  editable: boolean;
  default?: string;
  rules?: string;
}
export type ListDescription<T extends EntityName> = {
  basicOptions: () => FindManyOptions<EntityMap[T]>;
  headers: () => ExtendedDataTableHeader<EntityMap[T]>[];
};
export const ListDescriptions: {
  [E in EntityName]: ListDescription<E>;
} = {
  User: {
    basicOptions: () => ({}),
    headers: () => [
      { text: "id", sortable: true, editable: false, value: "id" },
      {
        text: "firstName",
        sortable: true,
        editable: true,
        value: "firstName",
        default: "aa"
      },
      {
        text: "lastName",
        sortable: true,
        editable: true,
        value: "lastName",
        default: "aa"
      },
      {
        text: "age",
        sortable: true,
        editable: true,
        value: "age",
        default: "0"
      }
    ]
  },
  Book: {
    basicOptions: () => ({}),
    headers: () => [
      { text: "id", sortable: true, editable: false, value: "id" },
      {
        text: "title",
        sortable: true,
        editable: true,
        value: "title",
        default: "aa"
      },
      {
        text: "author",
        sortable: true,
        editable: true,
        value: "author",
        default: "aa"
      },
      {
        text: "publish_at",
        sortable: true,
        editable: true,
        value: "publish_at",
        default: Date()
      }
    ]
  }
};

export type RequestBase = {
  entity: keyof EntityMap;
};

type RequestUser = RequestBase & {
  entity: "User";
  query: FindManyOptions<EntityMap["User"]>;
};

type RequestBook = RequestBase & {
  entity: "Book";
  query: FindManyOptions<EntityMap["Book"]>;
};

export type Request = RequestUser | RequestBook;
