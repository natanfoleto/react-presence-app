import { useEffect, useState } from "react";

import "./styles.css";

import { Card, CardProps } from "../../components/Card";

interface ProfileResponse {
  name: string;
  avatar_url: string;
}

interface User {
  name: string;
  avatar: string;
}

function Home() {
  const [user, setUser] = useState<User>({} as User);
  const [students, setStudents] = useState<CardProps[]>([]);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/natanfoleto");
      const data = (await response.json()) as ProfileResponse;

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();
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

    setStudents((prevState) => [...prevState, newStudent]);
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
