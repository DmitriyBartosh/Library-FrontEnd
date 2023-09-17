import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { checkBooleanObjectKeys } from "../../functions/other";
import { useStateContext } from "../../context/ContextProvider";

import Progress from "./progress";
import Head from "./head";
import Review from "../reviewing/status/reviewstatus";

function Index() {
  const { user, statusDirection } = useStateContext();

  return (
    <section>
      <Head user={user} />
      <Review />
      <Progress statusDirection={statusDirection} />
    </section>
  );
}

export default Index;
