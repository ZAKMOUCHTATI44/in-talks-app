import KanbanBoard from "@/components/projects/KanbanBoard";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
   <div>
    <KanbanBoard id={params.id} />
   </div>
  );
};

export default Page;
