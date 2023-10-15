import React from "react";
import { useQuery } from "@tanstack/react-query";
import { telegramAuth } from "../../functions/auth";
import { Script } from "gatsby";

function Telegram() {
  const telegramAuthURL = useQuery({
    queryKey: ["telegram_auth"],
    queryFn: telegramAuth,
  });

  console.log(telegramAuthURL.data);

  return `${telegramAuthURL.data}`;
}

export default Telegram;
