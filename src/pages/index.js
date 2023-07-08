import React from "react";


import Preview from "../components/mainpage/preview";
import Practice from "../components/mainpage/practice";
import Projects from "../components/mainpage/projects";
import Start from "../components/mainpage/start";
import Next from "../components/mainpage/next";
import Designreview from "../components/mainpage/designreview";
import Footer from '../components/footer'

function IndexPage() {
  return (
    <section>
      <Preview />
      <Practice />
      <Projects />
      <Start />
      <Next />
      <Designreview />
      <Footer />
    </section>
  );
}

export default IndexPage;