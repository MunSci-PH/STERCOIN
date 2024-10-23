"use server";

import ClientNav from "./navelement";
import getUserInfo from "./getuserinfo";

const Nav = async () => {
  const userInfo = await getUserInfo();

  return <ClientNav user={userInfo.data.user} role={userInfo.data.role} />;
};

export default Nav;
