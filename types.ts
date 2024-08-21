export type Patient = {
  firstName: string;
  lastName: string;
  vaccineDate: number;
  vaccineType: "Pfizer" | "AstraZeneca";
  nhsNumber: string;
  id: string;
};

export type PatientData = Patient[];

export type SearchParams = {
  search: string;
  order: "ascending" | "descending";
};
