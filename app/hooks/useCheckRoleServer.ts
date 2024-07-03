import { getUser } from "@/queries/getUser";
import { getUserById } from "@/queries/getUserById";
import useSupabaseServer from "@/utils/server";
import { TypedSupabaseClient } from "@/utils/types";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";

const useCheckRoleServer = async (supabaseInstance: TypedSupabaseClient) => {
  let role = "";
  let isAdmin = false;
  const supabase = supabaseInstance;

  const { data, error } = await getUser(supabase);
  const userData = data?.user;

  if (userData && !error) {
    const { data, error } = await getUserById(supabase, userData.id);

    if (error) {
      console.error(error);
      return;
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
    throw error;
  }

  return { role: role, isAdmin: isAdmin };
};

export default useCheckRoleServer;
