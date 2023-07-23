import useSWR from "swr";
import { IDrizzleData } from "./CartListingDrizzle";

export function useDrizzleData() {
  const apiUrl = "/api/cart";
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: MyDrizzleCart, error: DrizzleError } = useSWR<IDrizzleData[]>(
    apiUrl,
    fetcher
  );

  return { MyDrizzleCart, DrizzleError };
}
