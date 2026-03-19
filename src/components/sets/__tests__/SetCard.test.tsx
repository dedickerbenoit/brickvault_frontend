import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SetCard from "../SetCard";
import { renderWithProviders } from "@/test/helpers";
import type { UserSetData } from "@/services";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

function makeUserSet(overrides: Partial<UserSetData> = {}): UserSetData {
  return {
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
    notes: "Sealed in box",
    created_at: "2024-03-10T00:00:00Z",
    ...overrides,
  };
}

describe("SetCard", () => {
  const defaultProps = {
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onAddToCollection: vi.fn(),
  };

  it("renders set name and number", () => {
    renderWithProviders(
      <SetCard userSet={makeUserSet()} {...defaultProps} />,
    );

    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
    expect(screen.getByText("#75192-1")).toBeInTheDocument();
  });

  it("renders set image when img_url is present", () => {
    renderWithProviders(
      <SetCard userSet={makeUserSet()} {...defaultProps} />,
    );

    const img = screen.getByAltText("Millennium Falcon");
    expect(img).toHaveAttribute("src", "https://example.com/falcon.jpg");
  });

  it("renders condition badge with correct color class", () => {
    renderWithProviders(
      <SetCard userSet={makeUserSet({ condition: "new" })} {...defaultProps} />,
    );

    const badge = screen.getByText("sets.form.conditionNew");
    expect(badge.className).toContain("bg-green-50");
  });

  it("renders opened condition badge", () => {
    renderWithProviders(
      <SetCard
        userSet={makeUserSet({ condition: "opened" })}
        {...defaultProps}
      />,
    );

    const badge = screen.getByText("sets.form.conditionOpened");
    expect(badge.className).toContain("bg-yellow-50");
  });

  it("renders built condition badge", () => {
    renderWithProviders(
      <SetCard
        userSet={makeUserSet({ condition: "built" })}
        {...defaultProps}
      />,
    );

    const badge = screen.getByText("sets.form.conditionBuilt");
    expect(badge.className).toContain("bg-blue-50");
  });

  it("renders theme name", () => {
    renderWithProviders(
      <SetCard userSet={makeUserSet()} {...defaultProps} />,
    );

    expect(screen.getByText("Star Wars")).toBeInTheDocument();
  });

  it("renders purchase price", () => {
    renderWithProviders(
      <SetCard userSet={makeUserSet()} {...defaultProps} />,
    );

    expect(screen.getByText(/699\.99/)).toBeInTheDocument();
  });

  it("does not render price when null", () => {
    renderWithProviders(
      <SetCard
        userSet={makeUserSet({ purchase_price: null })}
        {...defaultProps}
      />,
    );

    expect(screen.queryByText(/€/)).not.toBeInTheDocument();
  });

  it("renders notes when present", () => {
    renderWithProviders(
      <SetCard userSet={makeUserSet()} {...defaultProps} />,
    );

    expect(screen.getByText("Sealed in box")).toBeInTheDocument();
  });

  it("renders empty notes area when notes are null (stable layout)", () => {
    const { container } = renderWithProviders(
      <SetCard userSet={makeUserSet({ notes: null })} {...defaultProps} />,
    );

    // The min-h-[2.5rem] zone should exist even without notes
    const notesZone = container.querySelector('[class*="min-h-"]');
    expect(notesZone).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    renderWithProviders(
      <SetCard
        userSet={makeUserSet()}
        onEdit={onEdit}
        onDelete={vi.fn()}
        onAddToCollection={vi.fn()}
      />,
    );

    await user.click(
      screen.getByTitle("sets.list.actions.edit"),
    );
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    renderWithProviders(
      <SetCard
        userSet={makeUserSet()}
        onEdit={vi.fn()}
        onDelete={onDelete}
        onAddToCollection={vi.fn()}
      />,
    );

    await user.click(
      screen.getByTitle("sets.list.actions.delete"),
    );
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it("calls onAddToCollection when folder button is clicked", async () => {
    const user = userEvent.setup();
    const onAddToCollection = vi.fn();

    renderWithProviders(
      <SetCard
        userSet={makeUserSet()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onAddToCollection={onAddToCollection}
      />,
    );

    await user.click(
      screen.getByTitle("sets.list.actions.addToCollection"),
    );
    expect(onAddToCollection).toHaveBeenCalledOnce();
  });

  it("does not render addToCollection button when callback is undefined", () => {
    renderWithProviders(
      <SetCard
        userSet={makeUserSet()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(
      screen.queryByTitle("sets.list.actions.addToCollection"),
    ).not.toBeInTheDocument();
  });

  it("has 3 action buttons when all callbacks provided", () => {
    renderWithProviders(
      <SetCard userSet={makeUserSet()} {...defaultProps} />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  it("renders fallback when img_url is null", () => {
    renderWithProviders(
      <SetCard
        userSet={makeUserSet({
          set: {
            id: 10,
            set_num: "75192-1",
            name: "Millennium Falcon",
            theme: { id: 1, name: "Star Wars" },
            year: 2017,
            num_parts: 7541,
            img_url: null,
          },
        })}
        {...defaultProps}
      />,
    );

    // No <img> tag should be rendered
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    // Fallback CubeIcon (SVG) should be rendered
    expect(document.querySelector("svg")).toBeInTheDocument();
  });
});
