declare module "next/navigation" {
  export function notFound(): never;
  export function useRouter(): {
    push(url: string): void;
  };
  export function usePathname(): string;
}
