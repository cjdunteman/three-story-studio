import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "f8y83dz4",
    dataset: "production",
    apiVersion: "2023-06-11",
    useCdn: false,
});