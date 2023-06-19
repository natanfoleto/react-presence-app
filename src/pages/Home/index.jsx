import { useEffect, useState } from "react";

import "./styles.css";

import { Card } from "../../components/Card";

function Home() {
  const [user, setUser] = useState({ name: "", avatar: "" });
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState();

  useEffect(() => {
    fetch("https://api.github.com/users/natanfoleto")
      .then((response) => response.json())
      .then((data) => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        });
      });

    // async function fetchData() {
    //   const response = await fetch("https://api.github.com/users/natanfoleto");
    //   const data = await response.json();

    //   setUser({
    //     name: data.name,
    //     avatar: data.avatar_url,
    //   });
    // }

    // fetchData();
  }, []);

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents([...students, newStudent]);
  }

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite o nome ..."
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button onClick={handleAddStudent}>Adicionar</button>

      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}

export default Home;
