
import GetAllUsers from "@/lib/getAllUsers";
import getUserById from "@/lib/getUserById";
import { Button } from "@mantine/core";
import { Icon24Hours } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";



export default async function FreeCourses({ params }: { params: { userId: number } }) {
  const userData: Promise<User> | undefined = getUserById(params.userId);

  const data = await userData;


  if (!data) notFound();


  return (
      <>
        <nav className="flex gap-20 aling-center bg-slate-300 justify-center p-20 ">
          <div className="text-4xl text-center text-teal-700">

            <Link href="/users"> {"<-"}</Link>{" "}
            {/* <Icon24Hours/>
            <Button>hello</Button> */}
          </div>
          <h1 className="text-3xl text-white">
            user <span className="text-teal-500 text-2xl">{data.username}</span>{" "}
            details
          </h1>
          <div>

            <p className="text-lg text-white">username : {data.name}</p>
            <p className="text-lg text-white">user email : {data.email}</p>
            <p className="text-lg text-white">phone : {data.phone}</p>
            <p className="text-lg text-white">website : {data.website}</p>
          </div>
        </nav>
    </>
  );
}

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export async function generateStaticParams() {

  const usersData: Promise<User[]> = GetAllUsers();
  const usersIds = await usersData;

  return usersIds.map((user) => ({
    userId: user.id.toString(),
  }));

}
