import { getPartner } from "@/api/parner";

export default function Home(props : any) {
  console.log("partner:", props.data)
  return <div>{props.data?.PartnerName} Shradha</div>;
}

export const getServerSideProps = async (context : any) => {
  debugger;
  console.log("getServerSideProps");

  const { privateLabel } = context.params;
  console.log("url path" + context);

  let isError = false;
  let data = null;
  try {
    data = await getPartner(privateLabel);
  } catch (error: any) {
    isError = true;
    context.res.statusCode = error.response.status;
  }

  return {
    props: {
      isError,
      data: data,
    },
  };
}