import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, FolderKanban, Plus, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BASE_URL } from "@/lib/hepler";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Error from "../utils/Error";
import Loading from "../utils/Loading";
import CreateNewProject from "../projects/CreateNewProject";

interface Pagination {
  data: Project[];
  count: number;
}

const ManageProjectsDiscovery = ({
  selectedInfluencers,
  clearSet,
}: {
  selectedInfluencers: Set<Account>;
  clearSet: () => void;
}) => {
  const queryClient = useQueryClient();

  // Selected Project
  const [selected, setSelected] = useState<Project | null>(null);
  // Selected Step Project

  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const queryBuilder = () => {
    const query = "projects";
    return query;
  };

  const fetch = (): Promise<Pagination> =>
    api.get(queryBuilder()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Pagination, Error>({
    queryKey: [queryBuilder()],
    queryFn: fetch,
  });

  if (error) return <Error />;

  const addCreatorsToProject = async () => {
    if (selected) {
      try {
        await api.post(`/projects-steps/${selectedStep?.id}/creators`, {
          creators: Array.from(selectedInfluencers).map((item) => item.id),
        });

        setOpen(false);
        queryClient.invalidateQueries({ queryKey: [queryBuilder()] });
        clearSet();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-mainColor text-white hover:bg-mainColor  hover:opacity-80">
            <FolderKanban className="h-4 w-4" />
            Ajouter au project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px] bg-darkColor text-whiteColor">
          <DialogHeader>
            <DialogTitle>
              <button className="border border-gray-600 rounded-lg flex items-center gap-1 px-5 py-1 text-sm">
                {Array.from(selectedInfluencers)
                  .slice(0, 4)
                  .map((influencer, index) => (
                    <div key={index}>
                      <div
                        className="rounded-full h-[35px] w-[35px] mx-auto flex justify-start ml-[-15px]"
                        style={{
                          background:
                            "linear-gradient(45deg, #4ec6fb, #ff56e3)",
                        }}
                      >
                        <div
                          className="rounded-full mx-auto w-[34px] h-[34px] bg-contain p-0.5"
                          style={{
                            backgroundImage: `url(${BASE_URL}/media/account?id=${influencer.insights.top.id})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                {selectedInfluencers.size} creator
              </button>
            </DialogTitle>
            <div className="flex py-5 items-center justify-between">
              <DialogDescription>Add creators to project</DialogDescription>
              <CreateNewProject queryName={queryBuilder()} />
            </div>
          </DialogHeader>
          {isLoading && <Loading />}
          <div className="flex flex-col gap-2 h-[400px] overflow-y-scroll">
            {selected ? (
              <>
                <ShowDetailProject
                  id={selected.id}
                  selected={selectedStep}
                  setSelected={setSelectedStep}
                />
              </>
            ) : (
              <>
                {data &&
                  data.data &&
                  data.data.length > 0 &&
                  data.data.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      selected={selected === project}
                      setSelected={(favSelected) => {
                        setSelected(favSelected);
                      }}
                    />
                  ))}
              </>
            )}
          </div>

          <DialogFooter className="w-full">
            {selected && (
              <div className="flex justify-center items-center gap-2 w-full">
                <Button
                  className="bg-gray-500 text-white hover:bg-gray-600 mx-auto"
                  onClick={() => {
                    setSelected(null);
                  }}
                >
                  <ArrowLeft />
                  Show List
                </Button>
                <Button
                  onClick={addCreatorsToProject}
                  className="bg-green-500 text-white w-full hover:bg-green-700"
                  type="submit"
                >
                  <Plus />
                  Ajouter
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ShowDetailProject = ({
  id,
  selected,
  setSelected,
}: {
  id: string;
  selected: Step | null;
  setSelected: (step: Step) => void;
}) => {
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

  return (
    <div className="flex flex-col gap-3">
      {data &&
        data.steps.length > 0 &&
        data.steps.map((item) => (
          <Button
            onClick={() => {
              setSelected(item);
            }}
            key={item.id}
            className={` w-full px-5 bg-darkColor border  text-white hover:bg-darkColor hover:opacity-95 py-5 h-auto justify-start ${
              selected?.id === item.id
                ? " border-mainColor "
                : "border-gray-600"
            }`}
          >
            {item.label}
          </Button>
        ))}
    </div>
  );
};

const ProjectCard = ({
  project,
  selected,
  setSelected,
}: {
  project: Project;
  selected: boolean;
  setSelected: (project: Project) => void;
}) => {
  return (
    <Button
      onClick={() => {
        setSelected(project);
      }}
      className={` w-full px-5 bg-darkColor border  text-white hover:bg-darkColor hover:opacity-95 py-5 h-auto justify-start ${
        selected ? " border-mainColor " : "border-gray-600"
      }`}
    >
      <div className="flex flex-col">
        <p>{project.label}</p>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <p>{project.creators_count}</p>
        </div>
      </div>
    </Button>
  );
};
export default ManageProjectsDiscovery;
