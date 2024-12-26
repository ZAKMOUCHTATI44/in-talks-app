// import React, { useState } from "react";
// import { Label } from "@/components/ui/label";
// import Error from "@/components/utils/Error";
// import Loading from "@/components/utils/Loading";
// import { useQueryHelper } from "@/components/utils/queryHelpers";
// import api from "@/lib/api";
// import { useQuery } from "@tanstack/react-query";
// import { AxiosResponse } from "axios";
// import { useRouter } from "next/navigation";
// import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
// import { MultiSelect } from "./multi-select";

// const frameworksList = [
//   { value: "react", label: "React", icon: Turtle },
//   { value: "angular", label: "Angular", icon: Cat },
//   { value: "vue", label: "Vue", icon: Dog },
//   { value: "svelte", label: "Svelte", icon: Rabbit },
//   { value: "ember", label: "Ember JS", icon: Fish },
//   { value: "reactjs", label: "React JS", icon: Turtle },
//   { value: "angularjs", label: "Angular  JS", icon: Cat },
//   { value: "vuejs", label: "Vue JS", icon: Dog },
//   { value: "sveltejs", label: "Svelte JS", icon: Rabbit },
//   { value: "emberjs", label: "Ember JS", icon: Fish },
// ];
// interface Response {
//   id: string;
//   name: string;
//   image: string;
//   sub: {
//     id: string;
//     name: string;
//     image: string;
//   }[];
// }

// const SelectCategory = () => {
//   const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
//     "react",
//     "angular",
//   ]);

//   const { createQueryString } = useQueryHelper();
//   const router = useRouter();

//   const fetchGategories = (): Promise<Response[]> =>
//     api.get("/categories").then((res: AxiosResponse) => res.data);

//   const { isLoading, error, data } = useQuery<Response[], Error>({
//     queryKey: ["/categories", "categories"],
//     queryFn: fetchGategories,
//   });

//   if (error) return <Error />;

//   if (isLoading) return <Loading />;

//   return (
//     <div className="flex flex-col gap-2 w-full">
//       <Label>Category & niches </Label>
//       {data && (
//           <MultiSelect
//             options={frameworksList}
//             onValueChange={setSelectedFrameworks}
//             defaultValue={selectedFrameworks}
//             placeholder="Category & niches"
//             variant="inverted"
//           />

//       )}
//     </div>
//   );
// };

// export default SelectCategory;


import React from 'react'

const SelectCategory = () => {
  return (
    <div>SelectCategory</div>
  )
}

export default SelectCategory