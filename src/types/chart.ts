export default interface ChartDef {
  title: string;
  data: Array<[number, number | null] | [number, Array<number | null>]>;
}