import { render, screen, fireEvent } from "@testing-library/react";
import Cep from "../pages/Cep";

describe("Busca CEP BDD", () => {
  test("Deve exibir mensagem de erro para CEP inválido", () => {
    render(<Cep />);

    const input = screen.getByPlaceholderText("Digite o CEP (somente números)");
    fireEvent.change(input, { target: { value: "123" } });

    const button = screen.getByText("Buscar");
    fireEvent.click(button);

    expect(screen.getByText("Digite um CEP válido")).toBeInTheDocument();
  });
});
