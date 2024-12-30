import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Error from "../utils/Error";
import { BASE_URL } from "@/lib/hepler";
import Loading from "../utils/Loading";
interface Pagination {
  data: Account[];
  total: string;
}

const DailogAddCreators = ({handleChange} : {handleChange : (id : string) => void }) => {
  const [value, setValue] = React.useState("");

  const [open , setOpen] = useState<boolean>(false)
  const buildQueryString = (): string => {
    let queryString = "/search";
    const name = value;

    if (name != null) {
      queryString += `?q=${name}`;
    }
    return queryString;
  };

  const fetch = (): Promise<Pagination> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Pagination, Error>({
    queryKey: [buildQueryString(), value],
    queryFn: fetch,
    enabled: value !== "",
  });

  if (error) return <Error />;

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full border border-dashed border-gray-500 bg-transparent text-gray-400 hover:bg-transparent mt-5">
            <Plus />
            Add a creator
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-[600px] bg-darkColor flex flex-col gap-2">
          <DialogHeader className="space-y-0">
            <DialogTitle>Add a creator</DialogTitle>
            <DialogDescription>
              Easily add a creator in your project
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Input
              placeholder="Search for a creator or a brand"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Search className="w-5 h-5 absolute top-1/2 right-5 transform -translate-y-1/2" />
          </div>

          <div className=" overflow-y-scroll flex flex-col gap-1">

            {isLoading && <Loading />}
            {data &&
              data.data &&
              data.data.length > 0 &&
              data.data.map((account) => (
                <div
                onClick={() => {
                    setOpen(false)
                    handleChange(account.id)
                    setValue('')
                }}
                key={account.id}  className="flex items-center gap-2 py-3 hover:bg-mainColor rounded-md px-2">
                  <div
                    className="rounded-full h-11 w-11 flex justify-start"
                    style={{
                      background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
                    }}
                  >
                    <div
                      className="rounded-full mx-auto w-10 h-10 bg-contain p-0.5"
                      style={{
                        backgroundImage: `url(${BASE_URL}/media/account?id=${account.picture})`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm">{account.name}</p>
                </div>
              ))}
          </div>

          <div className="grid py-2"></div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DailogAddCreators;
