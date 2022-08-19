import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const CLHS_NEWS_PAGE = (id: string) =>
  `https://www.clhs.tyc.edu.tw/ischool/public/news_view/show.php?nid=${id}`;

const Home: NextPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  if (typeof window !== "undefined") router.push(CLHS_NEWS_PAGE(id));

  return (
    <div>
      <Head>
        <title>壢中官網公告短網址</title>
        <meta name="description" content="壢中官網公告短網址" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website"></meta>
        <meta property="og:image" content={`${baseUrl}/api?id=${id}`} />
      </Head>
      redirecting...
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params?.id,
    },
  };
};

export default Home;
