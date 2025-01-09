import { formatNumber } from "@/lib/number";
import Link from "next/link";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useQueryHelper } from "../utils/queryHelpers";
import DeleteCreator from "./DeleteCreator";

const DataTableFavlists = ({ data , id , queryName  }: { data: Account[] , id : string , queryName : string }) => {
  const router = useRouter();
  const { createQueryString } = useQueryHelper();

  const columns: TableColumn<Account>[] = [
    {
      name: "Creator",
      sortable: true,
      id: "name",
      selector: (row) => row.name,
      width: "450px",
      cell: (row) => (
        <Link
          href={`/influenceurs/show/${row.id}`}
          style={{ textDecoration: "none" }}
          target="_blank"
        >
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
                    backgroundImage: `url(${row.pictureUrl})`,
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
      maxWidth: "250px",
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
      maxWidth: "150px",
      cell(row) {
        console.log(row)
        return (
          <div className="flex justify-center flex-col items-center">
            <img src="/icons/504.png" alt="" height={25} width={25} />
            <p className="capitalize">Morocoo</p>
          </div>
        );
      },
      // selector: (row) => row.country.data.label,
    },
    {
      name: "Followers",
      sortable: true,
      id: "followers",
      width: "150px",
      cell(row) {
        return (
          <div className="flex flex-col gap-2 py-2">
            {Object.entries(row.networks)
              .slice(0, 4)
              .map(([key, value]) => (
                <div className="flex gap-1 items-center" key={key}>
                  <img
                    width={15}
                    height={15}
                    src={`/social-media/${value.network}.png`}
                    alt={value.network}
                  />
                  {formatNumber(Number(value.followers))}
                </div>
              ))}
          </div>
        );
      },
    },
    {
      name: "Action",
      sortable: true,
      cell(row) {
        return <DeleteCreator id={id} from="LIST" queryName={queryName} creator={row.id} />;
      },
    },
  ];

  return (
    <div className={`dark-datatable`}>
      <DataTable
        columns={columns}
        data={data || []}
        paginationTotalRows={data.length}
        paginationPerPage={50}
        paginationRowsPerPageOptions={[50, 100, 200]}
        paginationServer={true}
        pagination
        onChangePage={(e) => {
          router.push(`?${createQueryString("page", e.toString())}`);
          console.log(e);
        }}
      />
    </div>
  );
};

export default DataTableFavlists;
