import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Messages from "./Messages";
import Absences from "./Absences";
import Notes from "./Notes";

import ListeEtudiants from "./ListeEtudiants";
import AjouterEtudiant from "./AjouterEtudiant";
import ModifierEtudiant from "./ModifierEtudiant";
import DetailsEtudiant from "./DetailsEtudiant";

import ListeFormateurs from "./ListeFormateurs";
import AjouterFormateur from "./AjouterFormateur";
import ModifierFormateur from "./ModifierFormateur";
import DetailsFormateur from "./DetailsFormateur";

import ListeClasses from "./ListeClasses";
import DetailsClasse from "./DetailsClasse";
import AjouterClasse from "./AjouterClasse";
import ModifierClasse from "./ModifierClasse";

import ListeSalles from "./ListeSalles";
import AjouterSalle from "./AjouterSalle";
import ModifierSalle from "./ModifierSalle";
import DetailsSalle from "./DetailsSalle";

import ListeFiliere from "./ListeFiliere";
import AjouterFiliere from "./AjouterFiliere";
import ModifierFiliere from "./ModifierFiliere";

import Login from "./Login";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/Absences" element={<Absences />} />
        <Route path="/Notes" element={<Notes />} />
        <Route path="/Profile" element={<Profile />} />

        <Route path="/ListeEtudiants" element={<ListeEtudiants />} />
        <Route path="/AjouterEtudiant" element={<AjouterEtudiant />} />
        <Route path="/ModifierEtudiant" element={<ModifierEtudiant />} />
        <Route path="/DetailsEtudiant" element={<DetailsEtudiant />} />

        <Route path="/ListeFormateurs" element={<ListeFormateurs />} />
        <Route path="/AjouterFormateur" element={<AjouterFormateur />} />
        <Route path="/ModifierFormateur" element={<ModifierFormateur />} />
        <Route path="/DetailsFormateur" element={<DetailsFormateur />} />

        <Route path="/ListeClasses" element={<ListeClasses />} />
        <Route path="/AjouterClasse" element={<AjouterClasse />} />
        <Route path="/ModifierClasse" element={<ModifierClasse />} />
        <Route path="/DetailsClasse" element={<DetailsClasse />} />

        <Route path="/ListeSalles" element={<ListeSalles />} />
        <Route path="/AjouterSalle" element={<AjouterSalle />} />
        <Route path="/ModifierSalle" element={<ModifierSalle />} />
        <Route path="/DetailsSalle" element={<DetailsSalle />} />

        <Route path="/ListeFiliere" element={<ListeFiliere />} />
        <Route path="/AjouterFiliere" element={<AjouterFiliere />} />
        <Route path="/ModifierFiliere" element={<ModifierFiliere />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;
