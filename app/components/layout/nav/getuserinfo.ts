"use server";

import { getUser } from "@/queries/getUser";
import createSupabaseServer from "../../../utils/server";
import checkRoleServer from "@/hooks/checkRoleServer";

export default async function getUserInfo() {
  const supabase = await createSupabaseServer();

  const user = (await getUser(supabase)).data.user;
  const role = await checkRoleServer(supabase);

  return { data: { user, role } };
}
