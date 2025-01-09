import React from "react";
import FeedCard from "./FeedCard";

const Feed = () => {
  // const buildQueryString = (): string => {
  //   const query = `/brands/${id}/mentions`;
  //   return query;
  // };

  // const fetch = (): Promise<Mentions> =>
  //   api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  // const { isLoading, error, data } = useQuery<Mentions, Error>({
  //   queryKey: [buildQueryString()],
  //   queryFn: fetch,
  //   enabled: !!id,
  // });

  // if (error) return <Error />;

  // if (isLoading) return <Loading />;

  const data: WebMention[] = [
    {
      id: "ada",
      picture: "data:image/jpeg;base64,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",
      domain: "https://mapara.ma/marque/1-filorga",
      link: {
        title: "FILORGA",
        text : `1er Laboratoire français de médecine esthétique, fondé en 1978, Filorga conçoit, développe et fabrique à l'origine des injectables utilisés par les plus grands ...`,
        date: "10-12-2024",
        url: "string",
        evaluation: 10,
      },
    },
    {
      id: "dalbndad",
      picture: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAgUGBwEDCAT/xAA8EAABAwICBQcKBAcAAAAAAAABAAIDBBEFEgYhMVKRBxNBUVNxkhYiMmGBk6HB0dIjQ1RiFBVkcoOxsv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABgRAQEBAQEAAAAAAAAAAAAAAAABESEC/9oADAMBAAIRAxEAPwCo7rBQhAIQgAucGtBc4mwAFyT1BAIVh6OcmUlS1s2kFTJShwuKSnAMo/ucbhvdY+xT/DtCNFaNoa3BaeX91TeYnxEqauOfULpjyR0WqWZH6P4WAd2kY08QLqA6Xck9OysZNgNWKaCQHNTz3eGH9rttu+/yVRUiFJdJdC8S0eom1lTNTSwOkEZMbjmBN7aiNmpRkoBCLrCBaFi6EAp9yS6PT1mOQ4tOwR0cGdsMsmx0xBDSOsNJ29dukaolo3TUdZpBh1LiTnCkmnayTKbE32C/QCbA+oroCRkVLCyGCNsUMTQ1jGNsGgbAAFcDlT0LqZgY+FweBrNr3PesS0skkheInh3XsS6Wtc+nblkzW9RCTLVSbp4rN8rrbAHU7CZngnoAPzTdXVL5ZQW6z8AEuWe7LWJeegJLYRGwZjdztpWpEtRvlQoXTaD1crRfm+bl9ge2/wALqiSujuUGtoKPQWvjrpQznqV0MYGsvkc2zQB3/AErnFKBCxdF1BlCwhAprnscHxuLXtIc1w6CNhXQ9BVDGcDpaxrnM/ioGyEt2tJGscdS52Vucj+K1c+GVVFO2N9NROaISQQ4Zy4kE9XVq6VYJfQU9Q0OMNaxgLtQfHbZ7QSvbDJOHETGF0dtTmuJcT9PaVtEtLkIfE5t+ljr/wC1qcKdxBjqHR9HnMuVcTW11Q0NGorRWzMgjdUVMrY4IWl73ONg0DWSUBjNeaojcOggjUq05TNI5MUeMIwtsrqOOxnlaw/jP6AOto+J7tYRbTbSibSfFTLdzaKG7aaI9A3j6z8BYKOpUrHxSOjlY5j27WuaQR7CkLKhCFhBm6Ft58dlF4Ajnx2UXgCuDUrK5IdZeLanVrQR1/gSquxOOxi8AU95P5y7Ba4MAjcyrYbs83a23yTEW/zEI/Jj8ARzUXREzwhYwaSEYK2SRjpX84G2a3M65IHDWvJU4oyO+WnebAmwi1+iHbL+tW8WPXzUXZs8ISmRxh7bMbt3QmmkxOKSqYJYZBmIABj9G4Ju7q6u8heqWO5qXsJDQ11rFJEtURyguzacY2f6oj4BR5Pelk4OkuJeax1qhwuRrNtXyTOZgPy4+CikIulc+Ozj8KOfHZx8FAhFlIPJSrOytw8/5j9qDonW9FXQe+P2rSGAKecm4LqPEQNnOxX4OTD5J4h+ooPfH7U64HheI4S2odHV0zJJMoGSUkEC+3V61RZtDiMtFSPbkeS70XM12PcvDU47ipvzdj0XdCRrTVDilWzCxE6sIqrnz2yjKR3WTRJV465xIxGD2lv0TiRJYMUrDIROxzib3yMsCpBh9RLNQzMDHN8w+kCq6gq8bY4GTEISP2ub9F6v5vjrWPZFiUbGuFjbLfjZNFd4+4ux7Eif1c3/AGU3lSCXRjEJJXv5+kOZxOZ85JOvadW1I8lMQ7ei98fostGFCfvJTEO3ovfH6I8k8Q7ai98fogYsjd0cEZG7o4JSFAnI3dHBGRu6OCUhAnI3dHBGRu6OCUhAnI3dHBGRu6OCUhAnI3dHBGRu6OCUhAnI3dHBGRu6OCUhB//Z",
      domain: "https://mapara.ma/marque/1-filorga",
      link: {
        title: "Laboratoires FILORGA",
        text : `FILORGA EST LE 1ER LABORATOIRE FRANÇAIS DE MEDECINE ESTHETIQUE. Spécialiste de soins cosmétiques innovants à l'efficacité anti âge visible dès 7 jours, ...`,
        date: "10-12-2024",
        url: "string",
        evaluation: 10,
      },
    },
    {
      id: "adadada",
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcG_VCk07Syj8luzTKdPdOfHBamEgOI7MRFKXEcAtxoTMXQmDy8JvT&usqp=CAE&s",
      domain: "https://mapara.ma/marque/1-filorga",
      link: {
        title: "FILORGA Laboratories | official website",
        text : `Specialist in innovative cosmetic care with visible anti-ageing effectiveness from 7 days. Discover the world of FILORGA now.`,
        date: "10-12-2024",
        url: "string",
        evaluation: 10,
      },
    },
    {
      id: "adadad",
      picture: "data:image/jpeg;base64,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",
      domain: "https://mapara.ma/marque/1-filorga",
      link: {
        title: "FILORGA",
        text : `1er Laboratoire français de médecine esthétique, fondé en 1978, Filorga conçoit, développe et fabrique à l'origine des injectables utilisés par les plus grands ...`,
        date: "10-12-2024",
        url: "string",
        evaluation: 10,
      },
    },
    {
      id: "dadad",
      picture: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAgUGBwEDCAT/xAA8EAABAwICBQcKBAcAAAAAAAABAAIDBBEFEgYhMVKRBxNBUVNxkhYiMmGBk6HB0dIjQ1RiFBVkcoOxsv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABgRAQEBAQEAAAAAAAAAAAAAAAABESEC/9oADAMBAAIRAxEAPwCo7rBQhAIQgAucGtBc4mwAFyT1BAIVh6OcmUlS1s2kFTJShwuKSnAMo/ucbhvdY+xT/DtCNFaNoa3BaeX91TeYnxEqauOfULpjyR0WqWZH6P4WAd2kY08QLqA6Xck9OysZNgNWKaCQHNTz3eGH9rttu+/yVRUiFJdJdC8S0eom1lTNTSwOkEZMbjmBN7aiNmpRkoBCLrCBaFi6EAp9yS6PT1mOQ4tOwR0cGdsMsmx0xBDSOsNJ29dukaolo3TUdZpBh1LiTnCkmnayTKbE32C/QCbA+oroCRkVLCyGCNsUMTQ1jGNsGgbAAFcDlT0LqZgY+FweBrNr3PesS0skkheInh3XsS6Wtc+nblkzW9RCTLVSbp4rN8rrbAHU7CZngnoAPzTdXVL5ZQW6z8AEuWe7LWJeegJLYRGwZjdztpWpEtRvlQoXTaD1crRfm+bl9ge2/wALqiSujuUGtoKPQWvjrpQznqV0MYGsvkc2zQB3/AErnFKBCxdF1BlCwhAprnscHxuLXtIc1w6CNhXQ9BVDGcDpaxrnM/ioGyEt2tJGscdS52Vucj+K1c+GVVFO2N9NROaISQQ4Zy4kE9XVq6VYJfQU9Q0OMNaxgLtQfHbZ7QSvbDJOHETGF0dtTmuJcT9PaVtEtLkIfE5t+ljr/wC1qcKdxBjqHR9HnMuVcTW11Q0NGorRWzMgjdUVMrY4IWl73ONg0DWSUBjNeaojcOggjUq05TNI5MUeMIwtsrqOOxnlaw/jP6AOto+J7tYRbTbSibSfFTLdzaKG7aaI9A3j6z8BYKOpUrHxSOjlY5j27WuaQR7CkLKhCFhBm6Ft58dlF4Ajnx2UXgCuDUrK5IdZeLanVrQR1/gSquxOOxi8AU95P5y7Ba4MAjcyrYbs83a23yTEW/zEI/Jj8ARzUXREzwhYwaSEYK2SRjpX84G2a3M65IHDWvJU4oyO+WnebAmwi1+iHbL+tW8WPXzUXZs8ISmRxh7bMbt3QmmkxOKSqYJYZBmIABj9G4Ju7q6u8heqWO5qXsJDQ11rFJEtURyguzacY2f6oj4BR5Pelk4OkuJeax1qhwuRrNtXyTOZgPy4+CikIulc+Ozj8KOfHZx8FAhFlIPJSrOytw8/5j9qDonW9FXQe+P2rSGAKecm4LqPEQNnOxX4OTD5J4h+ooPfH7U64HheI4S2odHV0zJJMoGSUkEC+3V61RZtDiMtFSPbkeS70XM12PcvDU47ipvzdj0XdCRrTVDilWzCxE6sIqrnz2yjKR3WTRJV465xIxGD2lv0TiRJYMUrDIROxzib3yMsCpBh9RLNQzMDHN8w+kCq6gq8bY4GTEISP2ub9F6v5vjrWPZFiUbGuFjbLfjZNFd4+4ux7Eif1c3/AGU3lSCXRjEJJXv5+kOZxOZ85JOvadW1I8lMQ7ei98fostGFCfvJTEO3ovfH6I8k8Q7ai98fogYsjd0cEZG7o4JSFAnI3dHBGRu6OCUhAnI3dHBGRu6OCUhAnI3dHBGRu6OCUhAnI3dHBGRu6OCUhAnI3dHBGRu6OCUhB//Z",
      domain: "https://mapara.ma/marque/1-filorga",
      link: {
        title: "Laboratoires FILORGA",
        text : `FILORGA EST LE 1ER LABORATOIRE FRANÇAIS DE MEDECINE ESTHETIQUE. Spécialiste de soins cosmétiques innovants à l'efficacité anti âge visible dès 7 jours, ...`,
        date: "10-12-2024",
        url: "string",
        evaluation: 10,
      },
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 pb-12">
      <div className="col-span-3 flex flex-col gap-2">
        {data.map((post) => (
          <FeedCard key={post.id} data={post} />
        ))}

        {/* {data &&
          data.mentions &&
          data.mentions.social.map((post) => <FeedCard data={post} />)} */}
      </div>
    </div>
  );
};

export default Feed;
