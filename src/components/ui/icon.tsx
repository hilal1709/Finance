import { cn } from "@/lib/utils";

// Potlab Icons by Suresh · https://www.potlabicons.com/
// Use the gallery's SVG shapes with currentColor and the workspace's motion rules.
const glyphs = {
  add: (
    <>
      <path fill="currentColor" fillRule="evenodd" d="M12.75 8.744a.75.75 0 00-1.5 0v2.506H8.744a.75.75 0 000 1.5h2.506v2.506a.75.75 0 001.5 0V12.75h2.506a.75.75 0 000-1.5H12.75V8.744z" clipRule="evenodd" />
      <rect width="16" height="16" x="4" y="4" stroke="currentColor" strokeWidth="1.5" rx="2.075" />
    </>
  ),
  analytics: (
    <>
      <rect width="16" height="16" x="4" y="4" stroke="currentColor" strokeWidth="1.5" rx="2.075" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 15l2.658-4.5 3.158 3.5L16.5 9" />
    </>
  ),
  arrow: <path fill="currentColor" fillRule="evenodd" d="M13.155 16.834a.714.714 0 001.006-.091l3.564-4.277a.711.711 0 000-.932L14.16 7.257a.714.714 0 00-1.097.915l2.565 3.078H7.9a.75.75 0 000 1.5h7.73l-2.565 3.078a.714.714 0 00.091 1.006z" clipRule="evenodd" />,
  asset: (
    <>
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M6 8.55v8.334c0 .92.768 1.667 1.714 1.667h8.572c.947 0 1.714-.746 1.714-1.667V8.551m-7 2.899h2" />
      <path fill="currentColor" fillRule="evenodd" d="M4.087 5.45H3.87a.533.533 0 00-.533.532v.967c0 .295.238.533.533.533h16.26a.533.533 0 00.533-.533v-.967a.533.533 0 00-.533-.533H4.087z" clipRule="evenodd" />
    </>
  ),
  bell: (
    <>
      <g strokeWidth="1.5">
        <path stroke="currentColor" d="M12.29 3.398a5 5 0 00-5 5v2c0 .758-.441 1.505-1.005 2.012a3 3 0 002.005 5.232h8a3 3 0 002.006-5.232c-.564-.507-1.005-1.254-1.005-2.012v-2a5 5 0 00-5-5z" />
        <path stroke="currentColor" strokeLinecap="round" d="M14.68 20.312l-.042.01a9.713 9.713 0 01-4.67-.01" />
      </g>
    </>
  ),
  chart: (
    <>
      <path stroke="currentColor" strokeWidth="1.5" d="M17.82 16.889a7 7 0 001.162-3.39A.473.473 0 0018.5 13h-6a.5.5 0 01-.5-.5v-6a.473.473 0 00-.5-.482 7 7 0 106.32 10.871z" />
      <path stroke="currentColor" strokeWidth="1.5" d="M19 11c.552 0 1.009-.45.917-.995a6 6 0 00-4.922-4.922C14.451 4.992 14 5.448 14 6v4a1 1 0 001 1h4z" />
    </>
  ),
  "chevron-down": <path fill="currentColor" d="M6.832 10.516a.857.857 0 111.097-1.317l4.594 3.828L17.117 9.2a.857.857 0 011.098 1.317l-5.132 4.276a.853.853 0 01-.933.123.85.85 0 01-.187-.123l-5.131-4.276z" />,
  "chevron-left": <path fill="currentColor" d="M14.008 17.692a.857.857 0 001.317-1.098L11.495 12l3.829-4.594a.857.857 0 00-1.317-1.098L9.73 11.44a.85.85 0 00-.208.56.854.854 0 00.208.56l4.277 5.132z" />,
  "chevron-right": <path fill="currentColor" d="M11.039 17.692a.857.857 0 01-1.317-1.098L13.55 12 9.722 7.406a.857.857 0 111.317-1.098l4.276 5.132a.848.848 0 01.208.56.854.854 0 01-.208.56l-4.276 5.132z" />,
  close: <path fill="currentColor" d="M10.242 9.18a.75.75 0 00-1.061 1.062l1.79 1.79-1.79 1.79a.75.75 0 001.06 1.06l1.79-1.79 1.79 1.79a.75.75 0 001.062-1.06l-1.79-1.79 1.79-1.79a.75.75 0 10-1.061-1.061l-1.79 1.79-1.79-1.79z" />,
  download: (
    <>
      <path fill="currentColor" d="M12.75 6.432a.75.75 0 00-1.5 0h1.5zm-1.5 6a.75.75 0 001.5 0h-1.5zm-1.22-2.53a.75.75 0 10-1.06 1.06l1.06-1.06zm1.97 3.03l-.53.53a.75.75 0 001.06 0l-.53-.53zm3.03-1.97a.75.75 0 00-1.06-1.06l1.06 1.06zm-3.78-4.53v6h1.5v-6h-1.5zm-2.28 4.53l2.5 2.5 1.06-1.06-2.5-2.5-1.06 1.06zm3.56 2.5l2.5-2.5-1.06-1.06-2.5 2.5 1.06 1.06z" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 17.274h8" />
    </>
  ),
  file: (
    <>
      <rect width="10" height="14" x="7" y="5" stroke="currentColor" strokeWidth="1.5" rx="1" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M10 8.973h4m-4 3.64h2" />
    </>
  ),
  filter: (
    <>
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M6 8.746h12M6 15.317h12" />
      <circle cx="7.5" cy="8.746" r="1.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="15.254" r="1.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  info: (
    <>
      <circle cx="12.29" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path fill="currentColor" d="M12.924 15.106h.713c.113 0 .17.057.17.17v.554c0 .113-.057.17-.17.17h-2.693c-.113 0-.17-.057-.17-.17v-.554c0-.113.057-.17.17-.17h.713v-3.78h-.611c-.113 0-.17-.056-.17-.169v-.588c0-.114.057-.17.17-.17h1.709c.113 0 .17.056.17.17v4.537zm-1.369-5.714a.804.804 0 01-.215-.577c0-.234.072-.427.215-.577A.776.776 0 0112.143 8c.25 0 .445.08.589.238.15.15.226.343.226.577a.782.782 0 01-.226.577c-.151.15-.35.226-.6.226-.241 0-.434-.075-.577-.226z" />
    </>
  ),
  // The mobile menu uses the Slider strokes without knobs.
  menu: <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M6 7h12M6 12h12M6 17h12" />,
  people: (
    <>
      <circle cx="12" cy="7.858" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <rect width="10" height="4" x="7" y="13.926" stroke="currentColor" strokeWidth="1.5" rx="2" />
    </>
  ),
  search: (
    <>
      <path fill="currentColor" fillRule="evenodd" d="M5.71 11.025a5.25 5.25 0 1010.5 0 5.25 5.25 0 00-10.5 0zm5.25-7a7 7 0 100 14 7 7 0 000-14z" clipRule="evenodd" />
      <rect width="1.839" height="3.677" x="16.139" y="17.375" fill="currentColor" rx=".2" transform="rotate(-45 16.14 17.375)" />
    </>
  ),
  settings: (
    <>
      <g strokeWidth="1.5">
        <circle cx="12" cy="12" r="2" stroke="currentColor" />
        <path stroke="currentColor" d="M19.785 11.515a1 1 0 01-.014.963l-1.703 3-1.778 3.03a1 1 0 01-.863.494H8.484a1 1 0 01-.86-.49l-1.898-3.2-1.578-2.82a1 1 0 01.003-.982l1.832-3.23 1.642-2.79a1 1 0 01.862-.493h6.961a1 1 0 01.846.467l1.774 2.816 1.717 3.234z" />
      </g>
    </>
  ),
  spinner: <path fill="currentColor" d="M17.179 13.605a.431.431 0 00.279.514l.775.245a.393.393 0 00.499-.268 7.318 7.318 0 00-4.5-8.658.39.39 0 00-.507.255l-.245.775a.43.43 0 00.261.523 5.69 5.69 0 013.438 6.614z" />,
  success: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M9.215 12.052l1.822 1.805 3.748-3.714" />
    </>
  ),
  tasks: (
    <>
      <rect width="16" height="16" x="4" y="4" stroke="currentColor" strokeWidth="1.5" rx="2.075" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12.021 12l2.325 2.325" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.021 12V6.84" />
    </>
  ),
  upload: (
    <>
      <path fill="currentColor" d="M7.77 9.87l.724.2-.723-.2zm8.46 0l.723-.197-.724.198zm-7.198 4.27a.75.75 0 000-1.5v1.5zm5.982-1.5a.75.75 0 100 1.5v-1.5zm-9.363.063c0-1.085.88-1.964 1.964-1.964v-1.5a3.464 3.464 0 00-3.464 3.464h1.5zm1.964-1.964a.911.911 0 00.88-.67l-1.447-.396a.589.589 0 01.567-.434v1.5zm.88-.67A3.637 3.637 0 0112 7.398v-1.5a5.137 5.137 0 00-4.952 3.775l1.446.396zM12 7.398a3.636 3.636 0 013.506 2.671l1.447-.396A5.137 5.137 0 0012 5.898v1.5zm3.506 2.671c.11.402.475.67.879.67v-1.5c.259 0 .496.171.567.434l-1.446.396zm.879.67c1.085 0 1.964.879 1.964 1.964h1.5a3.464 3.464 0 00-3.464-3.464v1.5zM5.684 14.14h3.348v-1.5H5.684v1.5zm9.33 0h3.302v-1.5h-3.301v1.5zm3.335-1.438c0-.014.004-.034.013-.053a.083.083 0 01.018-.025c.001-.001-.004.003-.017.008a.146.146 0 01-.047.008v1.5c.692 0 1.533-.493 1.533-1.438h-1.5zm-14.198 0c0 .945.842 1.438 1.533 1.438v-1.5a.145.145 0 01-.047-.008c-.013-.005-.018-.009-.017-.008a.114.114 0 01.031.078h-1.5z" />
      <path fill="currentColor" d="M12.566 14.927a.566.566 0 11-1.132 0h1.132zm-1.132-4.53a.566.566 0 011.132 0h-1.132zm-.921 1.91a.566.566 0 11-.801-.8l.8.8zM12 10.02l-.4-.4a.566.566 0 01.8 0l-.4.4zm2.288 1.487a.566.566 0 11-.8.801l.8-.8zm-2.854 3.421v-4.53h1.132v4.53h-1.132zm-1.722-3.42l1.888-1.89.8.8-1.887 1.888-.801-.8zm2.688-1.89l1.888 1.887-.8.801L11.6 10.42l.8-.801z" />
    </>
  ),
  warning: (
    <>
      <path stroke="currentColor" strokeWidth="1.5" d="M11.134 6.844a1 1 0 011.732 0l5.954 10.312a1 1 0 01-.866 1.5H6.046a1 1 0 01-.866-1.5l5.954-10.312z" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12 10.284v3.206" />
      <circle cx="12" cy="15.605" r=".832" fill="currentColor" />
    </>
  ),
};

type IconName = keyof typeof glyphs;

const compactViewBoxes: Partial<Record<IconName, string>> = {
  arrow: "4 4 16 16",
  close: "5.5 5.5 13 13",
  download: "4 4 16 16",
  upload: "2 0.5 20 20",
};

export function Icon({ name, size = 18, className, slot }: {
  name: IconName;
  size?: number;
  className?: string;
  slot?: string;
}) {
  return (
    <svg className={cn("ui-icon", className)} data-icon={name} data-icon-library="potlab" data-slot={slot}
      style={{ width: size, height: size }} viewBox={compactViewBoxes[name] ?? "0 0 24 24"}
      fill="none" aria-hidden="true" focusable="false">
      {glyphs[name]}
    </svg>
  );
}
