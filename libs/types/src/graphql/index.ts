
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum EGender {
    female = "female",
    male = "male",
    unspecified = "unspecified"
}

export interface CreateUserInput {
    email: string;
    password: string;
    username: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface ImageInput {
    public_id: string;
    url: string;
}

export interface Info {
    bio?: Nullable<string>;
    birthday: DateTime;
    gender?: Nullable<EGender>;
}

export interface LoginResponse {
    message: string;
}

export interface IMutation {
    createUser(input: CreateUserInput): User | Promise<User>;
    login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;
}

export interface IQuery {
    Me(): User | Promise<User>;
    logout(): string | Promise<string>;
}

export interface User {
    coverPicture?: Nullable<ImageInput>;
    email: string;
    firstName?: Nullable<string>;
    info?: Nullable<Info>;
    isOwnProfile?: Nullable<boolean>;
    lastName?: Nullable<string>;
    password: string;
    phone?: Nullable<string>;
    profilePicture?: Nullable<ImageInput>;
    username: string;
}

export type DateTime = any;
type Nullable<T> = T | null;
