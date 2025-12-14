export interface SaveSeafarerRequest {
  entity: Partial<SeafarerEntity>;
  Qualifications: Qualification[];
  Certificates: Certificate[];
  Languages: Language[];
  References: Reference[];
  WorkExperiences: WorkExperience[];
}

export interface SeafarerEntity {
  PassPortIssueDate: string;
  IDExPiryDate: string;
  SeamanBookNO: string | null;
  Remarks: string | null;
  EmpId: number;
  VisaSponsorId: number;
  VisaIssueDate: string;
  VisaExpiryDate: string;
  NameOfSpouse: string | null;
  NoOfChildren: number;
  BodyWeight: number;
  Height: number;
  VisaUAEIdNO: string | null;
  NearestAirport: string;
  ResidenceNumber: string | null;
  SkypeID: string | null;
  PermanentAddressHomeCountry: string | null;
  ContactNumberHomeCountry: string | null;
  ContactNameAndNumberDuringEmergenciesUAE: string | null;
  ContactNameAndNumberDuringEmergenciesHome: string | null;
  SeamanIssueDate: string | null;
  SeamanExpiryDate: string | null;
  CicpaNO: string | null;
  CicpaIssueDate: string | null;
  CicpaExpiryDate: string | null;
  Declaration: string | null;

  SignedOffFromAShipDueToMedicalReason: boolean | null;
  SignedOffFromAShipDueToMedicalReasonComment: string | null;

  UndergoneAnyMdicalOperation: boolean | null;
  UndergoneAnyMdicalOperationComment: string | null;

  DoctorConsultation: boolean | null;
  DoctorConsultationComment: string | null;

  HealthOrDisabilityProblem: boolean | null;
  HealthOrDisabilityProblemComment: string | null;

  InquiryOrInvolvedMaritimeAccident: boolean | null;
  InquiryOrInvolvedMaritimeAccidentComment: string | null;

  LicenseSuspendedOrRevoked: boolean | null;
  LicenseSuspendedOrRevokedComment: string | null;
}


export interface Qualification {
  DegreeOrCourse: string;
  CourseIssueDate: string;
  ExpiryDate: string;
  MajorOrSubject: string;
  University: string;
  Country: string;
  Type: number;
}

export interface Certificate {
  Capacity: string;
  Regulation: string;
  IssueDate: string;
  ExpiryDate: string;
  IssuingAuthority: string;
  Limitations: string;
  Country: string;
  Type: number;
}

export interface Language {
  Capacity: string;
  Regulation: string;
  IssueDate: string;
  ExpiryDate: string;
  IssuingAuthority: string;
  Limitations: string;
  Country: string;
}

export interface Reference {
  PersonName: string;
  CompanyName: string;
  Country: string;
  Fax: string;
  EmailId: string;
}

export interface WorkExperience {
  VesselName: string;
  VesselType: string;
  Rank: string;
  From: string;
  To: string;
  GRT: string;
  BHP: string;
  CompanyName: string;
}
