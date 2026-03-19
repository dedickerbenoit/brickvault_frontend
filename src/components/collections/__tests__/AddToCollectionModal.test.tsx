import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddToCollectionModal from "../AddToCollectionModal";
import type { UserSetData } from "@/services";
import type { CollectionData } from "@/services/collectionService";

// ─── Mocks ───

const mockCollections: CollectionData[] = [
  {
    id: 1,
    name: "Star Wars",
    description: null,
    color: "blue",
    sets_count: 3,
    contains_user_set: true,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Technic",
    description: null,
    color: "red",
    sets_count: 1,
    contains_user_set: false,
    created_at: "2024-01-02T00:00:00Z",
  },
];

const mockAddMutate = vi.fn();
const mockRemoveMutate = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@/hooks", () => ({
  useCollections: vi.fn(() => ({
    data: mockCollections,
    isLoading: false,
  })),
  useAddSetToCollection: () => ({
    mutate: mockAddMutate,
  }),
  useRemoveSetFromCollection: () => ({
    mutate: mockRemoveMutate,
  }),
}));

vi.mock("@/constants", () => ({
  getColorClasses: () => ({
    bg: "bg-blue-50",
    text: "text-blue-700",
    ring: "ring-blue-200",
    dot: "bg-blue-500",
  }),
}));

const mockUserSet: UserSetData = {
  id: 42,
  set: {
    id: 10,
    set_num: "75192-1",
    name: "Millennium Falcon",
    theme: { id: 1, name: "Star Wars" },
    year: 2017,
    num_parts: 7541,
    img_url: null,
  },
  purchase_price: null,
  purchase_date: null,
  condition: "new",
  notes: null,
  created_at: "2024-01-01T00:00:00Z",
};

describe("AddToCollectionModal", () => {
  const defaultProps = {
    userSet: mockUserSet,
    onClose: vi.fn(),
    onCreateCollection: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    // Restore the default mock (tests that override it must not leak)
    const { useCollections } = await import("@/hooks");
    vi.mocked(useCollections).mockReturnValue({
      data: mockCollections,
      isLoading: false,
    } as ReturnType<typeof useCollections>);
  });

  it("renders the modal with title", () => {
    render(<AddToCollectionModal {...defaultProps} />);

    expect(
      screen.getByText("collections.addToCollection.title"),
    ).toBeInTheDocument();
  });

  it("renders the set name", () => {
    render(<AddToCollectionModal {...defaultProps} />);

    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
  });

  it("renders list of collections", () => {
    render(<AddToCollectionModal {...defaultProps} />);

    expect(screen.getByText("Star Wars")).toBeInTheDocument();
    expect(screen.getByText("Technic")).toBeInTheDocument();
  });

  it("shows 'added' indicator for collections containing the set", () => {
    render(<AddToCollectionModal {...defaultProps} />);

    expect(
      screen.getByText("collections.addToCollection.added"),
    ).toBeInTheDocument();
  });

  it("marks collection button as aria-pressed when set is in collection", () => {
    render(<AddToCollectionModal {...defaultProps} />);

    const buttons = screen.getAllByRole("button", { pressed: true });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("marks collection button as aria-pressed=false when set is not in collection", () => {
    render(<AddToCollectionModal {...defaultProps} />);

    const buttons = screen.getAllByRole("button", { pressed: false });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("calls removeMutation when clicking a collection that contains the set", async () => {
    const user = userEvent.setup();

    render(<AddToCollectionModal {...defaultProps} />);

    // Click "Star Wars" which contains the set (contains_user_set: true)
    const starWarsButton = screen.getByText("Star Wars").closest("button")!;
    await user.click(starWarsButton);

    expect(mockRemoveMutate).toHaveBeenCalledWith(
      { collectionId: 1, userSetId: 42 },
      expect.any(Object),
    );
  });

  it("calls addMutation when clicking a collection that does not contain the set", async () => {
    const user = userEvent.setup();

    render(<AddToCollectionModal {...defaultProps} />);

    // Click "Technic" which does not contain the set
    const technicButton = screen.getByText("Technic").closest("button")!;
    await user.click(technicButton);

    expect(mockAddMutate).toHaveBeenCalledWith(
      { collectionId: 2, userSetId: 42 },
      expect.any(Object),
    );
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <AddToCollectionModal {...defaultProps} onClose={onClose} />,
    );

    await user.click(screen.getByText("common.close"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders loading state", async () => {
    const { useCollections } = await import("@/hooks");
    vi.mocked(useCollections).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as ReturnType<typeof useCollections>);

    render(<AddToCollectionModal {...defaultProps} />);

    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
    // Loading spinner should be present
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders empty state when no collections exist", async () => {
    const { useCollections } = await import("@/hooks");
    vi.mocked(useCollections).mockReturnValue({
      data: [],
      isLoading: false,
    } as unknown as ReturnType<typeof useCollections>);

    render(<AddToCollectionModal {...defaultProps} />);

    expect(
      screen.getByText("collections.addToCollection.noCollections"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("collections.addToCollection.createFirst"),
    ).toBeInTheDocument();
  });

  it("calls onCreateCollection from empty state", async () => {
    const { useCollections } = await import("@/hooks");
    vi.mocked(useCollections).mockReturnValue({
      data: [],
      isLoading: false,
    } as unknown as ReturnType<typeof useCollections>);

    const user = userEvent.setup();
    const onClose = vi.fn();
    const onCreateCollection = vi.fn();

    render(
      <AddToCollectionModal
        {...defaultProps}
        onClose={onClose}
        onCreateCollection={onCreateCollection}
      />,
    );

    await user.click(
      screen.getByText("collections.addToCollection.createFirst"),
    );

    expect(onClose).toHaveBeenCalledOnce();
    expect(onCreateCollection).toHaveBeenCalledOnce();
  });

  it("renders sets count for each collection", () => {
    render(<AddToCollectionModal {...defaultProps} />);

    expect(screen.getByText(/3.*collections\.detail\.setsCount/)).toBeInTheDocument();
    expect(screen.getByText(/1.*collections\.detail\.setsCount/)).toBeInTheDocument();
  });

  it("disables button during mutation", async () => {
    const user = userEvent.setup();

    // Make addMutate never settle (simulates loading)
    mockAddMutate.mockImplementation(() => {});

    render(<AddToCollectionModal {...defaultProps} />);

    const technicButton = screen.getByText("Technic").closest("button")!;
    await user.click(technicButton);

    // Button should be disabled while mutating
    expect(technicButton).toBeDisabled();
  });
});
