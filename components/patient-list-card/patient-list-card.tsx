import { Patient } from "@/types";
import styles from "./patient-list-card.module.scss";

interface Props {
  patient: Patient;
}

const PatientListCard: React.FC<Props> = ({ patient }) => {
  const { firstName, lastName, nhsNumber, vaccineType } = patient;
  const fullName = `${firstName} ${lastName}`;

  return (
    <ul className={styles.list} aria-label={fullName}>
      <li className={styles.listItem}>{fullName}</li>
      <li className={styles.listItem}>{nhsNumber}</li>
      <li className={styles.listItem}>
        <b>{vaccineType}</b>
      </li>
    </ul>
  );
};

export default PatientListCard;
