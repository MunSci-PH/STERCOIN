"use server";
import createSupabaseServer from "@/utils/server";

import checkRoleServer from "@/hooks/checkRoleServer";
import { getUser } from "@/queries/getUser";
import ClientNav from "./clientnav";
import { UserInfo } from "@/dashboard/types";

const Nav = async () => {
  "use server";

  const supabase = await createSupabaseServer();

  const user = await getUser(supabase);
  const role = (await checkRoleServer(supabase)) as UserInfo;

  return <ClientNav user={user.data.user} role={role} />;
};
export default Nav;
