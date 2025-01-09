import React, { useState } from "react";
import { Button } from "../ui/button";
import { Heart, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateNewFav from "../favlists/CreateNewFav";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Error from "../utils/Error";
import Loading from "../utils/Loading";
import { useSession } from "next-auth/react";


const ManageFavoritesDiscovery = ({
  selectedInfluencers,
  clearSet,
}: {
  selectedInfluencers: Set<Account>;
  clearSet: () => void;
}) => {
  const queryClient = useQueryClient();

  const { data: session } = useSession();


  const [selected, setSelected] = useState<FavList | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const queryBuilder = () => {
    const query = "favorites";
    return query;
  };

  const fetch = (): Promise<FavList[]> =>
    api.get(queryBuilder()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<FavList[], Error>({
    queryKey: [queryBuilder()],
    queryFn: fetch,
    enabled: !!session?.user.accessToken,
  });

  if (error) return <Error />;

  const addInfluencersToFavList = async () => {
    if (selected) {
      try {
        const res = await api.post(`/favorites/${selected.id}/add-accounts`, {
          accounts: Array.from(selectedInfluencers).map((item) => item.id),
        });
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: [queryBuilder()] });
        console.log(res);
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
          <Button className="bg-darkColor text-whiteColor border border-gray-600 hover:bg-darkColor hover:opacity-80">
            <Heart />
            Manage lists
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
                            backgroundImage: `url(${influencer.pictureUrl})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                {selectedInfluencers.size} creator
              </button>
            </DialogTitle>
            <div className="flex py-5 items-center justify-between">
              <DialogDescription>Add creators to lists</DialogDescription>
              <CreateNewFav queryName={queryBuilder()} />
            </div>
          </DialogHeader>
          {isLoading && <Loading />}
          <div className="flex flex-col gap-2 h-[400px] overflow-y-scroll">
            {data &&
              data.length > 0 &&
              data.map((fav) => (
                <FavCard
                  key={fav.id}
                  fav={fav}
                  selected={selected === fav}
                  setSelected={(favSelected) => {
                    setSelected(favSelected);
                  }}
                />
              ))}
          </div>
          <DialogFooter>
            <Button
              onClick={addInfluencersToFavList}
              className="bg-green-500 text-white w-full hover:bg-green-700"
              type="submit"
            >
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const FavCard = ({
  fav,
  selected,
  setSelected,
}: {
  fav: FavList;
  selected: boolean;
  setSelected: (fav: FavList) => void;
}) => {
  return (
    <Button
      onClick={() => {
        setSelected(fav);
      }}
      className={` w-full px-5 bg-darkColor border  text-white hover:bg-darkColor hover:opacity-95 py-5 h-auto justify-start ${
        selected ? " border-mainColor " : "border-gray-600"
      }`}
    >
      <div className="flex ml-5">
        {fav.pictures.length > 0 &&
          fav.pictures.slice(0, 4).map((item) => (
            <div
              key={item}
              className={`rounded-full h-[40px] w-[40px] mx-auto flex justify-start ml-[-20px]`}
              style={{
                background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
              }}
            >
              <div
                className="rounded-full mx-auto w-[38px] h-[38px] bg-contain p-0.5"
                style={{
                  backgroundImage: `url(${item})`,
                }}
              ></div>
            </div>
          ))}
      </div>
      <div className="flex flex-col">
        <p>{fav.name}</p>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <p>{fav.accountsCount}</p>
        </div>
      </div>
    </Button>
  );
};
export default ManageFavoritesDiscovery;
