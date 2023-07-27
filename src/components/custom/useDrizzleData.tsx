import useSWR from "swr";
import { IDrizzleData } from "./CartListingDrizzle";
const apiUrl = process.env.NEXT_PUBLIC_CART_API_URL || "";

export function useDrizzleData() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: MyDrizzleCart, error: DrizzleError } = useSWR<IDrizzleData[]>(
    apiUrl,
    fetcher
  );

  return { MyDrizzleCart, DrizzleError };
}
