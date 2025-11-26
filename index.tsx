
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Camera, Trash2, Download, FileText, Eye, Edit, Share2, Printer, X, Menu, Save, Upload, Cloud, User, Users, Lock, AlertTriangle, ClipboardList, CheckSquare, Home, LogOut, Clock, Activity, Settings, Pen, Terminal, Folder, ChevronRight, FileCheck, Wifi, Server, Globe, Database, Cpu, Radio, Layers, ArrowRightLeft, Calendar, Bell, Copy, Clipboard, FileSpreadsheet, Send, Sun, MessageCircle } from 'lucide-react';

// --- ICONS MAPPING ---
const Icons = {
  User: User,
  Users: Users,
  Lock: Lock,
  AlertTriangle: AlertTriangle,
  ClipboardList: ClipboardList,
  CheckSquare: CheckSquare,
  Menu: Menu,
  X: X,
  Home: Home,
  LogOut: LogOut,
  Trash: Trash2,
  Edit: Edit,
  Eye: Eye,
  FileText: FileText,
  Clock: Clock,
  Activity: Activity,
  Settings: Settings,
  Pen: Pen,
  Download: Download,
  Upload: Upload,
  Send: Share2,
  Folder: Folder,
  Terminal: Terminal,
  Printer: Printer,
  Save: Save,
  Cloud: Cloud,
  FileCheck: FileCheck,
  Wifi: Wifi,
  Server: Server,
  Globe: Globe,
  Database: Database,
  Cpu: Cpu,
  Radio: Radio,
  Layers: Layers,
  ArrowRightLeft: ArrowRightLeft,
  Calendar: Calendar,
  Bell: Bell,
  Copy: Copy,
  Clipboard: Clipboard,
  FileSpreadsheet: FileSpreadsheet,
  Whatsapp: Send,
  Sun: Sun,
  MessageCircle: MessageCircle
};

// --- CONSTANTS ---
const ALERT_THRESHOLD_HOURS = 20;
const ALERT_THRESHOLD_MS = ALERT_THRESHOLD_HOURS * 60 * 60 * 1000;
const PROGRAMMING_ALERT_INTERVAL = 2 * 60 * 1000; // 2 minutes
const PROGRAMMING_ALERT_DURATION = 10 * 1000; // 10 seconds

const TRUCK_IMAGE_URL = "https://img.freepik.com/premium-vector/mining-dump-truck-vector-illustration-isolated-white-background_263357-365.jpg"; 

const RISK_LIST_EMERGENCIAL = [
  "Contato com superfícies cortantes/perfurante em ferramentas manuais ou em estruturas.",
  "Prensamento de dedos ou mãos.",
  "Queda de peças/estruturas/equipamentos.",
  "Prensamento ou agarramento do corpo.",
  "Atropelamento/esmagamento por veículos (vias, pátios, ferrovias).",
  "Queda, tropeço ou escorregão no acesso ou local de trabalho.",
  "Animais peçonhentos/insetos/animal selvagem.",
  "Desmoronamentos de pilhas (minério, estéril, etc).",
  "Queda de plataforma ou de escadas durante acesso.",
  "Arco e/ou choque elétrico.",
  "Fontes de energia (hidráulica, pneumática, elétrica, etc).",
  "Exposição a vapores, condensados ou superfícies quentes.",
  "Gases, vapores, poeiras ou fumos.",
  "Produtos químicos ou queimaduras.",
  "Projeção de materiais na face ou nos olhos.",
  "Condições climáticas adversas (sol, chuva, vento).",
  "Queda de homem ao mar ou afogamento.",
  "Interferência entre equipes (trabalho sobreposto, espaço restrito).",
  "Excesso ou deficiência de iluminação.",
  "Outras situações de risco (20)",
  "Outras situações de risco (21)",
  "Outras situações de risco (22)",
  "Outras situações de risco (23)"
];

