import React from "react";
import { Link } from "gatsby";
import MetaTag from "../components/metaTag";
import { indexSEO } from "../data/seo";

function IndexPage() {
  return (
    <div>
      <h1>Стартовая страница</h1>
      <Link to="/blog">Блог</Link>
    </div>
  );
}

export default IndexPage;

export const Head = () => {
  return <MetaTag data={indexSEO} />;
};
