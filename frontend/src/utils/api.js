import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// Use the publishable key as the anon key when they are the same in this project.
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't throw — provide a stubbed client so the app can render and show friendly errors.
  // This prevents the CRA runtime overlay (redbox) when env vars are not set.
  // Also log a clear message for the developer.
  // eslint-disable-next-line no-console
  console.error(
    'Supabase is not configured. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY or REACT_APP_SUPABASE_PUBLISHABLE_KEY in frontend/.env'
  );

  supabase = {
      from: () => {
        const asyncResponse = async () => ({ data: null, error: new Error('Supabase not configured') });
        const selectFn = async (..._args) => asyncResponse();
        // provide chainable helpers (.eq, .maybeSingle, .single) as async functions
        selectFn.eq = async (..._args) => asyncResponse();
        selectFn.maybeSingle = async () => asyncResponse();
        selectFn.single = async () => asyncResponse();

        return {
          select: selectFn,
          insert: async () => asyncResponse(),
          update: async () => asyncResponse(),
          delete: async () => asyncResponse(),
        };
      },
    auth: {
      signIn: async () => ({ error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: new Error('Supabase not configured') }),
    },
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
}

export default supabase;
export { supabase };
