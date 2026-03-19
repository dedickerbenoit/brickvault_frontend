import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CollectionCard from "../CollectionCard";
import { renderWithProviders } from "@/test/helpers";
import type { CollectionData } from "@/services/collectionService";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

function makeCollection(
  overrides: Partial<CollectionData> = {},
): CollectionData {
  return {
    id: 1,
    name: "Star Wars Fleet",
    description: "All my Star Wars ships",
    color: "blue",
    sets_count: 5,
    preview_sets: [
      {
        id: 10,
        set_num: "75192-1",
        name: "Millennium Falcon",
        img_url: "https://example.com/falcon.jpg",
      },
      {
        id: 11,
        set_num: "75252-1",
        name: "Imperial Star Destroyer",
        img_url: "https://example.com/isd.jpg",
      },
      {
        id: 12,
        set_num: "75060-1",
        name: "Slave I",
        img_url: "https://example.com/slave1.jpg",
      },
    ],
    created_at: "2024-03-10T00:00:00Z",
    ...overrides,
  };
}

describe("CollectionCard", () => {
  const defaultProps = {
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  it("renders collection name", () => {
    renderWithProviders(
      <CollectionCard collection={makeCollection()} {...defaultProps} />,
    );

    expect(screen.getByText("Star Wars Fleet")).toBeInTheDocument();
  });

  it("renders description when present", () => {
    renderWithProviders(
      <CollectionCard collection={makeCollection()} {...defaultProps} />,
    );

    expect(screen.getByText("All my Star Wars ships")).toBeInTheDocument();
  });

  it("renders sets count badge", () => {
    renderWithProviders(
      <CollectionCard collection={makeCollection()} {...defaultProps} />,
    );

    expect(
      screen.getByText(/5.*collections\.detail\.setsCount/),
    ).toBeInTheDocument();
  });

  // ─── Preview Stack ───

  it("renders preview images when preview_sets has items", () => {
    renderWithProviders(
      <CollectionCard collection={makeCollection()} {...defaultProps} />,
    );

    expect(screen.getByAltText("Millennium Falcon")).toBeInTheDocument();
    expect(screen.getByAltText("Imperial Star Destroyer")).toBeInTheDocument();
    expect(screen.getByAltText("Slave I")).toBeInTheDocument();
  });

  it("renders max 3 preview images", () => {
    const collection = makeCollection({
      preview_sets: [
        { id: 1, set_num: "1", name: "Set 1", img_url: "https://example.com/1.jpg" },
        { id: 2, set_num: "2", name: "Set 2", img_url: "https://example.com/2.jpg" },
        { id: 3, set_num: "3", name: "Set 3", img_url: "https://example.com/3.jpg" },
        { id: 4, set_num: "4", name: "Set 4", img_url: "https://example.com/4.jpg" },
      ],
    });

    renderWithProviders(
      <CollectionCard collection={collection} {...defaultProps} />,
    );

    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  it("renders fallback icon when preview set has no image", () => {
    const collection = makeCollection({
      preview_sets: [
        { id: 10, set_num: "1", name: "No Image Set", img_url: null },
      ],
    });

    renderWithProviders(
      <CollectionCard collection={collection} {...defaultProps} />,
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    // CubeIcon is rendered as fallback (SVG)
    const fallback = document.querySelector("svg");
    expect(fallback).toBeInTheDocument();
  });

  it("renders empty state when preview_sets is empty", () => {
    const collection = makeCollection({
      preview_sets: [],
      sets_count: 0,
    });

    renderWithProviders(
      <CollectionCard collection={collection} {...defaultProps} />,
    );

    expect(
      screen.getByText("collections.detail.empty.title"),
    ).toBeInTheDocument();
  });

  it("does not render preview zone when preview_sets is undefined", () => {
    const collection = makeCollection({ preview_sets: undefined });

    const { container } = renderWithProviders(
      <CollectionCard collection={collection} {...defaultProps} />,
    );

    // No h-24 preview zone
    expect(container.querySelector('[class*="h-24"]')).not.toBeInTheDocument();
  });

  it("renders with 1 preview set", () => {
    const collection = makeCollection({
      preview_sets: [
        { id: 10, set_num: "1", name: "Single Set", img_url: "https://example.com/1.jpg" },
      ],
    });

    renderWithProviders(
      <CollectionCard collection={collection} {...defaultProps} />,
    );

    expect(screen.getByAltText("Single Set")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });

  it("renders with 2 preview sets", () => {
    const collection = makeCollection({
      preview_sets: [
        { id: 10, set_num: "1", name: "Set A", img_url: "https://example.com/a.jpg" },
        { id: 11, set_num: "2", name: "Set B", img_url: "https://example.com/b.jpg" },
      ],
    });

    renderWithProviders(
      <CollectionCard collection={collection} {...defaultProps} />,
    );

    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  // ─── Actions ───

  it("calls onEdit when edit button is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    renderWithProviders(
      <CollectionCard
        collection={makeCollection()}
        onEdit={onEdit}
        onDelete={vi.fn()}
      />,
    );

    await user.click(screen.getByTitle("collections.edit"));
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    renderWithProviders(
      <CollectionCard
        collection={makeCollection()}
        onEdit={vi.fn()}
        onDelete={onDelete}
      />,
    );

    await user.click(screen.getByTitle("collections.delete"));
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it("does not navigate when edit/delete buttons are clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    renderWithProviders(
      <CollectionCard
        collection={makeCollection()}
        onEdit={onEdit}
        onDelete={vi.fn()}
      />,
    );

    // Edit button has preventDefault + stopPropagation — Link should not navigate
    await user.click(screen.getByTitle("collections.edit"));
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it("renders as a link for keyboard accessibility", () => {
    renderWithProviders(
      <CollectionCard collection={makeCollection()} {...defaultProps} />,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/collections/1");
  });
});
