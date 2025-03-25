import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchUsers } from "./users.api";
import { Users } from "@/types/user.types";
import { testUsersData } from "@/data/test-data";

interface UsersApiModule {
  usersApi: {
    get: ReturnType<typeof vi.fn>;
  };
  fetchUsers: typeof fetchUsers;
}

// Mock the users.api module
vi.mock("./users.api", async () => {
  const mockGet = vi.fn();
  return {
    usersApi: {
      get: mockGet,
    },
    fetchUsers: async () => {
      const response = await mockGet("/users");
      return response.data;
    },
  };
});

describe("Users API", () => {
  const mockUsers: Users = testUsersData;

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe("fetchUsers", () => {
    it("should successfully fetch users", async () => {
      // Mock the response
      const mockResponse = { data: mockUsers };
      const module = (await import("./users.api")) as UsersApiModule;
      module.usersApi.get.mockResolvedValueOnce(mockResponse);

      // Call the function
      const result = await fetchUsers();

      // Assertions
      expect(result).toEqual(mockUsers);
      expect(module.usersApi.get).toHaveBeenCalledWith("/users");
    });

    it("should handle errors when fetching users", async () => {
      // Mock the error
      const mockError = new Error("Network Error");
      const module = (await import("./users.api")) as UsersApiModule;
      module.usersApi.get.mockRejectedValueOnce(mockError);

      // Assert that the function throws the error
      await expect(fetchUsers()).rejects.toThrow("Network Error");
    });
  });
});
