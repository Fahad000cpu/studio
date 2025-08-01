'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string;

  if (email) {
    const name = email.split('@')[0];
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const userData = { email, name: capitalizedName };
    cookies().set('session', JSON.stringify(userData), { httpOnly: true, path: '/' });
    redirect('/');
  }

  redirect('/login?error=Invalid credentials');
}

export async function logout() {
  cookies().delete('session')
  redirect('/login')
}

export async function getSession() {
    const session = cookies().get('session')?.value
    if (!session) return null;
    try {
        return JSON.parse(session);
    } catch {
        return null;
    }
}
