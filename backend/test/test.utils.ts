import { clerkClient } from "@clerk/express";
import { prismaClient } from "../src/application/db";

const user_id = process.env.USER_ID as string;

export const getBearerToken = async () => {
  const { data } = await clerkClient.sessions.getSessionList({
    userId: user_id,
    limit: 1,
    status: "active",
  });
  const token = await clerkClient.sessions.getToken(data[0].id, "test");

  return `Bearer ${token.jwt}`;
};

export const removeAllTask = async () => {
  await prismaClient.task.deleteMany({
    where: { title: "test" },
  });
};

export const createTask = async () => {
  await prismaClient.task.create({
    data: {
      user_id: user_id,
      title: "test",
      description: "test",
      date: new Date(),
    },
  });
};
