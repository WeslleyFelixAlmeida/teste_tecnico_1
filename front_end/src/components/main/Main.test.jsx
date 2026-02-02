jest.mock("../../utils/apiURL", () => ({
  API_URL: "http://localhost:3000",
}));

import { render, screen } from "@testing-library/react";
import Main from "./Main";
import useSales from "../../hooks/useSales";

jest.mock("../../hooks/useSales");

describe("Main", () => {
  it("mostra loading", () => {
    useSales.mockReturnValue({
      sales: [],
      isLoading: true,
      error: null,
    });

    render(<Main />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("mostra mensagem quando não há dados", () => {
    useSales.mockReturnValue({
      sales: [],
      isLoading: false,
      error: null,
    });

    render(<Main />);
    expect(
      screen.getByText("Não foram encontrados dados de estorno."),
    ).toBeInTheDocument();
  });

  it("mostra erro quando existir", () => {
    useSales.mockReturnValue({
      sales: [],
      isLoading: false,
      error: "Erro ao buscar vendas",
    });

    render(<Main />);
    expect(screen.getByText(/Erro:/)).toBeInTheDocument();
  });

  it("renderiza lista quando há dados", () => {
    useSales.mockReturnValue({
      isLoading: false,
      error: null,
      sales: [
        {
          invoice: "123",
          transaction: {
            sale: { product: 1, company: 1, value: 10 },
            refund: { product: 1, company: 1, value: 10 },
          },
        },
      ],
    });

    render(<Main />);
    expect(screen.getByText("Compra")).toBeInTheDocument();
    expect(screen.getByText("Estorno")).toBeInTheDocument();
  });
});
