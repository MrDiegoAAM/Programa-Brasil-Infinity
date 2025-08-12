const fs = require('fs');
const path = require('path');

// Caminhos dos arquivos de dados
const DATA_DIR = path.join(__dirname);
const INSTITUTIONS_FILE = path.join(DATA_DIR, 'institutions.json');
const HOMELESS_FILE = path.join(DATA_DIR, 'homeless.json');

// Garantir que o diretório existe
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Função para ler dados de um arquivo JSON
function readJSONFile(filePath, defaultData = []) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return defaultData;
  } catch (error) {
    console.error(`Erro ao ler arquivo ${filePath}:`, error);
    return defaultData;
  }
}

// Função para escrever dados em um arquivo JSON
function writeJSONFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Erro ao escrever arquivo ${filePath}:`, error);
    return false;
  }
}

// Classe para gerenciar a persistência
class JSONDatabase {
  constructor() {
    this.institutions = readJSONFile(INSTITUTIONS_FILE, []);
    this.homeless = readJSONFile(HOMELESS_FILE, []);
  }

  // Métodos para Instituições
  getInstitutions() {
    return this.institutions;
  }

  addInstitution(institution) {
    this.institutions.push(institution);
    return writeJSONFile(INSTITUTIONS_FILE, this.institutions);
  }

  updateInstitution(id, updatedData) {
    const index = this.institutions.findIndex(inst => inst.id === id);
    if (index !== -1) {
      this.institutions[index] = { ...this.institutions[index], ...updatedData };
      return writeJSONFile(INSTITUTIONS_FILE, this.institutions);
    }
    return false;
  }

  deleteInstitution(id) {
    const index = this.institutions.findIndex(inst => inst.id === id);
    if (index !== -1) {
      this.institutions.splice(index, 1);
      return writeJSONFile(INSTITUTIONS_FILE, this.institutions);
    }
    return false;
  }

  findInstitutionById(id) {
    return this.institutions.find(inst => inst.id === id);
  }

  findInstitutionByEmail(email) {
    return this.institutions.find(inst => inst.email === email);
  }

  // Métodos para Abrigados
  getHomeless() {
    return this.homeless;
  }

  addHomeless(homeless) {
    this.homeless.push(homeless);
    return writeJSONFile(HOMELESS_FILE, this.homeless);
  }

  updateHomeless(id, updatedData) {
    const index = this.homeless.findIndex(person => person.id === id);
    if (index !== -1) {
      this.homeless[index] = { ...this.homeless[index], ...updatedData };
      return writeJSONFile(HOMELESS_FILE, this.homeless);
    }
    return false;
  }

  deleteHomeless(id) {
    const index = this.homeless.findIndex(person => person.id === id);
    if (index !== -1) {
      this.homeless.splice(index, 1);
      return writeJSONFile(HOMELESS_FILE, this.homeless);
    }
    return false;
  }

  findHomelessById(id) {
    return this.homeless.find(person => person.id === id);
  }

  findHomelessByEmail(email) {
    return this.homeless.find(person => person.email === email);
  }

  findHomelessByInstitution(institutionId) {
    return this.homeless.filter(person => person.institutionId === institutionId);
  }

  // Método para recarregar dados dos arquivos
  reload() {
    this.institutions = readJSONFile(INSTITUTIONS_FILE, []);
    this.homeless = readJSONFile(HOMELESS_FILE, []);
  }

  // Método para salvar todos os dados
  saveAll() {
    const institutionsSaved = writeJSONFile(INSTITUTIONS_FILE, this.institutions);
    const homelessSaved = writeJSONFile(HOMELESS_FILE, this.homeless);
    return institutionsSaved && homelessSaved;
  }
}

module.exports = JSONDatabase;