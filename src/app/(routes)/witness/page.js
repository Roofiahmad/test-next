"use client";
import { getCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Witness = () => {
  const router = useRouter();

  useEffect(() => {
    const witnessName = getCookie("witnessName");
    if (!witnessName) router.push("/");
  }, []);

  return <div>this is witness page</div>;
};

export default Witness;
