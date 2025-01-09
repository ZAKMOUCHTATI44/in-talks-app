"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DownloadAsPdf from "@/components/account/DownloadAsPdf";
import Feed from "@/components/social-listening/feed/Feed";
import { Star } from "lucide-react";
import FollowersDisptach from "@/components/account/reports/FollowersDisptach";
const Page = ({ params }: { params: { id: string } }) => {
  // const buildQueryString = (): string => {
  //   const query = `/brands/${params.id}`;
  //   return query;
  // };

  // const fetch = (): Promise<Account> =>
  //   api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  // const { isLoading, error, data } = useQuery<Account, Error>({
  //   queryKey: [buildQueryString()],
  //   queryFn: fetch,
  //   enabled: !!params.id,
  // });

  // if (error) return <Error />;

  console.log(params.id);

  return (
    <div className="px-5">
      <div>
        <div className="grid grid-cols-12 gap-2 items-stretch">
          <div className="col-span-6">
            <CardDetail />
          </div>
          <div className="col-span-6 flex flex-col gap-2">
            <NicheAccount />
            <DownloadAsPdf />
          </div>

          <Tabs defaultValue="feed" className="col-span-12 mt-5">
            <TabsList className="grid w-full grid-cols-5 dark:bg-darkColor">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="network-watch">Network Watch</TabsTrigger>
              <TabsTrigger value="creator-network">Creator Network</TabsTrigger>
              <TabsTrigger value="veille-concurrentielle">
                Veille concurrentielle
              </TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            </TabsList>
            <TabsContent value="feed" className="mt-5">
              <Feed />
            </TabsContent>
          </Tabs>

          {/* <div className="col-span-12">
              <AccountDispatch accounts={data.accounts} name={data.name} />
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Page;

const CardDetail = () => {
  return (
    <div className="dark:bg-darkColor dark:text-whiteColor bg-white shadow-md py-5 px-2 rounded-md">
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2">
          <div className="h-[75px] w-[75px]">
            <div
              className="rounded-full h-[75px] w-[75px]  mx-auto flex justify-start"
              style={{
                background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
              }}
            >
              <img
                src={
                  "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/1314863628.jpg"
                }
                width={74}
                height={74}
                className="rounded-full mx-auto w-[74px] h-[74px] bg-contain p-0.5"
                alt=""
              />
            </div>
          </div>

          <div className="w-full">
            <h2 className="font-semibold text-xl">Laboratoires Filorga</h2>
            <p className="text-xs font-medium capitalize">
              French Aesthetic Medicine Laboratory
            </p>
            <div className="w-full justify-start flex gap-2">
              <div className="flex items-center gap-5 py-2">
                <div
                  className="h-4 w-4 bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${`/social-media/instagram.png`})`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm">
          Laboratoires Filorga is a leading French laboratory specializing in
          expert anti-aging products. Founded in 1978, it is known for its
          innovative medi-cosmetics. Their official account shares information
          about their products, including their new antioxidant serum Hydra-AOX
          [5], which protects and revitalizes the skin, giving it a radiant
          glow. They also engage with their audience, encouraging them to share
          their skincare tips and experiences. Join them in their mission to
          improve and protect the quality of your skin.
        </p>
      </div>
      {/* <button onClick={() => generatePDF("pdf-content")}>Export to PDF</button>
      <Button  className="w-full my-5 bg-mainColor flex justify-center gap-2 items-center">
        Download pdf 
        <Download /> */}
      {/* </Button> */}
    </div>
  );
};

const NicheAccount = () => {
  const networks: Network[] = [
    {
      id: "dagdkabd",
      network: "instagram",
      name: "filogra",
      username: "filogra",
      pictureUrl: "string",
      bio: "string",
      followers: 157620,
      score: 92,
      verified: true,
    },
    {
      id: "dagdkabd",
      network: "linkedin",
      name: "filogra",
      username: "filogra",
      pictureUrl: "string",
      bio: "string",
      followers: 116200,
      score: 92,
      verified: true,
    },
    {
      id: "dagdkabd",
      network: "youtube",
      name: "filogra",
      username: "filogra",
      pictureUrl: "string",
      bio: "string",
      followers: 6320,
      score: 92,
      verified: true,
    },
  ];
  return (
    <div className="dark:bg-darkColor bg-white dark:text-whiteColor text-black shadow-lg border-gray-200 dark:border-gray-600 border py-5 px-5 rounded-md flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-semibold">Industries & Niches</h4>
        <div className="border border-gray-600 py-2 px-5 rounded-md flex gap-2">
          <Star fill="#FFF" className="text-yellow-400 h-5 w-5" />
          <p className=" capitalize">Soins Visages Anti-Âge</p>
        </div>
      </div>
      <FollowersDisptach data={networks} />
    </div>
  );
};
