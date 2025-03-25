import { testUsersData } from "@/data/test-data";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, act } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { UserDetails } from "./user-details";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
  queryClient.clear();
  vi.clearAllMocks();
});

vi.mock("@/api/hooks", () => ({
  useUserDetails: vi.fn((id: number) => ({
    data: testUsersData.find((user) => user.id === id),
  })),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("UserDetails", () => {
  it("should render the dialog trigger button", () => {
    render(<UserDetails id={1} />, { wrapper });

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    expect(screen.getByRole("button")).toHaveAttribute(
      "title",
      "Zeilendetails anzeigen"
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("should open the dialog when button is clicked", async () => {
    render(<UserDetails id={1} />, { wrapper });
    const button = screen.getByRole("button");

    // Wrap the click in act()
    await act(async () => {
      button.click();
    });

    // Wait for the dialog to appear
    const dialog = await screen.findByRole("dialog");

    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(`User Details 1`)).toBeInTheDocument();

    // Use a more flexible text matching approach for the JSON content
    const preElement = screen.getByRole("dialog").querySelector("pre");
    expect(preElement).toBeInTheDocument();
    expect(preElement?.textContent?.trim()).toContain(testUsersData[0].name);
    expect(preElement?.textContent?.trim()).toContain(testUsersData[0].email);
  });
});
