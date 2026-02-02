import { render, screen } from "@testing-library/react";
import ListHeader from "./ListHeader";

describe("ListHeader", () => {
  it("renderiza os títulos da lista", () => {
    render(
      <ul>
        <ListHeader />
      </ul>
    );

    expect(screen.getByText("Movimento")).toBeInTheDocument();
    expect(screen.getByText("Código produto")).toBeInTheDocument();
    expect(screen.getByText("Código loja")).toBeInTheDocument();
    expect(screen.getByText("Valor")).toBeInTheDocument();
    expect(screen.getByText("NF número")).toBeInTheDocument();
  });
});
