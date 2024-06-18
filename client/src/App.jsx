import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

import { Contact } from "./pages/Contact";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/footer/footer";
import { AdminLayout } from "./components/Layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminUpdate } from "./pages/Admin-Update";
import { AdminContacts } from "./pages/Admin-Contacts";
import { Logout } from "./pages/Logout";
/////////////////////////////////////////////////
import { ProblemList } from "./pages/Problem-List";
import { ProblemSolve } from "./pages/Problem-Solve";
import { CreateProblem } from "./pages/Create-Problem";
import { AllProblems } from "./pages/All-Problems";
import { EditProblem } from "./pages/Edit-Problem";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/problem-list" element={<ProblemList />} />
          <Route
            path="/problem-list/:id/problem-solve"
            element={<ProblemSolve />}
          />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:id/edit" element={<AdminUpdate />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="create-problem" element={<CreateProblem />} />
            <Route path="all-problems" element={<AllProblems />} />
            <Route
              path="all-problems/:id/edit-problem"
              element={<EditProblem />}
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
