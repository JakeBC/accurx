import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => ({ get: () => "" }),
}));
