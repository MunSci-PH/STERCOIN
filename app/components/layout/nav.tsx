import checkRoleServer from "@/hooks/checkRoleServer";
import { getUser } from "@/queries/getUser";
import ClientNav from "./clientnav";
import { UserInfo } from "@/dashboard/types";
import useSupabaseBrowser from "@/utils/client";
import { use } from "react";

const Nav = () => {
  const supabase = useSupabaseBrowser();

  async function getUserInfo() {
    const user = await getUser(supabase);
    const role = (await checkRoleServer(supabase)) as UserInfo;
    const r = { data: { user, role } };

    return r;
  }

  const userInfo = use(getUserInfo());

  return (
    <ClientNav user={userInfo.data.user.data.user} role={userInfo.data.role} />
  );
};

export default Nav;
