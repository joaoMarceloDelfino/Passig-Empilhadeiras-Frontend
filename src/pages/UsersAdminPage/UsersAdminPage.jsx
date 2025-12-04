import { useState, useEffect } from "react";
import PageBase from "../PageBase/PageBase";
import BaseApi from "../../api/BaseApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Table from "../../components/Table/Table";
import NotFound from "../../components/NotFound/NotFound";
import styles from "./UsersAdminPage.module.css"

const UsersAdminPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setIsLoading(true);
    BaseApi.findAllUsers()
      .then((res) => {
        const listaFormatada = res.data.map((user) => ({
          ...user,
          role: user.role.name,
        }));
        setUsers(listaFormatada);
      })
      .finally(() => setIsLoading(false));
  };

  if(isLoading) return <LoadingSpinner/>

  return (

    <PageBase title="Usuários Cadastrados">
            {
                users.length === 0 ?
                    <NotFound 
                        title="Nenhum resultado encontrado!" 
                        text="Não foi encontrada nenhum usuário cadastrado no momento."
                    /> 
                    : (
                        <div className={styles.tableWrapper}>
                            <Table 
                                data={users}
                                columns={["username", "cellphoneNumber", "role", "email"]} 
                                headers={["Nome Do Usuário", "Número De Telefone", "Cargo", "Email"]}
                            />
                        </div>
                    )
            }
        </PageBase>
  );
};

export default UsersAdminPage;