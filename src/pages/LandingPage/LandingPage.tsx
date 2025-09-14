import { lazy, Suspense } from "react";

const HeroSection = lazy(() =>
  import("./components/HeroSection").then((m) => ({ default: m.HeroSection }))
);
const KeyFeatures = lazy(() =>
  import("./components/KeyFeatures").then((m) => ({ default: m.KeyFeatures }))
);
const HowItWorks = lazy(() =>
  import("./components/HowItWorks").then((m) => ({ default: m.HowItWorks }))
);
const Preview = lazy(() =>
  import("./components/Preview").then((m) => ({ default: m.Preview }))
);
const CallToAction = lazy(() =>
  import("./components/CallToAction").then((m) => ({
    default: m.CallToAction,
  }))
);

export const LandingPage = () => {
  return (
    <Suspense>
      <div>
        <HeroSection />
        <KeyFeatures />
        <HowItWorks />
        <Preview />
        <CallToAction />
      </div>
    </Suspense>
  );
};
