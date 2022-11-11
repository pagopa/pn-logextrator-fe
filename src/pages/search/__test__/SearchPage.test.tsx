/**
 * @jest-environment jsdom
 */
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen } from "@testing-library/react";
import "regenerator-runtime/runtime";
import SearchPage from "../SearchPage";
import { reducer } from "../../../mocks/mockReducer";

jest.mock("../../../components/forms/search/SearchForm", () => () => (
  <div data-testid="searchForm">Search Form</div>
));

describe("SearchPage", () => {
  afterEach(cleanup);

  beforeEach(() => {
    reducer(<SearchPage />);
  });

  it("renders search form component", () => {
    expect(screen.getByTestId("searchForm")).toBeInTheDocument();
  });

  it("renders header and footer", () => {
    expect(screen.getAllByRole("banner").length).toEqual(2);
  });

  it("renders form", () => {
    expect(screen.getByTestId("searchForm")).toBeInTheDocument();
  });
});
