import { render, screen } from "@testing-library/react";
import ListItem from "./ListItem";

describe("ListItem", () => {
  it("renderiza dados de compra e estorno", () => {
    render(
      <ul>
        <ListItem
          invoice="123"
          saleData={{ product: 10, company: 1, value: 50 }}
          refundData={{ product: 10, company: 1, value: 50 }}
        />
      </ul>
    );

    expect(screen.getByText("Compra")).toBeInTheDocument();
    expect(screen.getByText("Estorno")).toBeInTheDocument();

    expect(screen.getAllByText("10")).toHaveLength(2);
    expect(screen.getAllByText("1")).toHaveLength(2);
    expect(screen.getAllByText("50")).toHaveLength(2);
    expect(screen.getAllByText("123")).toHaveLength(2);
  });
});
