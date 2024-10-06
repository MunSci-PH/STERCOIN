import useSupabaseServer from "@/utils/server";
import { cookies } from "next/headers";
import useCheckRoleServer from "@/hooks/useCheckRoleServer";
import { getUser } from "@/queries/getUser";
import ClientNav from "./clientnav";
import { UserInfo } from "@/dashboard/types";

const Nav = async () => {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const user = await getUser(supabase);
  const role = (await useCheckRoleServer(supabase)) as UserInfo;

  return <ClientNav user={user.data.user} role={role} />;
};
export default Nav;
