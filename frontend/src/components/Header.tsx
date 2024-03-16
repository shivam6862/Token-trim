import React from "react";
import classes from "@/styles/header.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className={classes["container"]}>
      <Link href="/chat/new">
        <Image src="/robot.jpg" alt="Logo" width={50} height={50} />
      </Link>
      <h1>Token Trim</h1>
    </div>
  );
}
