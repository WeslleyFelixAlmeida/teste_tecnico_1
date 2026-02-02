import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renderiza o texto do footer", () => {
    render(<Footer />);
    expect(screen.getByText("©Teste")).toBeInTheDocument();
  });
});
