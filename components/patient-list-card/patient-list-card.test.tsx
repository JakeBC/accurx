import { render, screen, within } from "@testing-library/react";
import PatientListCard from "./patient-list-card";
import { Patient } from "@/types";

const patient: Patient = {
  firstName: "Homer",
  lastName: "Simpson",
  vaccineDate: 1637876701,
  vaccineType: "AstraZeneca",
  nhsNumber: "4798775436",
  id: "7",
};

describe("PatientListCard", () => {
  test("displays a patient's full name", () => {
    render(<PatientListCard patient={patient} />);
    const patientItem = screen.getByRole("list", { name: "Homer Simpson" });
    expect(within(patientItem).getByText("Homer Simpson"));
    expect(within(patientItem).getByText("4798775436"));
    expect(within(patientItem).getByText("AstraZeneca"));
  });
});
