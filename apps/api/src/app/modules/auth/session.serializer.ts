/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    console.log({ userSerialized: user })
    done(null, user);
  }

  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void
  ): any {
    console.log({ userDeserialized: payload })
    done(null, payload);
  }
}
