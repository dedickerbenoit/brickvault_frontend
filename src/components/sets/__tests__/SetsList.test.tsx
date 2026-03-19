import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SetsList from "../SetsList";
import { renderWithProviders } from "@/test/helpers";
import type { UserSetData, UserSetListResponse } from "@/services";

// ─── Mocks ───

const mockSets: UserSetData[] = [
  {
    id: 1,
    set: {
      id: 10,
      set_num: "75192-1",
      name: "Millennium Falcon",
      theme: { id: 1, name: "Star Wars" },
      year: 2017,
      num_parts: 7541,
      img_url: "https://example.com/falcon.jpg",
    },
    purchase_price: 699.99,
    purchase_date: "2024-03-10",
    condition: "new",
    notes: null,
    created_at: "2024-03-10T00:00:00Z",
  },
  {
    id: 2,
    set: {
      id: 11,
      set_num: "42100-1",
      name: "Liebherr R 9800",
      theme: { id: 2, name: "Technic" },
      year: 2019,
      num_parts: 4108,
      img_url: "https://example.com/liebherr.jpg",
    },
    purchase_price: 449.99,
    purchase_date: "2024-01-15",
    condition: "built",
    notes: "Display piece",
    created_at: "2024-01-15T00:00:00Z",
  },
];

const mockResponse: UserSetListResponse = {
  data: mockSets,
  meta: { total: 2, per_page: 15, current_page: 1, last_page: 1 },
};

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      if (params) return `${key} ${JSON.stringify(params)}`;
      return key;
    },
  }),
}));

vi.mock("@/hooks", () => ({
  useUserSets: vi.fn(() => ({
    data: mockResponse,
    isLoading: false,
    error: null,
  })),
  useDeleteUserSet: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

vi.mock("@/constants", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/constants")>();
  return {
    ...actual,
    ROUTES: {
      ...actual.ROUTES,
      COLLECTIONS: "/collections",
    },
  };
});

vi.mock("@/components/collections", () => ({
  AddToCollectionModal: () => <div data-testid="add-to-collection-modal" />,
}));

vi.mock("../SetForm", () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div role="dialog" data-testid="set-form-modal">
      <button onClick={onClose}>close</button>
    </div>
  ),
}));

describe("SetsList", () => {
  beforeEach(async () => {
    localStorage.clear();
    // Restore default mock between tests
    const { useUserSets } = await import("@/hooks");
    vi.mocked(useUserSets).mockReturnValue({
      data: mockResponse,
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useUserSets>);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders sets in table view by default", () => {
    renderWithProviders(<SetsList />);

    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
    expect(screen.getByText("Liebherr R 9800")).toBeInTheDocument();
    // Table view has a <table> element
    expect(document.querySelector("table")).toBeInTheDocument();
  });

  it("renders view toggle buttons", () => {
    renderWithProviders(<SetsList />);

    expect(screen.getByTitle("sets.viewTable")).toBeInTheDocument();
    expect(screen.getByTitle("sets.viewCards")).toBeInTheDocument();
  });

  it("switches to cards view when cards button is clicked", async () => {
    const user = userEvent.setup();

    renderWithProviders(<SetsList />);

    await user.click(screen.getByTitle("sets.viewCards"));

    // Card view uses a grid, no <table>
    expect(document.querySelector("table")).not.toBeInTheDocument();
    // Still shows the sets
    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
  });

  it("switches back to table view", async () => {
    const user = userEvent.setup();

    renderWithProviders(<SetsList />);

    await user.click(screen.getByTitle("sets.viewCards"));
    expect(document.querySelector("table")).not.toBeInTheDocument();

    await user.click(screen.getByTitle("sets.viewTable"));
    expect(document.querySelector("table")).toBeInTheDocument();
  });

  it("persists view mode in localStorage", async () => {
    const user = userEvent.setup();

    renderWithProviders(<SetsList />);

    await user.click(screen.getByTitle("sets.viewCards"));

    expect(localStorage.getItem("sets_view_mode")).toBe("cards");
  });

  it("restores view mode from localStorage", () => {
    localStorage.setItem("sets_view_mode", "cards");

    renderWithProviders(<SetsList />);

    // Should be in cards mode — no table
    expect(document.querySelector("table")).not.toBeInTheDocument();
  });

  it("defaults to table when localStorage is empty", () => {
    renderWithProviders(<SetsList />);

    expect(document.querySelector("table")).toBeInTheDocument();
  });

  it("defaults to table when localStorage has invalid value", () => {
    localStorage.setItem("sets_view_mode", "invalid");

    renderWithProviders(<SetsList />);

    expect(document.querySelector("table")).toBeInTheDocument();
  });

  it("renders add set button", () => {
    renderWithProviders(<SetsList />);

    expect(screen.getByText("sets.add.button")).toBeInTheDocument();
  });

  it("renders loading state", async () => {
    const { useUserSets } = await import("@/hooks");
    vi.mocked(useUserSets).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as ReturnType<typeof useUserSets>);

    renderWithProviders(<SetsList />);

    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    const { useUserSets } = await import("@/hooks");
    vi.mocked(useUserSets).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Network error"),
    } as ReturnType<typeof useUserSets>);

    renderWithProviders(<SetsList />);

    expect(screen.getByText("sets.errors.loadingFailed")).toBeInTheDocument();
  });

  it("renders empty state when no sets exist", async () => {
    const { useUserSets } = await import("@/hooks");
    vi.mocked(useUserSets).mockReturnValue({
      data: { data: [], meta: { total: 0, per_page: 15, current_page: 1, last_page: 1 } },
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useUserSets>);

    renderWithProviders(<SetsList />);

    expect(screen.getByText("sets.empty.title")).toBeInTheDocument();
    expect(screen.getByText("sets.empty.cta")).toBeInTheDocument();
  });

  it("opens add form when clicking add set button", async () => {
    const user = userEvent.setup();

    renderWithProviders(<SetsList />);

    await user.click(screen.getByText("sets.add.button"));

    // SetForm modal should appear (it renders a Modal with a form)
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders pagination buttons when multiple pages", async () => {
    const { useUserSets } = await import("@/hooks");
    vi.mocked(useUserSets).mockReturnValue({
      data: {
        data: mockSets,
        meta: { total: 30, per_page: 15, current_page: 1, last_page: 2 },
      },
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useUserSets>);

    renderWithProviders(<SetsList />);

    expect(screen.getByText("sets.list.pagination.prev")).toBeInTheDocument();
    expect(screen.getByText("sets.list.pagination.next")).toBeInTheDocument();
  });

  it("does not render pagination when single page", () => {
    renderWithProviders(<SetsList />);

    expect(screen.queryByText("sets.list.pagination.prev")).not.toBeInTheDocument();
  });
});
