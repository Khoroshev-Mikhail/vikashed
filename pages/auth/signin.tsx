import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import google from '../../public/images/google.svg'

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex justify-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className="border p-3 rounded-md" onClick={() => signIn(provider.id)}>
            Войти с помощью {provider.name} 
            {provider.name.toLocaleLowerCase() == 'google' && <img src={google.src} alt={provider.name} className="inline pl-1 w-8 h-8 mr-2" />}
          </button>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? [] },
  }
}