const SYSTEMS_CHECKLIST = [
  { name: 'MOTOR', items: ['Vazamento de óleo em geral e próximo a partes quentes', 'Vazamento liquido de arrefecimento', 'Interferencias entre tubos, mangueiras e cabos', 'Nível de óleo'] },
  { name: 'SISTEMA HIDRÁULICO', items: ['Vazamento do óleo', 'Nível de óleo', 'Abraçadeiras de fixação', 'Interferencias entre tubos, mangueiras e cabos'] },
  { name: 'TRANSMISSÃO', items: ['Vazamento do óleo', 'Parafusos folgados', 'Abraçadeiras de fixação', 'Interferencias entre tubos, mangueiras e cabos', 'Proteção do cardan', 'Bujão de dreno do diferencial (Fixação)', 'Bujão de dreno e inspeção comando direito (Fixação)', 'Bujão de dreno e inspeção comando esquerdo (Fixação)', 'Nível de óleo do conversor e transmissão'] },
  { name: 'SISTEMA DE DIREÇÃO', items: ['Vazamento do óleo', 'Nível de óleo', 'Parafusos/pinos folgados', 'Abraçadeiras de fixação', 'Interferencias entre tubos, mangueiras e cabos'] },
  { name: 'ILUMINAÇÃO/AR CONDICIONADO', items: ['Farol de Alta e Baixa', 'Setas', 'Buzina', 'Ar Condicionado'] },
  { name: 'ESCADAS, CORRIMÃO, GUARDA CORPO', items: ['Escadas (Principal e de emergência)', 'Guarda Corpo (Plataforma)', "Tag's laterais e traseiro", 'Corrimão das Escadas'] },
  { name: 'CONDIÇÕES DE LIMPEZA E ORGANIZAÇÃO', items: ['Cabine', 'Plataforma', 'Escadas e Corrimões', 'Retrovisores'] },
];

// --- HELPERS ---
const getLocalStorage = (key, initial) => {
  const saved = localStorage.getItem(key);
  if (saved) return JSON.parse(saved);
  return initial;
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// --- COMPONENTS ---

const SignatureCanvas = ({ onSave, onCancel, employeeName, employeeRole, employeeId }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const handleSave = () => {
    const canvas = canvasRef.current;
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR');
    const dataUrl = canvas.toDataURL();
    onSave({ dataUrl, date: dateStr, time: timeStr, name: employeeName, role: employeeRole, id: employeeId });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
        <h3 className="text-xl font-bold mb-4">Assinatura Digital</h3>
        <p className="mb-2 font-medium">Colaborador: {employeeName} ({employeeRole})</p>
        <div className="border-2 border-dashed border-gray-400 mb-4 rounded bg-gray-50 touch-none">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="w-full h-48 cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button 
            onClick={() => {
              const canvas = canvasRef.current;
              const ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }} 
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Limpar
          </button>
          <button onClick={onCancel} className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition-colors shadow-sm">
            Salvar Assinatura
          </button>
        </div>
      </div>
    </div>
  );
};

const MaintenanceProgramming = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border-t-4 border-yellow-500 overflow-hidden mb-6">
      <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          <Icons.Calendar className="w-5 h-5 mr-2 text-yellow-600" />
          PROGRAMAÇÃO DE MANUTENÇÃO
        </h2>
        <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
          OM/FROTA
        </span>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Row 1 */}
        <div className="md:col-span-4">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">OM / Frota</label>
          <div className="relative">
            <Icons.Truck className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              className="pl-9 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              placeholder="Identificação..."
              value={data.omFrota || ''}
              onChange={(e) => handleChange('omFrota', e.target.value)}
            />
          </div>
        </div>

        <div className="md:col-span-3">
           <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Prioridade</label>
           <div className="relative">
            <Icons.AlertTriangle className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <select 
              className="pl-9 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 bg-white"
              value={data.prioridade || ''}
              onChange={(e) => handleChange('prioridade', e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
           </div>
        </div>

        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nº Pessoas</label>
          <div className="relative">
            <Icons.Users className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="number" 
              className="pl-9 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              placeholder="0"
              value={data.numeroPessoas || ''}
              onChange={(e) => handleChange('numeroPessoas', e.target.value)}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">H (Horas)</label>
          <div className="relative">
            <Icons.Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="number" 
              className="pl-9 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              placeholder="0h"
              value={data.horasEstimadas || ''}
              onChange={(e) => handleChange('horasEstimadas', e.target.value)}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="md:col-span-12">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descrição da Atividade</label>
          <div className="relative">
            <Icons.FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <textarea 
              rows={2}
              className="pl-9 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              placeholder="Descreva a atividade a ser realizada..."
              value={data.descricaoAtividade || ''}
              onChange={(e) => handleChange('descricaoAtividade', e.target.value)}
            />
          </div>
        </div>

        {/* Row 3 - Dates */}
        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Data Min</label>
          <input 
            type="date" 
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-