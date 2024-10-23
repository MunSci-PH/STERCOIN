"use server";

import { UserInfo } from "@/dashboard/types";
import { getUser } from "@/queries/getUser";
import { getUserById } from "@/queries/getUserById";
import { TypedSupabaseClient } from "@/utils/types";

const checkRoleServer = async (supabaseInstance: TypedSupabaseClient) => {
  let role = "";
  let isAdmin = false;
  const supabase = supabaseInstance;

  const { data, error } = await getUser(supabase);
  const userData = data?.user;

  if (userData && !error) {
    const { data, error } = await getUserById(supabase, userData.id);

    if (error) {
      console.error(error);
      throw error;
    }

    if (data) {
      const userObj = data;
      const userRole = userObj?.map((e) => e.group).toString();
      const userAdmin =
        userObj?.map((e) => e.role).toString() == "admin" ? true : false;
      role = userRole;
      isAdmin = userAdmin;
    }
  } else {
    return { role: null, isAdmin: false } as UserInfo;
  }

  return { role: role, isAdmin: isAdmin } as UserInfo;
};

export default checkRoleServer;
