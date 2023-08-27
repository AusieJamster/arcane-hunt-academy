import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "~/components/PageLayout";
import WeaponView from "~/components/WeaponView";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const SingleWeaponPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.weapons.getById.useQuery({ id });
  if (!data?.weapon) return <>404</>;

  return (
    <>
      <Head>
        <title>{`${data.weapon.name} - Arcane Academy`}</title>
      </Head>
      <PageLayout>
        <WeaponView {...data.weapon} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper;

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("Invalid ID");

  await ssg.weapons.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SingleWeaponPage;
