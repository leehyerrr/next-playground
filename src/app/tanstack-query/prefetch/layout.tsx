import Providers from "./provider";

export default function Page({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
