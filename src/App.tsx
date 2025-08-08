import ChartContainer from "./components/ChartContainer";
import type { JSX } from "react";
import "./style.css";
export default function App(): JSX.Element {
  return (
    <div>
      <div>
        <h1 className="text-center my-11 font-black text-3xl">Charts</h1>
      </div>
      <ChartContainer />
    </div>
  );
}
