import { getParner } from "@/api/parner";
import { withCSR } from "@/HOC/with-CSR";
import { usePartner } from "@/hooks/api/partner";
import { dehydrate, QueryClient, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Home() {
  const {
    query: { privateLabel },
  } = useRouter();

  const { data, isLoading } = usePartner(privateLabel);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return <div>{data?.PartnerName}</div>;
}

export const getServerSideProps = withCSR(async (ctx: any) => {
  debugger;
  console.log("getServerSideProps");

  const { privateLabel } = ctx.params;
  console.log("url path" + ctx);

   const queryClient = new QueryClient();
 // Access the client
 //const queryClient = useQueryClient(ctx)
  let isError = false;

  try {
    await queryClient.fetchQuery(["privateSiteLabel", privateLabel], () =>
      getParner(privateLabel)
    );
  } catch (error: any) {
    isError = true;
    ctx.res.statusCode = error.response.status;
  }

  return {
    props: {
      //also passing down isError state to show a custom error component.
      isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
});
