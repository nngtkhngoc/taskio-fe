declare module "aos" {
  interface AosOptions {
    disable?: boolean | "phone" | "tablet" | "mobile";
    startEvent?: string;
    initClassName?: string;
    animatedClassName?: string;
    useClassNames?: boolean;
    disableMutationObserver?: boolean;
    debounceDelay?: number;
    throttleDelay?: number;
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: "top-bottom" | "center-bottom" | "bottom-bottom";
  }

  export function init(options?: AosOptions): void;
  export function refresh(): void;
  export function refreshHard(): void;
}
