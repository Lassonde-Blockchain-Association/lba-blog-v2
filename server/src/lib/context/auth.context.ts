import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { supabase } from '../supabase';

export async function createAuthContext({
  req,
  res,
}: CreateExpressContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  // This is just an example of something you might want to do in your ctx fn
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      
     
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user)
      return user;
    }
    return null;
  }
  const user = await getUserFromHeader();

  return {
    user,
  };
}
export type AuthContext = Awaited<ReturnType<typeof createAuthContext>>;