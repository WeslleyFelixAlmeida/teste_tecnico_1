jest.mock("../utils/apiURL", () => ({
  API_URL: "http://localhost:3000",
}));

import { renderHook, waitFor } from "@testing-library/react";
import useSales from "./useSales";

describe("useSales", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("retorna dados quando a API responde com sucesso", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          invoice: "123",
          transaction: {
            sale: { product: 1, company: 1, value: 10 },
            refund: { product: 1, company: 1, value: 10 },
          },
        },
      ],
    });

    const { result } = renderHook(() => useSales());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.sales).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it("retorna erro quando a API falha", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useSales());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("Erro ao buscar vendas");
  });
});
