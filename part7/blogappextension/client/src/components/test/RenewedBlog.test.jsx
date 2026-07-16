import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Blog from "../Blog";
import Detail from "../Detail";
import { vi } from "vitest";

test("Blog information is present but no operations for anonymous users", () => {
  const blog = {
    id: "12asd22",
    title: "Component testing is done with react-testing-library",
    author: "True",
    url: "https://your.mom",
    likes: 25,
    user: {
      username: "root",
    },
  };

  const blogs = [blog];

  const dummyFunctions = {
    updateBlog: vi.fn(),
    removeBlog: vi.fn(),
    setBlogs: vi.fn(),
    setUser: vi.fn(),
    setErrorMessage: vi.fn(),
    setSuccessMessage: vi.fn(),
  };

  const testingRender = (user) => {
    render(
      <MemoryRouter initialEntries={["/blogs/12asd22"]}>
        <Routes>
          <Route
            path="/blogs/:id"
            element={<Detail blogs={blogs} user={user} {...dummyFunctions} />}
          />
        </Routes>
      </MemoryRouter>,
    );
  };

  testingRender(null);

  expect(
    screen.getByText("Component testing is done with react-testing-library"),
  ).toBeInTheDocument();
  expect(screen.getByText("by True")).toBeInTheDocument();
  expect(
    screen.getByText((content) => content.includes("25")),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /Like/i }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /Remove blog/i }),
  ).not.toBeInTheDocument();

  expect(screen.getByText(/Login to interact/i)).toBeInTheDocument();
});

test(`Users who aren't the blog creator are shown only the like button`, () => {
  const blog = {
    id: "12asd22",
    title: "Component testing is done with react-testing-library",
    author: "True",
    url: "https://your.mom",
    likes: 25,
    user: {
      username: "daddy",
    },
  };

  const blogs = [blog];

  const user1 = {
    username: "root",
    name: "root",
    password: "root",
  };

  const dummyFunctions = {
    updateBlog: vi.fn(),
    removeBlog: vi.fn(),
    setBlogs: vi.fn(),
    setUser: vi.fn(),
    setErrorMessage: vi.fn(),
    setSuccessMessage: vi.fn(),
  };

  const testingRender = (user) => {
    render(
      <MemoryRouter initialEntries={["/blogs/12asd22"]}>
        <Routes>
          <Route
            path="/blogs/:id"
            element={<Detail blogs={blogs} user={user1} {...dummyFunctions} />}
          />
        </Routes>
      </MemoryRouter>,
    );
  };

  testingRender(null);

  expect(
    screen.getByText("Component testing is done with react-testing-library"),
  ).toBeInTheDocument();
  expect(screen.getByText("by True")).toBeInTheDocument();
  expect(
    screen.getByText((content) => content.includes("25")),
  ).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /Like/i })).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /Remove blog/i }),
  ).not.toBeInTheDocument();
});

test(`The owner are shown both buttons`, () => {
  const blog = {
    id: "12asd22",
    title: "Component testing is done with react-testing-library",
    author: "True",
    url: "https://your.mom",
    likes: 25,
    user: {
      username: "root",
    },
  };

  const blogs = [blog];

  const user1 = {
    username: "root",
    name: "root",
    password: "root",
  };

  const dummyFunctions = {
    updateBlog: vi.fn(),
    removeBlog: vi.fn(),
    setBlogs: vi.fn(),
    setUser: vi.fn(),
    setErrorMessage: vi.fn(),
    setSuccessMessage: vi.fn(),
  };

  const testingRender = (user) => {
    render(
      <MemoryRouter initialEntries={["/blogs/12asd22"]}>
        <Routes>
          <Route
            path="/blogs/:id"
            element={<Detail blogs={blogs} user={user1} {...dummyFunctions} />}
          />
        </Routes>
      </MemoryRouter>,
    );
  };

  testingRender(null);

  expect(
    screen.getByText("Component testing is done with react-testing-library"),
  ).toBeInTheDocument();
  expect(screen.getByText("by True")).toBeInTheDocument();
  expect(
    screen.getByText((content) => content.includes("25")),
  ).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /Like/i })).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /Remove blog/i }),
  ).toBeInTheDocument();
});
