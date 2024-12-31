import { Users } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CardProject = ({ project }: { project: Project }) => {
  return (
    <div

      className="bg-darkColor w-full rounded-md pt-5 text-whiteColor flex flex-col justify-between"
    >
      <h2 className="capitalize border-b border-gray-600 pb-3 px-3">
        {project.label}
      </h2>
      <div className="px-3 pt-5">
        <div className="flex ">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <p>{project.creators_count}</p>
          </div>

          <div></div>
        </div>
        <p className="pt-5 text-sm">{project.description}</p>

        <Button
          asChild
          className="mt-3 bg-darkColor text-whiteColor border border-gray-600 w-full mb-3 hover:bg-mainColor hover:text-white"
        >
          <Link href={`/projects/${project.id}`}>
            <Users />
            Consulter le project
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CardProject;
