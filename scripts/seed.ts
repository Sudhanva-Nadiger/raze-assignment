import { NewUser, insertUser } from "@/lib/db";

async function main() {
  const newUser: NewUser = {
    email: "foo@example.com",
    firstName: "foo",
    headline: "bar",
  };
  const res = await insertUser(newUser);
  console.log("insert user success", res);
  process.exit();
}

main();