import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { getPostBySlug, getSlugList, PageData } from "server/docs";
import { Head, DocsPage } from "components";
import getComponent from "md-import-mapping";

const DocsPageWrapper = ({
  navigation,
  meta: { description, h1, headers, title, githubUrl },
  versions,
  isLatestVersion,
}: PageData) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { href: latestVersionHref } = versions.find(({ isLatest }) => isLatest);
  const { title: currentVersionTitle } = versions.find(
    ({ isCurrent }) => isCurrent
  );

  const Content = getComponent(router.asPath);

  return (
    <>
      <Head title={title} description={description} />
      <DocsPage
        navigation={navigation}
        versions={versions}
        h1={h1}
        githubUrl={githubUrl}
        isLatestVersion={isLatestVersion}
        currentVersionTitle={currentVersionTitle}
        latestVersionHref={latestVersionHref}
        headers={headers}
      >
        <Content />
      </DocsPage>
    </>
  );
};

export default DocsPageWrapper;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const props = await getPostBySlug(params.slug);

  if (!props) {
    return { notFound: true };
  }

  return {
    props, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getSlugList(),
    fallback: false,
  };
};
