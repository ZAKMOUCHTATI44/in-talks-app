"use client";
import api from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import Error from "../utils/Error";
import Loading from "../utils/Loading";
import { BASE_URL } from "@/lib/hepler";
import ActionStep from "./ActionStep";
import CreateNewStep from "./CreateNewStep";
import DeleteProject from "./DeleteProject";
import DailogAddCreators from "./DailogAddCreators";
import EditProjectName from "./EditProjectName";
import DeleteCreator from "../favlists/DeleteCreator";

const KanbanBoard = ({ id }: { id: string }) => {
  const [draggedTask, setDraggedTask] = useState<Account | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const buildQueryString = () => `/projects/${id}`;

  const fetch = (): Promise<Project> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Project, Error>({
    queryKey: [buildQueryString()],
    queryFn: fetch,
    enabled: !!id,
  });

  if (error) return <Error />;

  if (isLoading) return <Loading />;

  const handleDragStart = (task: Account, columnId: string) => {
    setDraggedTask(task);
    setDraggedColumn(columnId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (columnId: string) => {
    try {
      await api.patch(`/projects-steps/${draggedColumn}/creators`, {
        step: columnId,
        creator: draggedTask?.id,
      });
      queryClient.invalidateQueries({ queryKey: [buildQueryString()] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddInfluencers = async (
    activeColumn: string,
    accountId: string
  ) => {
    try {
      await api.post(`/projects-steps/${activeColumn}/creators`, {
        creators: [accountId],
      });
      queryClient.invalidateQueries({ queryKey: [buildQueryString()] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {data && (
        <div className="container mx-auto">
          <div className="flex justify-between items-center p-5">
            <div>
              <h1 className="text-2xl font-bold">{data?.label}</h1>
              <p className="text-sm">{data.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <EditProjectName
                id={id}
                queryName={buildQueryString()}
                name={data.label}
                description={data.description}
              />
              <CreateNewStep id={id} queryName={buildQueryString()} />
              <DeleteProject id={id} queryName={buildQueryString()} />
            </div>
          </div>

          {isLoading && <Loading />}

          <div className="flex gap-4 overflow-x-auto min-h-[600px] w-full p-5">
            {data.steps.map((column) => (
              <div
                key={column.id}
                className="flex-1 min-w-[300px] max-w-[500px] bg-darkColor rounded-md border border-gray-600 shadow-sm"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.id)}
              >
                <div className="px-2 py-4 border-b border-gray-600 flex justify-between items-center">
                  <h2 className="text-sm font-semibold">
                    {column.label} ({column.creators.length})
                  </h2>
                  <div className="flex gap-2">
                    <ActionStep
                      id={column.id}
                      queryName={buildQueryString()}
                      name={column.label}
                    />
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-2">
                  {column.creators.map((creator) => (
                    <div
                      key={creator.id}
                      draggable
                      onDragStart={() => handleDragStart(creator, column.id)}
                      className={`p-3 rounded-md border border-gray-600 shadow-md cursor-move transition-shadow duration-200 ${
                        draggedTask?.id === creator.id
                          ? "shadow-lg"
                          : "shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="rounded-full h-[50px] w-[50px]"
                          style={{
                            background:
                              "linear-gradient(45deg, #4ec6fb, #ff56e3)",
                          }}
                        >
                          <div
                            className="rounded-full mx-auto w-[48px] h-[48px] bg-contain p-0.5"
                            style={{
                              backgroundImage: `url(${BASE_URL}/media/account?id=${creator.picture})`,
                            }}
                          ></div>
                        </div>
                        <div
                          className="flex justify-between"
                          style={{
                            width: "-webkit-fill-available",
                          }}
                        >
                          <p className="text-sm font-medium mb-1">
                            {creator.name}
                          </p>
                          <DeleteCreator
                            id={id}
                            from="PROJECT"
                            queryName={buildQueryString()}
                            creator={creator.id}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <DailogAddCreators
                    handleChange={(id) => {
                      handleAddInfluencers(column.id, id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default KanbanBoard;
