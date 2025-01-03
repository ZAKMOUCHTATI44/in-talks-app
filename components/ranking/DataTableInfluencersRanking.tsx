import { BASE_URL } from "@/lib/hepler";
import { formatNumber } from "@/lib/number";
import Link from "next/link";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useQueryHelper } from "../utils/queryHelpers";

interface Pagination {
  data: Account[];
  cursor: {
    total: number;
    page: number;
    count: number;
  };
}

const DataTableInfluencersRanking = ({
  data,
  isLoading,
}: {
  data: Pagination;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const { createQueryString } = useQueryHelper();

  const [page, setPage] = useState<number>(1);

  const columns: TableColumn<Account>[] = [
    {
      name: "Ranking",
      sortable: true,
      id: "rank",
      width: "110px",
      selector: (row) => row.id,
      cell(row) {
        return (
          <div className="flex justify-center text-whiteColor">
            {/* {[1, 2, 3].includes(row) ? (
              <img width={25} height={25} src={`/images/icons/${row.rank}.png`} alt={row.fullName} />
            ) : (
            )} */}
            <p className="text-lg">{row.rank}</p>
          </div>
        );
      },
    },
    {
      name: "Creator",
      sortable: true,
      id: "name",
      selector: (row) => row.name,
      minWidth: "450px",
      cell: (row) => (
        <Link href={`/report/${row.id}`} style={{ textDecoration: "none" }}>
          <div className="flex items-center py-2 gap-2">
            <span>
              <div
                className="rounded-full h-[50px] w-[50px] mx-auto flex justify-start"
                style={{
                  background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
                }}
              >
                <div
                  className="rounded-full mx-auto w-[48px] h-[48px] bg-contain p-0.5"
                  style={{
                    backgroundImage: `url(${BASE_URL}/media/account?id=${row.insights.top.id})`,
                  }}
                ></div>
              </div>
            </span>
            <div>
              <p className="text-sm">{row.name}</p>
              <p className="text-xs capitalize">{row.title}</p>
              <p className="text-xs text-gray-400">
                {row.description.substring(0, 100)} ...
              </p>
            </div>
          </div>
        </Link>
      ),
    },
    {
      name: "Niche",
      sortable: true,
      id: "niche",
      minWidth: "250px",
      selector: (row) => row.title,
      cell(row) {
        return (
          <div>
            {row.categories.map((category) => (
              <Button
                key={category.name}
                size={"sm"}
                className="text-xs capitalize bg-bgDarkColor text-whiteColor rounded-md"
              >
                {category.name}
              </Button>
            ))}
          </div>
        );
      },
    },
    {
      name: "Country",
      sortable: true,
      id: "country",
      minWidth: "150px",
      cell(row) {
        return (
          <div className="flex justify-center flex-col items-center">
            <img src="/icons/504.png" alt="" height={25} width={25} />
            <p className="capitalize">{row.country.data.label}</p>
          </div>
        );
      },
      selector: (row) => row.country.data.label,
    },
    {
      name: "Followers",
      sortable: true,
      id: "followers",
      width: "150px",
      cell(row) {
        return (
          <div className={`flex  gap-2 py-2 flex-col gap-2`}>
            {Object.entries(row.accounts)
              .slice(0, 4)
              .map(([key, value]) => (
                <div className="flex gap-1 items-center" key={key}>
                  <img
                    width={15}
                    height={15}
                    src={`/social-media/${value.network}.png`}
                    alt={value.network}
                  />
                  {formatNumber(Number(value.subscribers))}
                </div>
              ))}
          </div>
        );
      },
    },
    {
      name: "Growth",
      sortable: true,
      id: "growth",
      cell(row) {
        return (
          <p className="text-xs dark:bg-[#21BA4526] bg-green-400 text-white px-3 py-1 rounded-md">
            + {row.insights.top.growth} %
          </p>
        );
      },
    },
  ];

  return (
    <div>
      <div className={`dark-datatable`}>
        {/* <DataTable
          columns={columns}
          data={data.data || []}
          paginationTotalRows={data.cursor.total}
          paginationPerPage={50}
          paginationRowsPerPageOptions={[50, 100, 200]}
          paginationServer={true}
          progressPending={isLoading}
          paginationDefaultPage={1}
          pagination
          onChangePage={(e) => {
            setPage(e);
          }}
        /> */}
        <DataTable
          columns={columns}
          data={data.data}
          progressPending={isLoading}
          pagination
          paginationServer
          paginationTotalRows={200}
          paginationPerPage={50}
          onChangeRowsPerPage={(e) => {
            setPage(e);
            router.push(`?${createQueryString("page", page.toString())}`);
            // if (e != page) {
            //   setPage(e);
            // }
          }}
        />
        ;
      </div>
    </div>
  );
};

export default DataTableInfluencersRanking;
