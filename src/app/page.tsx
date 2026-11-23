import Workspace from "./workspace";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/loading-screen";

export const instant = false;

export default function Home() {
  return <Suspense fallback={<LoadingScreen />}><Workspace /></Suspense>;
}
