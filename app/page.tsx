"use server";
import metaUsers from "@/db/models/analytics/meta_users";
import React from "react";

async function showCurrentUser(ip: string) {
  const user = await metaUsers.getMetaUser(ip);

  if (user) {
    return user;
  }

  try {
    const user = await metaUsers.createMetaUser({ meta_user_id: ip });
    return user;
  } catch (error) {
    console.log(error);
  }
}

const HomePage = async () => {
  const user = await showCurrentUser("127j.1.1.1");

  console.log(user);
  return <div>HomePage</div>;
};

export default HomePage;
