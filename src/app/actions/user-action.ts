"use server";

const DB = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Sam" },
  { id: 4, name: "Bob two" },
];

const searchUsers = async (name: string) => {
  return DB.filter((user) => user.name.includes(name));
};

export default searchUsers;
