import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import FollowerCredibilty from "./FollowerCredibilty";
import AgeSplit from "./AgeSplit";
import GenderSplit from "./GenderSplit";
import ListAffichage from "./ListAffichage";
import AudienceLooklikes from "./AudienceLooklikes";
import Image from "next/image";

type AgeGroup = {
  [key: string]: number; // Key represents age range as a string, e.g., "13-17", "18-24".
};

type Country = {
  code: string;
  name: string;
  value: number;
};

type City = {
  country_code: string;
  name: string;
  value: number;
};

type Language = {
  code: string;
  name: string;
  value: number;
};

type Affinity = {
  id: number;
  name: string;
  weight: number;
};

type Lookalike = {
  username: string;
  full_name: string;
  picture_url: string;
  url: string;
};

type Audience = {
  analysis: {
    cleared: number;
    flagged: number;
  };
  gender: {
    F: number;
    M: number;
    U: number;
  };
  age_groups: AgeGroup[];
  countries: Country[];
  cities: City[];
  languages: Language[];
  affinities: {
    brands: Affinity[];
    interests: Affinity[];
  };
  lookalikes: Lookalike[];
};

interface ResponseType {
  id: string;
  handle: string;
  network: string;
  snapshot: string;
  audience: Audience;
}

const AudienceGraph = ({ id }: { id: string }) => {
  const buildQueryString = (): string => {
    return `/creators/${id}/audience`;
  };

  const fetch = (): Promise<ResponseType[]> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<ResponseType[], Error>({
    queryKey: [buildQueryString()],
    queryFn: fetch,
    enabled: !!id,
  });
  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className="">
      {data && (
        <div>
          {data.map((item) => (
            <div
              className="grid grid-cols-3 gap-5 mt-5 rounded-md"
              key={item.id}
            >
              <div className="col-span-3">
                <h2 className="flex gap-2 justify-center items-center">
                  <Image
                    src={`/social-media/${item.network}.png`}
                    alt=""
                    width={25}
                    height={25}
                  />
                  {item.network} Audience
                </h2>
              </div>
              <FollowerCredibilty props={item.audience.analysis} />
              <AgeSplit props={item.audience.age_groups} />
              <GenderSplit props={item.audience.gender} />
              <ListAffichage
                props={{
                  title: "Location by countries",
                  data: item.audience.countries.map((country) => ({
                    key: country.name,
                    value: country.value,
                    image: `https://flagcdn.com/w40/${country.code.toLocaleLowerCase()}.png`,
                  })),
                }}
              />
              <ListAffichage
                props={{
                  title: "Location by cities",
                  data: item.audience.cities.map((city) => ({
                    key: city.name,
                    value: city.value,
                  })),
                }}
              />
              <ListAffichage
                props={{
                  title: "Languages",
                  data: item.audience.languages.map((lang) => ({
                    key: lang.name,
                    value: lang.value,
                  })),
                }}
              />
              <ListAffichage
                props={{
                  title: "Brand affinity",
                  data: item.audience.affinities.brands.map((lang) => ({
                    key: lang.name,
                    value: Number((lang.weight * 100).toFixed(2)),
                  })),
                }}
              />

              <ListAffichage
                props={{
                  title: "Interests",
                  data: item.audience.affinities.interests.map((interest) => ({
                    key: interest.name,
                    value: Number((interest.weight * 100).toFixed(2)),
                  })),
                }}
              />
              <AudienceLooklikes data={item.audience.lookalikes} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AudienceGraph;
