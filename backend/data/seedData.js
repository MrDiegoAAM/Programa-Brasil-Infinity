const bcrypt = require('bcryptjs');
const JSONDatabase = require('./database');

async function seedData() {
  try {
    console.log('🌱 Iniciando seed do banco de dados JSON...');

    const db = new JSONDatabase();

    // Verificar se já existem dados
    const institutions = db.getInstitutions();
    const homeless = db.getHomeless();

    if (institutions.length > 0 || homeless.length > 0) {
      console.log('📊 Dados já existem no banco. Pulando seed...');
      return;
    }

    // Hash da senha padrão "123456"
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Criar instituições
    const institutionsData = [
      {
        id: "inst-test-1",
        name: "AjudeMe",
        cnpj: "12.345.678/0001-90",
        address: "Rua da Solidariedade, 100 - Recife/PE",
        telephone: "(81) 3333-4444",
        email: "contato@ajudeme.org",
        password: hashedPassword,
        picture: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNDI4NUY0Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QWp1ZGUtbWU8L3RleHQ+Cjwvc3ZnPg==",
        createdAt: new Date().toISOString()
      },
      {
        id: "inst-infinity-1",
        name: "Infinity School",
        cnpj: "98.765.432/0001-10",
        address: "Rua da Tecnologia, 456, Centro, São Paulo - SP",
        telephone: "(11) 9999-8888",
        email: "ajuda@infinityschool.com",
        password: hashedPassword,
        picture: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjOEIzNUZGIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW5maW5pdHk8L3RleHQ+Cjwvc3ZnPg==",
        createdAt: new Date().toISOString()
      }
    ];

    for (const institutionData of institutionsData) {
      db.addInstitution(institutionData);
      console.log('✅ Instituição criada:', institutionData.name);
    }

    // Criar abrigados com login
    const homelessWithLogin = [
      {
        id: "test-abrigado-1",
        name: "Haroldo Silva",
        email: "haroldo@gmail.com",
        password: hashedPassword,
        telephone: "(81) 99999-9999",
        address: "Rua das Flores, 123 - Recife/PE",
        age: "35",
        cpf: "123.456.789-00",
        rg: "12.345.678-9",
        birthDate: "1988-05-15",
        picture: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzRBODUzIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SDwvdGV4dD4KPC9zdmc+",
        institutionId: "inst-test-1",
        institutionName: "AjudeMe",
        hasLogin: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "test-abrigado-2",
        name: "Antonio Santos",
        email: "antonio@gmail.com",
        password: hashedPassword,
        telephone: "(81) 98888-7777",
        address: "Rua das Palmeiras, 456 - Recife/PE",
        age: "42",
        cpf: "987.654.321-00",
        rg: "98.765.432-1",
        birthDate: "1981-12-03",
        picture: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkY5ODAwIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QTwvdGV4dD4KPC9zdmc+",
        institutionId: "inst-test-1",
        institutionName: "AjudeMe",
        hasLogin: true,
        createdAt: new Date().toISOString()
      }
    ];

    for (const homelessData of homelessWithLogin) {
      db.addHomeless(homelessData);
      console.log('✅ Abrigado com login criado:', homelessData.name);
    }

    // Criar abrigados sem login
    const homelessWithoutLogin = [
      {
        id: "abrigado-inst-1",
        name: "João Silva",
        age: "45",
        description: "Ex-metalúrgico, perdeu emprego durante a pandemia",
        institutionId: "inst-test-1",
        institutionName: "AjudeMe",
        email: "joao.silva@email.com",
        telephone: "(81) 98888-7777",
        address: "Abrigo Central",
        cpf: "987.654.321-00",
        rg: "98.765.432-1",
        birthDate: "1978-08-20",
        picture: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNkY0MkMxIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SjwvdGV4dD4KPC9zdmc+",
        registeredBy: "institution",
        hasLogin: false,
        createdAt: "2023-01-15T00:00:00.000Z"
      },
      {
        id: "abrigado-inst-2",
        name: "Ana Costa",
        age: "38",
        description: "Mãe de dois filhos, procura oportunidade de trabalho",
        institutionId: "inst-test-1",
        institutionName: "AjudeMe",
        email: "ana.costa@email.com",
        telephone: "(81) 97777-6666",
        address: "Casa de Apoio",
        cpf: "456.789.123-00",
        rg: "45.678.912-3",
        birthDate: "1985-03-10",
        picture: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRUMzOTk5Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QTwvdGV4dD4KPC9zdmc+",
        registeredBy: "institution",
        hasLogin: false,
        createdAt: "2023-02-20T00:00:00.000Z"
      }
    ];

    for (const homelessData of homelessWithoutLogin) {
      db.addHomeless(homelessData);
      console.log('✅ Abrigado sem login criado:', homelessData.name);
    }

    console.log('🎉 Seed concluído com sucesso!');
    console.log(`📊 Total de instituições: ${db.getInstitutions().length}`);
    console.log(`👥 Total de abrigados: ${db.getHomeless().length}`);

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
  }
}

module.exports = { seedData };