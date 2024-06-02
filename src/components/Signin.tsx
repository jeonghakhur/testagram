'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import ColorButton from './ui/ColorButton';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function SignIn({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <ColorButton
          key={name}
          text={`Sign in with ${name}`}
          onClick={() => signIn(id, { callbackUrl })}
          className="my-2 h-[52px]"
        />
      ))}
    </>
  );
}
