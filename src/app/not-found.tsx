"use client";
import Link from "next/link";
import React from "react";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
