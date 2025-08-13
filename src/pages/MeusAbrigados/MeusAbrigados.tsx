import { useEffect, useState } from "react";
import { useData } from "../../contexts/authContext/DataContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AnimatedPage from "../../components/AnimatedPage";
import ResetPage from "../../components/AboutTeam/ResetPage";
import { toast } from "react-toastify";
import { Container, AbrigadoCard, AbrigadosList, Title, EmptyState, ActionButtons, EditButton, DeleteButton, EditForm, FormGroup, SaveButton, CancelButton } from "./styles";

interface IAbrigado {
  id: string;
  name: string;
  email?: string;
  age?: string;
  cpf?: string;
  telephone?: string;
  address?: string;
  picture?: string;
  description?: string;
  institution_name?: string;
  institutionName?: string;
  created_at: string;
  institution_id?: string;
  birth_date?: string;
  rg?: string;
  registered_by?: string;
  has_login?: boolean;
  updated_at?: string;
}

export default function MeusAbrigados() {
  const { userProfile, homeless, loading: dataLoading, updateHomeless } = useData();
  const [abrigados, setAbrigados] = useState<IAbrigado[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<IAbrigado>>({});

  // Determinar se é instituição
  const isInstitution = userProfile && 'cnpj' in userProfile;

  console.log('MeusAbrigados - userProfile:', userProfile);
  console.log('MeusAbrigados - isInstitution:', isInstitution);
  console.log('MeusAbrigados - homeless data:', homeless);

  useEffect(() => {
    if (isInstitution && userProfile && homeless) {
      // Filtrar abrigados da instituição atual
      const institutionAbrigados = homeless.filter(
        (abrigado: any) => abrigado.institution_id === userProfile.id
      );
      
      console.log('Abrigados filtrados para instituição:', institutionAbrigados);
      setAbrigados(institutionAbrigados);
      setLoading(false);
    } else if (!dataLoading) {
      setLoading(false);
    }
  }, [isInstitution, userProfile, homeless, dataLoading]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data não informada';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }
    
    return date.toLocaleDateString('pt-BR');
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
      if (!editingId) return;

      await updateHomeless(editingId, editForm);
      
      // Atualizar a lista local
      setAbrigados(prev => 
        prev.map(abrigado => 
          abrigado.id === editingId ? { ...abrigado, ...editForm } : abrigado
        )
      );

      setEditingId(null);
      setEditForm({});
    } catch (error: any) {
      console.error('Erro ao atualizar abrigado:', error);
      // O toast de erro já é mostrado pela função updateHomeless
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir o registro de ${name}?`)) {
      return;
    }

    try {
      // Usar Supabase para deletar
      const { supabase } = await import('../../services/supabase');
      const { error } = await supabase
        .from('homeless')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Remover da lista local
      setAbrigados(prev => prev.filter(abrigado => abrigado.id !== id));
      toast.success('Abrigado removido com sucesso!');
    } catch (error: any) {
      console.error('Erro ao excluir abrigado:', error);
      toast.error('Erro ao excluir abrigado');
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
                      Cadastrado em: {formatDate(abrigado.created_at)}
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