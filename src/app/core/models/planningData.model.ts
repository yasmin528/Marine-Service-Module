import { VesselPlanning } from "./vesselPlanning.model";

export interface PlanningData {
  [vesselName: string]: VesselPlanning;
}
