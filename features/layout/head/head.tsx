import { default as NextHead } from "next/head";

type HeadProps = {
  title: string;
};

export function Head({ title }: HeadProps) {
  const documentTitle = `Project 360 - ${title}`;

  return (
    <NextHead>
      <title>{documentTitle}</title>
      <meta name="description" content="Splash page" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
}
