import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../Modal";

describe("Modal", () => {
  it("renders children", () => {
    render(
      <Modal onClose={vi.fn()}>
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("has role=dialog and aria-modal", () => {
    render(
      <Modal onClose={vi.fn()}>
        <p>Content</p>
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("passes aria-labelledby to the dialog", () => {
    render(
      <Modal onClose={vi.fn()} ariaLabelledBy="title-id">
        <p>Content</p>
      </Modal>,
    );

    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-labelledby",
      "title-id",
    );
  });

  it("calls onClose when clicking the overlay", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );

    await user.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not call onClose when clicking inside the modal", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal onClose={onClose}>
        <button>Inside</button>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Inside" }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when pressing Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("locks body scroll on mount and restores on unmount", () => {
    const { unmount } = render(
      <Modal onClose={vi.fn()}>
        <p>Content</p>
      </Modal>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("");
  });

  it("applies size classes via data-testid", () => {
    const { rerender } = render(
      <Modal onClose={vi.fn()} size="sm">
        <p>Content</p>
      </Modal>,
    );

    const panel = screen.getByTestId("modal-panel");
    expect(panel.className).toContain("max-w-sm");

    rerender(
      <Modal onClose={vi.fn()} size="md">
        <p>Content</p>
      </Modal>,
    );

    const panelMd = screen.getByTestId("modal-panel");
    expect(panelMd.className).toContain("max-w-lg");
  });

  it("focuses the modal panel on mount", () => {
    render(
      <Modal onClose={vi.fn()}>
        <p>Content</p>
      </Modal>,
    );

    expect(screen.getByTestId("modal-panel")).toHaveFocus();
  });

  it("renders via portal into document.body", () => {
    const { container } = render(
      <div id="app-root">
        <Modal onClose={vi.fn()}>
          <p>Portal content</p>
        </Modal>
      </div>,
    );

    // Modal should NOT be inside the container div
    expect(container.querySelector('[role="dialog"]')).toBeNull();
    // But should be in document.body
    expect(document.body.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  it("traps focus within the modal", async () => {
    const user = userEvent.setup();

    render(
      <Modal onClose={vi.fn()}>
        <button>First</button>
        <button>Last</button>
      </Modal>,
    );

    const first = screen.getByText("First");
    const last = screen.getByText("Last");

    first.focus();
    expect(first).toHaveFocus();

    // Tab from last should cycle to first
    last.focus();
    await user.tab();
    expect(first).toHaveFocus();
  });
});
