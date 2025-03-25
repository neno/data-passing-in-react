import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Users } from "./users";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { testUsersData } from "@/data/test-data";
import { mapUserToUserRow } from "@/lib/utils";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
  queryClient.clear();
  vi.clearAllMocks();
});

const testUsers = testUsersData.map(mapUserToUserRow);

vi.mock("@/api/hooks", () => ({
  useUsersList: vi.fn(() => ({
    data: testUsers,
    isLoading: false,
    isError: false,
  })),
  useUserDetails: vi.fn((id: number) => ({
    data: testUsersData.find((user) => user.id === id),
    isLoading: false,
    isError: false,
  })),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Users", () => {
  it("should render the users table", () => {
    render(<Users />, { wrapper });
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("should render the users table with the correct data", () => {
    render(<Users />, { wrapper });
    expect(screen.getByRole("table")).toHaveTextContent("name");
    expect(screen.getByRole("table")).toHaveTextContent("email");
    expect(screen.getByRole("table")).toHaveTextContent("phone");
    expect(screen.getByRole("table")).toHaveTextContent("id");
  });

  it("should render the users table with the correct number of rows", () => {
    render(<Users />, { wrapper });
    expect(screen.getAllByRole("row")).toHaveLength(testUsers.length + 1);
  });
});
