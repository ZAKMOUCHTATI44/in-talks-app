import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CardProject = ({ project }: { project: Project }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/projects/${project.id}`);
      }}
      className="bg-darkColor w-full rounded-md py-5 text-whiteColor"
    >
      <h2 className="capitalize border-b border-gray-600 pb-3 px-3">
        {project.label}
      </h2>
      <div className="px-3 py-5">
        <div className="flex ">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <p>{project.creators_count}</p>
          </div>

          <div></div>
        </div>
        <p className="pt-5 text-sm">{project.description}</p>
      </div>
    </div>
  );
};

export default CardProject;
