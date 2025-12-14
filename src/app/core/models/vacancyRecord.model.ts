
import { VacancyApplicant } from "./vacancyApplicant.model";

export interface VacancyRecord {
  id: number;
  title: string;
  vessel: string;
  postedDate: string;
  status: string;
  applicantsCount: number;
  showApplicants: boolean;
  applicantsList: VacancyApplicant[];
}
