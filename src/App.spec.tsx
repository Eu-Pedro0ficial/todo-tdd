import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Testing main page features", ()=>{

  it("There must be a title on the page", async()=>{
    render(<App/>);

    const title = await screen.findByRole("heading", {
      name: "Todo-List"
    })

    expect(title).toBeInTheDocument();
  });

  it("There must be an input", async()=>{
    render(<App/>);

    const input = await screen.findByPlaceholderText("Type your message");

    expect(input).toBeInTheDocument();
  });

  it("There must be a button", async()=>{
    render(<App/>);

    const button = await screen.findByRole("button");
    
    expect(button.textContent).toBe("Send")
  });
  
  it("There must be validation if the input is sent empty", async()=>{
    render(<App/>);
    
    const button = await screen.findByRole("button");

    fireEvent.click(button);

    expect(screen.queryByText("The input must not be sent empty")).toBeInTheDocument();
  });

  it("You must add a task to the list if the input is filled in", async()=>{
    render(<App/>);

    const input = await screen.findByPlaceholderText("Type your message");

    fireEvent.change(input, {
      target: {
        value: "Tarefa 1"
      }
    });

    const button = await screen.findByRole("button");

    fireEvent.click(button);

    const list = await screen.findByTestId("list");

    expect(list.children.length).toBe(1);
  });

  it("There must be task functionality buttons in the task", async()=>{
    render(<App/>);

    const input = await screen.findByPlaceholderText("Type your message");

    fireEvent.change(input, {
      target: {
        value: "Task 1"
      }
    });

    const button = await screen.findByRole("button");

    fireEvent.click(button);

    const checkBox = await screen.findByRole("checkbox");

    expect(screen.queryByText("Delete")).toBeInTheDocument();
    expect(screen.queryByText("Update")).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();

  });

  it("You must delete it by clicking the 'delete' button", async() =>{
    render(<App/>);

    const input = await screen.findByPlaceholderText("Type your message");

    fireEvent.change(input, {
      target: {
        value: "Task 1"
      }
    });

    const button = await screen.findByRole("button");

    fireEvent.click(button);

    const deleteButton = await screen.findByText("Delete");

    fireEvent.click(deleteButton);

    const list = await screen.findByTestId("list");

    expect(list.children.length).toBe(0);
  });
  
  it("When you click on the update button, an input should appear to update the task", async()=>{
    render(<App/>);

    const input = await screen.findByPlaceholderText("Type your message");

    fireEvent.change(input, {
      target: {
        value: "Task 1"
      }
    });

    const button = await screen.findByRole("button");

    fireEvent.click(button);

    const UpdateButton = await screen.findByText("Update");

    fireEvent.click(UpdateButton);

    expect(screen.queryByPlaceholderText("Type your new task")).toBeInTheDocument();
    expect(screen.queryByText("Update Task")).toBeInTheDocument();
  });

  it("Update input cannot be sent empty", async()=>{
    render(<App/>);

    const input = await screen.findByPlaceholderText("Type your message");

    fireEvent.change(input, {
      target: {
        value: "Task 1"
      }
    });

    const button = await screen.findByRole("button");

    fireEvent.click(button);

    const UpdateButton = await screen.findByText("Update");

    fireEvent.click(UpdateButton);

    const UpdateTaskButton = await screen.findByText("Update Task");

    const updateInput = await screen.findByPlaceholderText("Type your new task");

    fireEvent.change(updateInput, {
      target: {
        value: ""
      }
    });

    fireEvent.click(UpdateTaskButton);

    expect(screen.queryByText("This field is not send empty")).toBeInTheDocument();
  });

  it("Deve atualizar o input ao preencher o campo de atualização com a nova mensagem", async()=>{
    render(<App/>);

    const input = await screen.findByPlaceholderText("Type your message");

    fireEvent.change(input, {
      target: {
        value: "Task 1"
      }
    });

    const button = await screen.findByRole("button");

    fireEvent.click(button);

    const UpdateButton = await screen.findByText("Update");

    fireEvent.click(UpdateButton);

    const UpdateTaskButton = await screen.findByText("Update Task");

    const updateInput = await screen.findByPlaceholderText("Type your new task");

    fireEvent.change(updateInput, {
      target: {
        value: "New Task"
      }
    });

    fireEvent.click(UpdateTaskButton);

    expect(screen.queryByText("New Task")).toBeInTheDocument();
  })


})
