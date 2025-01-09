import React from "react";
import FollowerCredibilty from "./FollowerCredibilty";
import AgeSplit from "./AgeSplit";
import GenderSplit from "./GenderSplit";
import ListAffichage from "./ListAffichage";
import AudienceLooklikes from "./AudienceLooklikes";

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
    realFollowersPercentage: number;
    suspiciousFollowersPercentage: number;
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
  audience: Audience;
}

const AudienceGraph = () => {
  // const buildQueryString = (): string => {
  //   const query = `/accounts/audience/${id}`;
  //   return query;
  // };

  // const fetch = (): Promise<ResponseType> =>
  //   api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  // const { isLoading, error, data } = useQuery<ResponseType, Error>({
  //   queryKey: [buildQueryString()],
  //   queryFn: fetch,
  //   enabled: !!id,
  // });
  // if (error) return <Error />;
  // if (isLoading) return <Loading />;

  const data: ResponseType = {
    id: "guagd",
    audience: {
      analysis: {
        realFollowersPercentage: 70,
        suspiciousFollowersPercentage: 30,
      },
      gender: {
        F: 0.40,
        M: 0.47,
        U: 0.13,
      },
      age_groups: [
        {
          "13-17": 5.32,
        },
        {
          "18-24": 37.41,
        },
        {
          "25-34": 40.86,
        },
        {
          "35-44": 12.8,
        },
        {
          "45-64": 3.6,
        },
      ],
      countries: [
        {
          code: "FR",
          name: "france",
          value: 59.2,
        },
        {
          code: "MA",
          name: "morocco",
          value: 7.49,
        },
        {
          code: "DZ",
          name: "algeria",
          value: 3.76,
        },
        {
          code: "BE",
          name: "belgium",
          value: 3.31,
        },
        {
          code: "US",
          name: "united states",
          value: 1.84,
        },
      ],
      cities: [
        {
          country_code: "FR",
          name: "paris",
          value: 6.29,
        },
        {
          country_code: "FR",
          name: "lyon",
          value: 1.62,
        },
        {
          country_code: "DZ",
          name: "algiers",
          value: 1.34,
        },
        {
          country_code: "SN",
          name: "dakar",
          value: 1.25,
        },
        {
          country_code: "FR",
          name: "marseille",
          value: 1.23,
        },
      ],
      languages: [
        {
          code: "FR",
          name: "french",
          value: 78.05,
        },
        {
          code: "EN",
          name: "english",
          value: 12.51,
        },
        {
          code: "AR",
          name: "arabic",
          value: 4.02,
        },
        {
          code: "ES",
          name: "spanish",
          value: 1.35,
        },
        {
          code: "RU",
          name: "russian",
          value: 0.8,
        },
      ],
      affinities: {
        "brands": [
                {
                "id": 1408,
                "name": "Walt Disney",
                "weight": 0.105449
                },
                {
                "id": 956,
                "name": "Nike",
                "weight": 0.077195
                },
                {
                "id": 138,
                "name": "Apple",
                "weight": 0.067608
                },
                {
                "id": 34,
                "name": "Adidas",
                "weight": 0.057518
                },
                {
                "id": 943,
                "name": "Netflix",
                "weight": 0.030272
                }
        ],
        "interests" : [
          {
            "id": 1708,
            "name": "Friends, Family & Relationships",
            "weight": 0.376387
            },
            {
            "id": 21,
            "name": "Sports",
            "weight": 0.316852
            },
            {
            "id": 43,
            "name": "Travel, Tourism & Aviation",
            "weight": 0.307265
            },
            {
            "id": 13,
            "name": "Clothes, Shoes, Handbags & Accessories",
            "weight": 0.300706
            },
            {
            "id": 11,
            "name": "Camera & Photography",
            "weight": 0.299697
            }
        ]
      },
      lookalikes : [
        {
          "username": "gadelmaleh",
          "full_name": "GAD",
          "picture_url": "https://imgp.sptds.icu/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDYEJpPTTZOdwDEdj3qpQOUib0aUZuAuSGrtOy0vSWKeQ8elcrsy%2F0K%2Bsz5vMddhCwSkAICFPlCk68%2Fj8QyBrfa%2FgNlJUwVYqIiahjW32e%2BqWA%3D%3D",
          "url": "https://www.instagram.com/gadelmaleh"
          },
          {
          "username": "omarsyofficial",
          "full_name": "Omar Sy",
          "picture_url": "https://imgp.sptds.icu/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDbi%2FzCyzJZ6fg43%2BYylAG3qnDzYe7D72xeuR78K%2BedKWv9iUhZQXCK9t6V4JIpUThQ14TTZf6olxPRldW048gBKgNlJUwVYqIiahjW32e%2BqWA%3D%3D",
          "url": "https://www.instagram.com/omarsyofficial"
          },
          {
          "username": "kevadams",
          "full_name": "Kev Adams",
          "picture_url": "https://imgp.sptds.icu/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDY6%2BlN4nI8g5ywMDf0jnSXRMQCzmHYvtMMqyKCUUAXVUctU7AUSG%2FK5lBuT4tmMWGna1hRbxOU0wzMirTLoShNBWwq5%2BhsabX0Nc9aXCBbcsw%3D%3D",
          "url": "https://www.instagram.com/kevadams"
          },
          {
          "username": "malikbentalha",
          "full_name": "Malik Bentalha",
          "picture_url": "https://imgp.sptds.icu/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDZlWmgYQw8mX1KSF3S3nA7nLigE5t5ayNmrvxO3LpVTCNoWLrNapOPRDAxMOjSjj%2BhZQ%2B7F%2FtOgcAs8Zb3TPS7BWwq5%2BhsabX0Nc9aXCBbcsw%3D%3D",
          "url": "https://www.instagram.com/malikbentalha"
          }
      ]

      },
    }

  return (
    <div className="mb-12">
        <div>
          <div className="grid grid-cols-3 gap-5 mt-5 rounded-md">
            <FollowerCredibilty props={data.audience.analysis} />
            <AgeSplit props={data.audience.age_groups} />
            <GenderSplit props={data.audience.gender} /> 
            <ListAffichage
                props={{
                  title: "Location by countries",
                  data: data.audience.countries.map((country) => ({
                    key: country.name,
                    value: country.value,
                    image: `https://flagcdn.com/w40/${country.code.toLocaleLowerCase()}.png`,
                  })),
                }}
              />
              <ListAffichage
                props={{
                  title: "Location by cities",
                  data: data.audience.cities.map((city) => ({
                    key: city.name,
                    value: city.value,
                  })),
                }}
              />
               <ListAffichage
                props={{
                  title: "Languages",
                  data: data.audience.languages.map((lang) => ({
                    key: lang.name,
                    value: lang.value,
                  })),
                }}
              />
               <ListAffichage
                props={{
                  title: "Brand affinity",
                  data: data.audience.affinities.brands.map((lang) => ({
                    key: lang.name,
                    value: Number((lang.weight * 100).toFixed(2)),
                  })),
                }}
              />

              <ListAffichage
                props={{
                  title: "Interests",
                  data: data.audience.affinities.interests.map((interest) => ({
                    key: interest.name,
                    value: Number((interest.weight * 100).toFixed(2)),
                  })),
                }}
              />
               <AudienceLooklikes data={data.audience.lookalikes} /> 
        
          </div>
        </div>
     
    </div>
  );
};

export default AudienceGraph;
