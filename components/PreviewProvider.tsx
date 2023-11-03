"use client";

import dynamic from "next/dynamic";
import { suspend } from "suspend-react";

import LiveQueryProvider from "@sanity/preview-kit";
// const LiveQueryProvider = dynamic(() => import("next-sanity/preview"));

// suspend-react cache is global, so we use a unique key to avoid collisions
const UniqueKey = Symbol("../sanity/client-config");

export default function PreviewProvider({
    children,
    token,
}: {
    children: React.ReactNode;
    token: string;
}) {
    const { client } = suspend(
        () => import("../sanity/client-config"),
        [UniqueKey]
    );
    if (!token) {
        throw new TypeError("Missing token");
    }
    return (
        <LiveQueryProvider
            client={client}
            token={token}
        // Uncomment below to see debug reports
        // logger={console}
        >
            {children}
        </LiveQueryProvider>
    );
}