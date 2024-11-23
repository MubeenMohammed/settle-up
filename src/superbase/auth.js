import supabase from "./superbase";
import { createUser } from "../backendFunctions/backendFunctions";

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (data) {
    const user = {
      user_id: data.user.id,
      name: "Mubeen Mohammed",
      created: data.user.created_at,
      email: data.user.email,
    };
    //await createUser(user);
 }
  if (error) {
    console.log("Error during signUp", error.message);
  }
  return { data, error };
};

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const logOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.session();
  return { session: data.session, error };
};

export const onAuthStateChange = (callback) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
  return subscription;
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data, error };
};
