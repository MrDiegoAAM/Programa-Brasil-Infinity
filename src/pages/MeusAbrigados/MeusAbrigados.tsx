import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AnimatedPage from "../../components/AnimatedPage";
import ResetPage from "../../components/AboutTeam/ResetPage";
import api from "../../server/api";
import { toast } from "react-toastify";
import { Container, AbrigadoCard, AbrigadosList, Title, EmptyState, ActionButtons, EditButton, DeleteButton, EditForm, FormGroup, SaveButton, CancelButton } from "./styles";

interface IAbrigado {
  id: string;
  name: string;
  email: string;
  age: string;
  cpf: string;
  telephone: string;
  address: string;
  picture: string;
  description: string;
  institutionName: string;
  createdAt: string;
}

export default function MeusAbrigados() {
  const { isInstitution, token, user } = useContext(AuthContext);
  const [abrigados, setAbrigados] = useState<IAbrigado[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<IAbrigado>>({});

  useEffect(() => {
    const loadAbrigados = async () => {
      try {
        if (!token) {
          toast.error("Token de autenticação não encontrado");
          return;
        }

        const response = await api.get('/homeless/by-institution', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAbrigados(response.data);
      } catch (error: any) {
        console.error('Erro ao carregar abrigados:', error);
        const errorMessage = error.response?.data?.message || 'Erro ao carregar abrigados';
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (isInstitution) {
      loadAbrigados();
    }
  }, [isInstitution, token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleEdit = (abrigado: IAbrigado) => {
    setEditingId(abrigado.id);
    setEditForm(abrigado);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async () => {
    try {
      if (!token || !editingId) return;

      const response = await api.put(`/homeless/${editingId}`, editForm, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Atualizar a lista local
      setAbrigados(prev => 
        prev.map(abrigado => 
          abrigado.id === editingId ? { ...abrigado, ...editForm } : abrigado
        )
      );

      toast.success('Abrigado atualizado com sucesso!');
      setEditingId(null);
      setEditForm({});
    } catch (error: any) {
      console.error('Erro ao atualizar abrigado:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao atualizar abrigado';
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir o registro de ${name}?`)) {
      return;
    }

    try {
      if (!token) return;

      await api.delete(`/homeless/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Remover da lista local
      setAbrigados(prev => prev.filter(abrigado => abrigado.id !== id));
      toast.success('Abrigado removido com sucesso!');
    } catch (error: any) {
      console.error('Erro ao excluir abrigado:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao excluir abrigado';
      toast.error(errorMessage);
    }
  };

  const handleFormChange = (field: keyof IAbrigado, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  if (!isInstitution) {
    return (
      <>
        <Header />
        <Container>
          <Title>Acesso Negado</Title>
          <EmptyState>Esta página é exclusiva para instituições.</EmptyState>
        </Container>
        <Footer color={"#1B187A"} />
      </>
    );
  }

  return (
    <>
      <Header />
      <AnimatedPage>
        <Container>
          <Title>Meus Abrigados</Title>
          
          {loading ? (
            <EmptyState>Carregando...</EmptyState>
          ) : abrigados.length === 0 ? (
            <EmptyState>
              Nenhum abrigado vinculado à sua instituição ainda.
            </EmptyState>
          ) : (
            <AbrigadosList>
              {abrigados.map((abrigado) => (
                <AbrigadoCard key={abrigado.id}>
                  <div className="header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {abrigado.picture && (
                        <img 
                          src={abrigado.picture} 
                          alt={`Foto de ${abrigado.name}`}
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid #ddd'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <h3>{abrigado.name}</h3>
                    </div>
                    <span className="date">
                      Cadastrado em: {formatDate(abrigado.createdAt)}
                    </span>
                  </div>
                  
                  {editingId === abrigado.id ? (
                    <EditForm>
                      <FormGroup>
                        <label>Nome:</label>
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => handleFormChange('name', e.target.value)}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <label>Email:</label>
                        <input
                          type="email"
                          value={editForm.email || ''}
                          onChange={(e) => handleFormChange('email', e.target.value)}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <label>Idade:</label>
                        <input
                          type="text"
                          value={editForm.age || ''}
                          onChange={(e) => handleFormChange('age', e.target.value)}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <label>CPF:</label>
                        <input
                          type="text"
                          value={editForm.cpf || ''}
                          onChange={(e) => handleFormChange('cpf', e.target.value)}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <label>Telefone:</label>
                        <input
                          type="text"
                          value={editForm.telephone || ''}
                          onChange={(e) => handleFormChange('telephone', e.target.value)}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <label>Endereço:</label>
                        <input
                          type="text"
                          value={editForm.address || ''}
                          onChange={(e) => handleFormChange('address', e.target.value)}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <label>Foto (URL):</label>
                        <input
                          type="url"
                          value={editForm.picture || ''}
                          onChange={(e) => handleFormChange('picture', e.target.value)}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <label>Descrição:</label>
                        <textarea
                          value={editForm.description || ''}
                          onChange={(e) => handleFormChange('description', e.target.value)}
                          rows={3}
                        />
                      </FormGroup>
                      
                      <ActionButtons>
                        <SaveButton onClick={handleSaveEdit}>Salvar</SaveButton>
                        <CancelButton onClick={handleCancelEdit}>Cancelar</CancelButton>
                      </ActionButtons>
                    </EditForm>
                  ) : (
                    <>
                      <div className="info">
                        <div className="info-item">
                          <strong>Email:</strong> {abrigado.email || 'Não informado'}
                        </div>
                        <div className="info-item">
                          <strong>Idade:</strong> {abrigado.age || 'Não informado'}
                        </div>
                        <div className="info-item">
                          <strong>CPF:</strong> {abrigado.cpf || 'Não informado'}
                        </div>
                        <div className="info-item">
                          <strong>Telefone:</strong> {abrigado.telephone || 'Não informado'}
                        </div>
                        <div className="info-item">
                          <strong>Endereço:</strong> {abrigado.address || 'Não informado'}
                        </div>
                        <div className="info-item">
                          <strong>Descrição:</strong> {abrigado.description || 'Não informado'}
                        </div>
                      </div>
                      
                      <ActionButtons>
                        <EditButton onClick={() => handleEdit(abrigado)}>
                          Editar
                        </EditButton>
                        <DeleteButton onClick={() => handleDelete(abrigado.id, abrigado.name)}>
                          Excluir
                        </DeleteButton>
                      </ActionButtons>
                    </>
                  )}
                </AbrigadoCard>
              ))}
            </AbrigadosList>
          )}
        </Container>
        <ResetPage />
      </AnimatedPage>
      <Footer color={"#1B187A"} />
    </>
  );
}