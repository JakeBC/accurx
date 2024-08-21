import { Metadata } from "next";
import Heading from "@/components/heading/heading";
import Controls from "@/components/controls/controls";
import PatientListCard from "@/components/patient-list-card/patient-list-card";
import { Patient, PatientData, SearchParams } from "@/types";
import { redirect } from "next/navigation";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "accuBook Dashboard",
  description: "Browse patient Covid-19 vaccination status",
};

const PATIENTS_API = "https://61ba219448df2f0017e5a929.mockapi.io/api/patients";

const sortPatientData = (
  patientData: PatientData,
  order: "ascending" | "descending"
): PatientData => {
  const compare = (a: Patient, b: Patient) => {
    const lastNameA = a.lastName.toLocaleLowerCase();
    const lastNameB = b.lastName.toLocaleLowerCase();
    if (order === "ascending") {
      if (lastNameA < lastNameB) return -1;
      if (lastNameA > lastNameB) return 1;
      return 0;
    } else {
      if (lastNameA < lastNameB) return 1;
      if (lastNameA > lastNameB) return -1;
      return 0;
    }
  };
  return patientData.sort(compare);
};

const getPatientData = async (
  searchParams: SearchParams
): Promise<PatientData> => {
  const { search, order } = searchParams;

  try {
    const url = new URL(PATIENTS_API);
    if (search) {
      url.searchParams.append("search", search);
    }

    const response = await fetch(url);

    if (response.status === 404) {
      return [];
    }

    const data: PatientData = await response.json();
    return order ? sortPatientData(data, order) : data;
  } catch (error: any) {
    // probably need to route elsewhere to ensure we don't end up in a loop
    console.error(error);
    return redirect("/");
  }
};

interface Props {
  searchParams: SearchParams;
}

const Home: React.FC<Props> = async ({ searchParams }) => {
  const data = await getPatientData(searchParams);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.stickyHeader}>
          <Heading text="accuBook Dashboard" />
          <Controls />
        </div>
        {data.length ? (
          <ul className={styles.patients}>
            {data.map((patient) => (
              <li key={patient.id}>
                <PatientListCard patient={patient} />
              </li>
            ))}
          </ul>
        ) : (
          <p>no results found</p>
        )}
      </div>
    </main>
  );
};

export default Home;
