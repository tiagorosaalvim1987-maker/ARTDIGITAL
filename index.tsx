import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Camera, Trash2, Download, FileText, Eye, Edit, Share2, Printer, X, Menu, 
  Save, Upload, Cloud, User, Users, Lock, AlertTriangle, ClipboardList, 
  CheckSquare, Home, LogOut, Clock, Activity, Settings, Pen, Terminal, 
  Folder, ChevronRight, FileCheck, Wifi, Server, Globe, Database, Cpu, 
  Radio, Layers, ArrowRightLeft, Calendar, Bell, Copy, Clipboard, 
  FileSpreadsheet, MessageCircle, Search, Filter
} from 'lucide-react';

// --- Types ---

interface Task {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  location: string;
  team: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface Report {
  id: string;
  title: string;
  date: string;
  author: string;
  hazards: string[];
  status: 'approved' | 'pending';
}

interface AppSettings {
  companyName: string;
  whatsappNumber: string;
}

// --- Mock Data & Helpers ---

const INITIAL_SETTINGS: AppSettings = {
  companyName: 'Safety First Engenharia',
  whatsappNumber: '5511999999999'
};

const MOCK_TASKS: Task[] = [
  { id: '1', date: new Date().toISOString().split('T')[0], description: 'Manutenção Preventiva Caldeira', location: 'Setor A', team: 'Equipe Alpha', status: 'pending' },
  { id: '2', date: new Date().toISOString().split('T')[0], description: 'Inspeção Elétrica QGBT', location: 'Subestação', team: 'Equipe Beta', status: 'in-progress' },
  { id: '3', date: '2023-10-28', description: 'Troca de Válvulas', location: 'Setor C', team: 'Equipe Gama', status: 'completed' },
];

const MOCK_REPORTS: Report[] = [
  { id: '101', title: 'APR - Trabalho em Altura - Galpão 3', date: '2023-10-27', author: 'João Silva', hazards: ['Queda de nível', 'Queda de materiais'], status: 'approved' },
  { id: '102', title: 'PT - Espaço Confinado - Tanque 2', date: '2023-10-27', author: 'Maria Santos', hazards: ['Atmosfera explosiva', 'Asfixia'], status: 'pending' },
];

const generateId = () => Math.random().toString(36).substr(2, 9);

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      active 
        ? 'bg-yellow-400 text-gray-900 font-bold shadow-md' 
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

// --- Screens ---

const ScreenDashboard = ({ tasks, reports }: { tasks: Task[], reports: Report[] }) => {
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const activeReports = reports.length;

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Painel de Controle</h1>
        <p className="text-gray-500">Visão geral da segurança e operações</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Tarefas Pendentes</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{pendingTasks}</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <ClipboardList size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Relatórios Gerados</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{activeReports}</h3>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <FileCheck size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Alertas de Risco</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">0</h3>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              <AlertTriangle size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Atividades Recentes</h2>
        <div className="space-y-4">
          {tasks.slice(0, 3).map(task => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-green-500' : task.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                <div>
                  <p className="font-medium text-gray-900">{task.description}</p>
                  <p className="text-sm text-gray-500">{task.location} • {task.team}</p>
                </div>
              </div>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-200 text-gray-800">
                {task.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScreenProgramming = ({ tasks, setTasks }: { tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [importText, setImportText] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  // Filter tasks for the selected day
  const dailyTasks = useMemo(() => {
    return tasks.filter(t => t.date === selectedDate);
  }, [tasks, selectedDate]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setImportText(text);
      };
      reader.readAsText(file);
    }
  };

  const processImport = () => {
    if (!importText.trim()) return;

    // Simple parser for CSV or Tab-separated values (Excel copy-paste)
    const lines = importText.split('\n');
    const newTasks: Task[] = [];
    
    lines.forEach(line => {
      // Attempt to split by tab first (Excel), then comma (CSV), then semicolon
      let cols = line.split('\t');
      if (cols.length < 2) cols = line.split(',');
      if (cols.length < 2) cols = line.split(';');

      // Basic heuristic to map columns. 
      // Expected format loosely: Date | Description | Location | Team
      if (cols.length >= 2) {
        const dateStr = cols[0].trim();
        // Very basic date validation/formatting could go here
        
        newTasks.push({
          id: generateId(),
          date: dateStr || selectedDate, // Fallback to selected date if missing
          description: cols[1]?.trim() || 'Sem descrição',
          location: cols[2]?.trim() || 'Local não especificado',
          team: cols[3]?.trim() || 'Equipe Geral',
          status: 'pending'
        });
      }
    });

    setTasks(prev => [...prev, ...newTasks]);
    setIsImporting(false);
    setImportText('');
    alert(`${newTasks.length} tarefas importadas com sucesso!`);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Programação</h1>
          <p className="text-gray-500">Gestão de cronograma e importação de demandas</p>
        </div>
        <button 
          onClick={() => setIsImporting(!isImporting)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FileSpreadsheet size={18} />
          <span>{isImporting ? 'Cancelar Importação' : 'Importar Excel/CSV'}</span>
        </button>
      </header>

      {/* Import Area */}
      {isImporting && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 animate-in fade-in slide-in-from-top-4">
          <h3 className="font-semibold text-lg mb-4 flex items-center text-blue-800">
            <Upload className="mr-2" size={20} />
            Importar Dados
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Copie as células do Excel e cole abaixo, ou envie um arquivo CSV.
            <br/>
            <span className="text-xs text-gray-400">Formato sugerido: Data | Descrição | Local | Equipe</span>
          </p>
          
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder={`2023-10-27\tManutenção Bomba\tÁrea 51\tMecânica\n2023-10-27\tPintura Fachada\tPrédio B\tCivil`}
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
          />
          
          <div className="flex justify-between items-center">
            <input 
              type="file" 
              accept=".csv,.txt" 
              onChange={handleFileUpload}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button 
              onClick={processImport}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium"
            >
              Processar Dados
            </button>
          </div>
        </div>
      )}

      {/* Daily Panel Controls */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-4">
        <Calendar className="text-gray-500" />
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold uppercase">Data do Painel</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange