import { client } from "@/sanity/client-config";
import { postPathsQuery } from "@/sanity/lib/queries";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    draftMode().enable();

    const url = new URL(request.url)
    const slug = (url.searchParams.get("slug") || "/")
    const paths = await client.fetch(postPathsQuery);

    if (slug != null) {
        if (slug in paths) {
            return redirect(`/${slug}`)
        }
    }
    return redirect(`/`);
}