import type { NextPage } from "next";
import Draw from "../../components/draw/Draw";
import { withAuth } from "../../components/utils/auth.hoc";

const DrawPage: NextPage = () => {
  return <Draw />;
};
export const getServerSideProps = withAuth(async (context) => {
  return {
    props: {},
  };
});
export default DrawPage;
